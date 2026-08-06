import crypto from "crypto";
import Classroom from "../model/classroom.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createClassroomService = async ({
  teacherId,
  name,
  description = "",
})=>{

  if(!name?.trim()){
    throw new ApiError(400, "Name is required");
  }

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

export const getTeacherClassroomsService = async (teacherId) => {
  return await Classroom.find({
    teacherId: teacherId
  });
}

export const getStudentClassroomsService = async (studentId) => {
  return await Classroom.find({
    "students.user": studentId
  });
}