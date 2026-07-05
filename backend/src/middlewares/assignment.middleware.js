import {asyncHandler} from '../utils/asyncHandler.js'
import Assignment from '../model/assignment.model.js';
import { ApiError } from '../utils/ApiError.js';

const validateAssignmentAccess = (roles = []) => {

  return asyncHandler(async (req, res, next) => {

  // WORKSPACE ID FROM PARAMS
  const { assignmentId, classroomId } = req.params;

  // USER ID FROM AUTH MIDDLEWARE
  const userId = req.user._id;

  //find the assignment by ID 
  const assignment = await Assignment.findById(assignmentId)
    .populate("teacherId", "fullname email")

  if (!assignment) {
    throw new ApiError(404, "Assignment not found");
  }

  if(roles.includes(req.user.role) && assignment.classroomId.toString() !== classroomId.toString()){
    throw new ApiError(403, "Unauthorized");
  }

  req.assignment = assignment;
   // Attach the assignment to the request object for later use
  next();
  })

};

export { validateAssignmentAccess };