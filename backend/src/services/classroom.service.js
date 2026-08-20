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

// export const getClassroomByIdService = async (classroomId) => {
//   const classroom = await Classroom.findById(classroomId)
//     .populate("students.user", "fullname email")
//     .populate("teacherId", "fullname email");

//   if (!classroom) {
//     throw new ApiError(404, "Classroom not found");
//   }

//   return classroom;
// }

// export const updateClassroomService = async (classroomId, updates) => {
//   const classroom = await Classroom.findById(classroomId);

//   if (!classroom) {
//     throw new ApiError(404, "Classroom not found");
//   }

//   Object.keys(updates).forEach((key) => {
//     classroom[key] = updates[key];
//   }); 
//   await classroom.save();
//   return classroom;
// } 

export const deleteClassroomService = async (classroom) => {
  await classroom.remove();
  return;
}

export const joinClassroomService = async (userId, invitationToken) => {
  if (!invitationToken?.trim()) {
    throw new ApiError(400, "Invitation token is required");
  }

  //find the classroom by invitation token
  const classroom = await Classroom.findOne({ code : invitationToken })

  //check if classroom exist 
  if (!classroom) {
    throw new ApiError(404, "Classroom not found");
  }

  //check if user alredy exist in classroom
  const isMember = classroom.students.some((member)=>(member.user.toString() === userId));

  if(isMember){
    throw new ApiError(400, "You are already a member of this classroom");
  }

  // add user to workspace members and save
  classroom.students.push({ user: userId, role: "student" });
  await classroom.save();

  return classroom;
}