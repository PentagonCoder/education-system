import { Router } from 'express';
const router = Router();

import {verifyjwt} from '../middlewares/auth.middleware.js';
import { validateAssignmentAccess } from '../middlewares/assignment.middleware.js';
import { createAssignment, getMyAssignments, getAssignmentById, updateAssignment, deleteAssignment } from '../controllers/assignment.controller.js';
import { authorizeRoles  } from '../middlewares/role.middleware.js';

// Create a new assignment
router.post('/create', verifyjwt, authorizeRoles ('teacher'), createAssignment);

// Get all assignments for the authenticated user
router.get('/my-assignments', verifyjwt, getMyAssignments);

// Get a specific assignment by ID
router.get('/:assignmentId', verifyjwt, validateAssignmentAccess(['student', 'teacher']), getAssignmentById);

// Update an assignment by ID
router.patch('/:assignmentId', verifyjwt, validateAssignmentAccess(['teacher']), updateAssignment);

// Invite users to workspace
// router.post('/invite-users/:workspaceId', verifyjwt, validateWorkspaceAccess(['owner', 'admin']), inviteUsers);

// // Join workspace using invitation token
// router.post('/join-workspace/:invitationToken', verifyjwt, joinWorkspace);

// Delete an assignment by ID
router.delete('/:assignmentId', verifyjwt, validateAssignmentAccess(['teacher']), deleteAssignment);

export default router;