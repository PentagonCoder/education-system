import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { tools } from "./tools.js";
import { createAgentContext } from "./agentContext.js";
import { executeTool } from "./executeTool.js";   
import { generateWithRetry } from "./generateWithRetry.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


const getMyAiResponse = asyncHandler( async(req, res) => {

  const { prompt, classroomId } = req.body;
  
  if (!prompt) throw new ApiError(400, "Prompt is required");
  
  const agentContext = createAgentContext(req);

  // let response;

  try {
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    while (true) {

      // const response = await ai.models.generateContent({
      //   model: "gemini-3.5-flash",

      //   config: {
      //     tools,
      //     systemInstruction: `
      //       You are an AI classroom assistant.

      //       Rules:

      //       - If the user asks to create a classroom, call createClassroom.
      //       - If the user also asks for assignments, call createClassroom FIRST.
      //       - Wait for the tool response.
      //       - After receiving the classroom creation result, call createAssignment once for EACH assignment.
      //       - Never combine multiple assignments into one tool call.
      //       - Continue calling createAssignment until every assignment has been created.
      //       - Only after every assignment has been created should you answer the user.
      //       `,
      //   },

      //   contents,
      // });
      const response = await generateWithRetry(ai, contents);
      
      const functionCall = response.functionCalls?.[0];

      if (!functionCall) {

        return res.json(
          new ApiResponse(
            200,
            {
              message: response.text,
            },
            "Done"
          )
        );

      }

      if (functionCall.name === "createAssignment") {
        functionCall.args.classroomId = agentContext.classroomId;
      }
      console.log(functionCall.args);
      const result = await executeTool(functionCall, req);

      if (functionCall.name === "createClassroom") {
        agentContext.classroomId = result.classroomId;
        agentContext.classroomName = result.classroomName;
      }

      contents.push({
        role: "model",
        parts: response.candidates[0].content.parts,
      });

      contents.push({
        role: "user",
        parts: [
          {
            functionResponse: {
              name: functionCall.name,
              response: result,
            },
          },
        ],
      });

    }    
    
  } catch (error) {
    console.error(error);
    throw new ApiError(503, "AI service is temporarily unavailable. Please try again later.");
  }

  

  // res.status(200).json(new ApiResponse(200, {message: response.text}, "AI response fetched successfully"));
})

export { getMyAiResponse }