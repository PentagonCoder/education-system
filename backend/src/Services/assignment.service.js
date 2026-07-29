import Assignment from "../model/assignment.model.js";
import { uploadImage } from "../utils/cloudinary.js";

export const createAssignmentService = async (
  userId,
  classroomId,
  title,
  description = "",
  dueDate,
  attachedFile,
)=>{

  if(!attachedFile){
    throw new Error("Attached file is required");
  }
  const uploadedFile = await uploadImage(attachedFile, "assignments");

  const newAssignment = await Assignment.create({ 
    title,
    description,
    dueDate : new Date(dueDate),
    teacherId : userId,
    classroomId : classroomId,
    attachedFile : uploadedFile.secure_url,
  });

  return newAssignment;
}