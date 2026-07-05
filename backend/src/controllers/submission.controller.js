import {asyncHandler} from '../utils/asyncHandler.js'
import { sendEmail } from '../utils/sendEmail.js';
// import Notification from '../model/notification.model.js';
import Submission from '../model/submission.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createSubmission = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { assignmentId } = req.params;
  const userId = req.user._id;
  
  if(!status?.trim()){
    throw new ApiError(400, "status is required");
  }
  
  const submission = await Submission.findOne({ assignmentId, studentId: userId });

  let newSubmission;
  
  if(submission){
    submission.status = "submitted";
    submission.submittedAt = new Date();
    await submission.save();
  }
  else{
    newSubmission = await Submission.create({ 
      assignmentId,
      studentId : userId,
      status,
    });
  }

  res.status(201).json(new ApiResponse(201, newSubmission, "Submission created successfully"));
})

const getMySubmissions = asyncHandler(async (req, res) => {
  //get userId from request token 
  const studentId = req.user._id;
  const { assignmentId } = req.params;

  //find assignments for the user
  const submission = await Submission.find({
    studentId, assignmentId
  }).populate("studentId", "fullname email");

  res.status(201).json(new ApiResponse(201, submission, "All The Submission fetched successfully",))

})

const getSubmissionById = asyncHandler( async(req, res) => {

  const submission = req.submission; 
  //if user is a member, return workspace details
  res.status(200).json(new ApiResponse(200, submission, "Submission fetched successfully"));
})


// const deleteAssignment = asyncHandler(async (req, res) => {
//   const assignment = req.assignment;

//   await assignment.deleteOne();

//   res.status(200).json(new ApiResponse(200, null, "Assignment deleted successfully"));
// })

export { createSubmission, getMySubmissions, getSubmissionById}