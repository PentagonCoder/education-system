import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { createClassroomService } from '../Services/classroom.service.js';
import { createAssignmentService } from '../Services/assignment.service.js';
import { tools } from "./tools.js";


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


const getMyAiResponse = asyncHandler( async(req, res) => {

  const { prompt, classroomId } = req.body;
  
  if (!prompt) throw new ApiError(400, "Prompt is required");
  

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

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",

        config: {
          tools,
        },

        contents,
      });

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

      const result = await executeTool(functionCall, req);

      contents.push({
        role: "model",
        parts: [
          {
            functionCall,
          },
        ],
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