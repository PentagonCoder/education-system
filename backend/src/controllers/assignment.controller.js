import {asyncHandler} from '../utils/asyncHandler.js'
import { sendEmail } from '../utils/sendEmail.js';
// import Notification from '../model/notification.model.js';
import Assignment from '../model/assignment.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createAssignment = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;
  const userId = req.user._id;
  
  if(!title?.trim()){
    throw new ApiError(400, "Title is required");
  }

  const newAssignment = await Assignment.create({ 
    title,
    description,
    dueDate : new Date(dueDate),
    teacherId : userId
  });

  res.status(201).json(new ApiResponse(201, newAssignment, "Assignment created successfully"));
})

const getMyAssignments = asyncHandler(async (req, res) => {
  //get userId from request token 
  const teacherId = req.user._id;

  //find assignments for the user
  const assignments = await Assignment.find({
    teacherId : teacherId
  }).populate("teacherId", "fullname email");

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

// const inviteUsers = asyncHandler(async (req, res) =>{

//   const workspace = req.workspace;
//   const { email } = req.body;

//   const invitationToken = crypto.randomBytes(12).toString("hex");
  
//   const inviteUrl = `http://localhost:5173/join/${invitationToken}`;
//   const message = `Join the workspace: ${inviteUrl}`;

//   // notification for invited user
//   const inviteUser  = await User.findOne({ email });
//   // console.log("invite user", inviteUser);

//   if(inviteUser){
//     const notification = await Notification.create({
//       user : inviteUser._id,
//       message : `You are invited to join workspace "${workspace.name}"`
//     })
//   }


//   try{
//     await sendEmail({
//       to : email,
//       subject : "workspace join link",
//       text : message
//     })
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }

//   // save the invitation token to the workspace document
//   workspace.invitationToken = invitationToken;
//   await workspace.save();


//   res.status(200).json({
//     message : "JOINING LINK SENT TO YOUR EMAIL",
//     invitationToken
//   })

// })

// const joinWorkspace = asyncHandler(async (req, res) =>{
//   const { invitationToken } =req.params; 
//   const  userId  = req.user.id;

//   //find the workspace by invitation token
//   const workspace = await Workspace.findOne({ invitationToken })

//   //check if workspace exist 
//   if (!workspace) {
//     return res.status(404).json({
//       message: "Invalid invitation token"
//     });
//   }

//   //check if user alredy exist in workspace
//   const isMember = workspace.members.some((member)=>(member.user.toString() === userId));

//   if(isMember){
//     return res.status(403).json({
//       message: "You already a member"
//     });
//   }

//   // add user to workspace members and save
//   workspace.members.push({ user: userId, role: "member" });
//   await workspace.save();

//   res.status(200).json({
//     message : "You Join the gild"
//   })

// })

// const roleAsign = asyncHandler(async (req, res) =>{
//   const workspace = req.workspace;
//   const { userId, roleAssign } = req.body;

//   const allowedRoles = ['owner', 'admin', 'member'];

//   if (!allowedRoles.includes(roleAssign)) {
//     return res.status(400).json({
//       message: "Invalid role"
//     });
//   }

//   // Find that other member in the workspace
//   const Member = workspace.members.find((member) => member.user.toString() === userId);

//   if (!Member) {
//     return res.status(404).json({
//       message: "Member not found"
//     });
//   }

//   Member.role = roleAssign;
//   await workspace.save();

//   res.status(200).json({
//     message : "Role assigned successfully"
//   })

// })

const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = req.assignment;

  await assignment.deleteOne();

  res.status(200).json(new ApiResponse(200, null, "Assignment deleted successfully"));
})

export { createAssignment, getMyAssignments, getAssignmentById, updateAssignment, deleteAssignment }