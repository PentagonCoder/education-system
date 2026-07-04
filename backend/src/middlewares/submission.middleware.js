import {asyncHandler} from '../utils/asyncHandler.js'
import Submission from '../model/submission.model.js';
import { ApiError } from '../utils/ApiError.js';

const validateSubmissionAccess = (roles = []) => {

  return asyncHandler(async (req, res, next) => {

  // WORKSPACE ID FROM PARAMS
  const { assignmentId } = req.params;

  // USER ID FROM AUTH MIDDLEWARE
  const userId = req.user._id;

  //find the assignment by ID 
  const submission = await Submission.findOne({assignmentId, studentId: userId})
    .populate("studentId", "fullname email")

  if (!submission) {
    throw new ApiError(404, "submission not found");
  }

  req.submission = submission;
   // Attach the assignment to the request object for later use
  next();
  })

};

export { validateSubmissionAccess };