import { Router } from 'express';
const router = Router();

import {verifyjwt} from '../middlewares/auth.middleware.js';
import { validateAssignmentAccess } from '../middlewares/assignment.middleware.js';
import { createAssignment, getMyAssignments, getAssignmentById, updateAssignment, deleteAssignment,getMyAssignmentsByClassroom } from '../controllers/assignment.controller.js';
import { authorizeRoles  } from '../middlewares/role.middleware.js';

// Create a new assignment
router.post('/:classroomId/create', verifyjwt, authorizeRoles ('teacher'), createAssignment);

// Get all assignments for the authenticated user
router.get('/:classroomId/my-assignments', verifyjwt, getMyAssignmentsByClassroom);

// Get a specific assignment by ID
router.get('/:classroomId/assignments/:assignmentId', verifyjwt, validateAssignmentAccess(['student', 'teacher']), getAssignmentById);

// Update an assignment by ID
router.patch('/:classroomId/assignments/:assignmentId', verifyjwt, validateAssignmentAccess(['teacher']), updateAssignment);

// Delete an assignment by ID
router.delete('/:classroomId/assignments/:assignmentId', verifyjwt, validateAssignmentAccess(['teacher']), deleteAssignment);

export default router;