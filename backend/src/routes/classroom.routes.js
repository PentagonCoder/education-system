import { Router } from 'express';
const router = Router();

import {verifyjwt} from '../middlewares/auth.middleware.js';
import { validateClassroomAccess } from '../middlewares/classromm.middleware.js';
import { createClassroom, getMyClassrooms, getClassroomById, updateClassroom, joinClassroom, deleteClassroom } from '../controllers/classroom.controller.js';

// Create a new classroom
router.post('/create', verifyjwt, createClassroom);

// Get all classrooms for the authenticated student or teacher
router.get('/my-classrooms', verifyjwt, getMyClassrooms);

// Get a specific classroom by ID
router.get('/:classroomId', verifyjwt, validateClassroomAccess(['student','teacher']), getClassroomById);

// Update a classroom by ID
router.patch('/:classroomId', verifyjwt, validateClassroomAccess(['teacher']), updateClassroom);

// Invite users to classroom
// router.post('/invite-users/:classroomId', verifyjwt, validateClassroomAccess(['teacher', 'student']), inviteUsers);

// Join classroom using invitation token
router.post('/join-classroom', verifyjwt, joinClassroom);

// Delete a classroom by ID
router.delete('/:classroomId', verifyjwt, validateClassroomAccess(['teacher']), deleteClassroom);

export default router;