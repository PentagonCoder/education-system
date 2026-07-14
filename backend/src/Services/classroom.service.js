import crypto from "crypto";
import Classroom from "../model/classroom.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createClassroomService = async (
  teacherId,
  name,
  description = "",
)=>{
  const invitationCode = crypto.randomBytes(12).toString("hex");
  
  const newClassroom = await Classroom.create({ 
    name,
    description,
    teacherId : teacherId,
    students : [{ user: teacherId, role: 'teacher' }],
    code : invitationCode
  });

  return newClassroom;
}