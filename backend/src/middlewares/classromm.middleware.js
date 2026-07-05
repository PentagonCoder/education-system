import {asyncHandler} from '../utils/asyncHandler.js';
import Classroom from '../model/classroom.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const validateClassroomAccess = (roles = []) => {

  return asyncHandler(async (req, res, next) => {

  // CLASSROOM ID FROM PARAMS
  const { classroomId } = req.params;

  // USER ID FROM AUTH MIDDLEWARE
  const userId = req.user._id;

  //find the classroom by ID 
  const classroom = await Classroom.findById(classroomId)
    .populate("students.user", "fullname email")
    .populate("teacherId", "fullname email");

  if (!classroom) {
    return res.status(404).json(new ApiResponse(404, null, "Classroom not found"));
  }

  const isMemberRole = classroom.students.some(member => member.user._id.toString() === userId && roles.includes(member.role));

  if (!isMemberRole) {
    return res.status(403).json(new ApiResponse(403, null, "Access denied."));
  }

  req.classroom = classroom;
   // Attach the classroom to the request object for later use
  next();
  })

};

export {  validateClassroomAccess };