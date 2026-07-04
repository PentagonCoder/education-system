import { Router } from 'express';
const router = Router();

import {verifyjwt} from '../middlewares/auth.middleware.js';
import { validateSubmissionAccess } from '../middlewares/submission.middleware.js';
import { createSubmission, getMySubmissions, getSubmissionById } from '../controllers/submission.controller.js';
import { authorizeRoles  } from '../middlewares/role.middleware.js';

// Create a new assignment
router.post('/create/:assignmentId', verifyjwt,  authorizeRoles ('student'), createSubmission);

// Get all assignments for the authenticated user
router.get('/my-submission/:assignmentId', verifyjwt, getMySubmissions);

// Get a specific assignment by ID
router.get('/:assignmentId', verifyjwt, validateSubmissionAccess(['student']), getSubmissionById);

// Update an assignment by ID
// router.patch('/:assignmentId', verifyjwt, validateAssignmentAccess(['owner']), updateAssignment);

// Invite users to workspace
// router.post('/invite-users/:workspaceId', verifyjwt, validateWorkspaceAccess(['owner', 'admin']), inviteUsers);

// // Join workspace using invitation token
// router.post('/join-workspace/:invitationToken', verifyjwt, joinWorkspace);

// // Role assignment
// router.post('/Role-Asing/:workspaceId', verifyjwt, validateWorkspaceAccess(['owner']), roleAsign);

// Delete an assignment by ID
// router.delete('/:assignmentId', verifyjwt, validateAssignmentAccess(['owner']), deleteAssignment);

export default router;