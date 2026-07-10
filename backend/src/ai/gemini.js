import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { createClassroomService } from '../Services/classroom.service.js';
import { createAssignmentService } from '../Services/assignment.service.js';
import Classroom from "../model/classroom.model.js";
import { type } from "os";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are an AI assistant for an Assignment Management System.

Your job is to understand the teacher's request.

You MUST return ONLY valid JSON.

Do not return markdown.
Do not return explanations.
Do not return code blocks.

If the user wants to create a classroom return:
If description is not provided,
generate a professional description.

{
  "action": "create_classroom",
  "name": "...",
  "description": "..."
}

If the user wants to create an assignment return:

{
  "action": "create_assignment",
    "assignments" : [
      {
        "title": "...",
        "description": "...",
        "dueDate": "YYYY-MM-DD"
      }
    ]
}
If the request is normal conversation return:

{
  "action":"chat",
  "message":"..."
}
`;

const getMyAiResponse = asyncHandler( async(req, res) => {

  const { prompt, classroomId } = req.body;

  let response;
  if (!prompt) {
    throw new ApiError(400, "Prompt is required");
  }
  try {
    response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT}

    Teacher Request:
    ${prompt}`
            }
          ]
        }
      ]
    });
  } catch (error) {
    console.error(error);
    throw new ApiError(503, "AI service is temporarily unavailable. Please try again later.");
    }

  const cleanedResponse = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  
  // console.log(response.text);
  const result = JSON.parse(cleanedResponse);

  if (result.action === "create_classroom") {
    const classroom = await createClassroomService(
      req.user._id,
      result.name,
      result.description
    );
    console.log("Classroom created by AI:", classroom);
    return res.json(new ApiResponse(201, { type : "classroom", classroom}, "Classroom created by AI"));
  }

  if (result.action === "create_assignment") {

    if (!classroomId) {
      throw new ApiError(400, "Classroom ID is required");
    }

    const classroom = await Classroom.findById(classroomId);

    if (!classroom) {
      throw new ApiError(404, "Classroom not found");
    }

    if (classroom.teacherId.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Unauthorized");
    }
    // const assignment = result.assignments[0];

    // const newAssignment = await createAssignmentService(
    //   req.user._id, 
    //   classroomId, 
    //   assignment.title,
    //   assignment.description,
    //   assignment.dueDate
    // );
    const createdAssignments = [];

    for (const assignment of result.assignments) {

        const newAssignment = await createAssignmentService(
            req.user._id,
            classroomId,
            assignment.title,
            assignment.description,
            assignment.dueDate
        );

        createdAssignments.push(newAssignment);
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            {
              type: "assignment",
              assignments: createdAssignments,
            },
            `${createdAssignments.length} assignments created successfully`
        )
    );

    // return res.status(201).json(new ApiResponse(201, newAssignment, "Assignment created by AI"));
  }

  res.status(200).json(new ApiResponse(200, result, "AI response fetched successfully"));
})

export { getMyAiResponse }