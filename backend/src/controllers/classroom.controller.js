import {asyncHandler} from '../utils/asyncHandler.js'
import Classroom from '../model/classroom.model.js';
import crypto from "crypto";
import { sendEmail } from '../utils/sendEmail.js';
import User from '../model/user.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createClassroom = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;
  
  if(!name?.trim()){
    throw new ApiError(400, "Name is required");
  }
  const invitationCode = crypto.randomBytes(12).toString("hex");

  const newClassroom = await Classroom.create({ 
    name,
    teacherId : userId,
    students : [{ user: userId, role: 'teacher' }],
    code : invitationCode
  });

  res.status(201).json(new ApiResponse(201, newClassroom, "Classroom created successfully"));
})

const getMyClassrooms = asyncHandler(async (req, res) => {
  //get userId from request token 
  const userId = req.user._id;

  //find classrooms for the user
  const classroom = await Classroom.find({
    "students.user" : userId
  }).populate("teacherId", "fullname email");

  res.status(201).json(new ApiResponse(201, classroom, "All The Classroom fetched successfully"));
})

const getClassroomById = asyncHandler( async(req, res) => {

  const classroom = req.classroom; // Assuming the classroom is attached to the request object by the validateClassroomAccess middleware
  
  //if user is a member, return classroom details
  res.status(200).json(new ApiResponse(200, classroom, "Classroom fetched successfully"));

})

const updateClassroom = asyncHandler(async (req, res) => {
  const classroom = req.classroom; // Assuming the classroom is attached to the request object by the validateClassroomAccess middleware
  const { name } = req.body;
  
  if(name?.trim()) classroom.name = name;

  await classroom.save();

  res.status(200).json(new ApiResponse(200, classroom, "Classroom updated successfully"));
})

// const inviteUsers = asyncHandler(async (req, res) =>{

//   const classroom = req.classroom; // Assuming the classroom is attached to the request object by the validateClassroomAccess middleware
//   const { email } = req.body;

//   const invitationCode = crypto.randomBytes(12).toString("hex");
  
//   const inviteUrl = `http://localhost:5173/join/${invitationCode}`;
//   const message = `Join the workspace: ${inviteUrl}`;

//   // notification for invited user
//   const inviteUser  = await User.findOne({ email });
//   // console.log("invite user", inviteUser);


//   try{
//     await sendEmail({
//       to : email,
//       subject : "classroom join link",
//       text : message
//     })
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }

//   // save the invitation token to the classroom document
//   classroom.code = invitationCode;
//   await classroom.save();


//   res.status(200).json(new ApiResponse(200, null, "Invitation sent successfully",))

// })

const joinClassroom = asyncHandler(async (req, res) =>{
  const {invitationToken} = req.body
  const  userId  = req.user._id;

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

  res.status(200).json(new ApiResponse (200, classroom, "You have successfully joined the classroom"));

})

const deleteClassroom = asyncHandler(async (req, res) => {
  const classroom = req.classroom;

  await classroom.deleteOne();

  res.status(200).json(new ApiResponse(200, null, "Classroom deleted successfully"));
})

export { createClassroom, getMyClassrooms, getClassroomById, updateClassroom, joinClassroom, deleteClassroom }