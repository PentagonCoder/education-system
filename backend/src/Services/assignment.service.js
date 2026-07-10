import Assignment from "../model/assignment.model.js";

export const createAssignmentService = async (
  userId,
  classroomId,
  title,
  description = "",
  dueDate
)=>{

  

  const newAssignment = await Assignment.create({ 
    title,
    description,
    dueDate : new Date(dueDate),
    teacherId : userId,
    classroomId : classroomId
  });

  return newAssignment;
}