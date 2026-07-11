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

  let response;
  if (!prompt) {
    throw new ApiError(400, "Prompt is required");
  }

  try {
    response = await ai.models.generateContent({
      model: "gemini-3.5-flash",

      config: {
        tools,
      },

      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });
    
  } catch (error) {
    console.error(error);
    throw new ApiError(503, "AI service is temporarily unavailable. Please try again later.");
  }

  console.log(response.functionCalls);

  const functionCall = response.functionCalls?.[0];

  switch (functionCall.name) {

    case "createClassroom":{

      const { name, description } = functionCall.args;

      const classroom = await createClassroomService( req.user._id, name, description );

      return res.status(200).json(new ApiResponse(
        200, 
        {
          type: "classroom", 
          classroom
        }, 
        "Classroom created successfully"
      ));
    }

    case "createAssignment": {

      const {
        classroomId,
        title,
        description,
        dueDate,
      } = functionCall.args;

      const assignment =
        await createAssignmentService(
          req.user._id,
          classroomId,
          title,
          description,
          dueDate
        );

      return res.json(
        new ApiResponse(
          201,
          {
            type: "assignment",
            assignment,
          },
          "Assignment created"
        )
      );
    }

  }
  res.status(200).json(new ApiResponse(200, {message: response.text}, "AI response fetched successfully"));
})

export { getMyAiResponse }