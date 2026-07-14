import {asyncHandler} from '../utils/asyncHandler.js'
import { sendEmail } from '../utils/sendEmail.js';
// import Notification from '../model/notification.model.js';
import Assignment from '../model/assignment.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { createAssignmentService } from '../Services/assignment.service.js';

const createAssignment = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;
  const userId = req.user._id;
  const { classroomId } = req.params;
  
  if(!title?.trim()){
    throw new ApiError(400, "Title is required");
  }

  const newAssignment = await createAssignmentService(userId, classroomId, title, description, dueDate);

  res.status(201).json(new ApiResponse(201, newAssignment, "Assignment created successfully"));
})

//but we are not using this function in the frontend, so we can remove it for now. We can add it later if needed.
const getMyAssignments = asyncHandler(async (req, res) => {
  //get userId from request token 
  const teacherId = req.user._id;

  //find assignments for the user
  const assignments = await Assignment.find({
    teacherId : teacherId
  }).populate("teacherId", "fullname email");

  res.status(201).json(new ApiResponse(201, assignments, "All The Assigment fetched successfully",))

})

const getMyAssignmentsByClassroom = asyncHandler(async (req, res) => {
  //get userId from request token 
  const userId = req.user._id;
  const { classroomId } = req.params;
  //find assignments for the user
  const assignments = await Assignment.find({
    classroomId : classroomId,
  })

  res.status(201).json(new ApiResponse(201, assignments, "All The Assigment fetched successfully",))

})


const getAssignmentById = asyncHandler( async(req, res) => {

  const assignment = req.assignment; 
  //if user is a member, return workspace details
  res.status(200).json(new ApiResponse(200, assignment, "Assignment fetched successfully"));
})

const updateAssignment = asyncHandler(async (req, res) => {
  const assignment = req.assignment;
  const { title, description, dueDate } = req.body;

  if(title?.trim()) assignment.title = title;
  if(description?.trim()) assignment.description = description;
  if(dueDate) assignment.dueDate = dueDate;

  await assignment.save();

  res.status(200).json(new ApiResponse(
    200,
    assignment,
    "Assignment updated successfully"
  ));
})

const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = req.assignment;

  await assignment.deleteOne();

  res.status(200).json(new ApiResponse(200, null, "Assignment deleted successfully"));
})

export { createAssignment, getMyAssignments, getAssignmentById, updateAssignment, deleteAssignment,getMyAssignmentsByClassroom }