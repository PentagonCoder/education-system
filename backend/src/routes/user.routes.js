import { Router } from 'express';

const router = Router();


import { registerUser, emailVerify, loginUser, getProfile, refreshToken, logoutUser, teacherDashboard, studentDashboard} from '../controllers/user.controller.js';
import { forgotPassword , resetPassword, forgotPasswordOtp, resetPasswordOtp} from '../controllers/auth.controller.js';
import {verifyjwt} from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema } from '../validators/user.validation.js';
import { authorizeRoles  } from '../middlewares/role.middleware.js';

// Register endpoint
router.post('/register', validate(registerSchema), registerUser);
router.get('/verify-email/:token', emailVerify)
router.post('/login', loginUser );
router.post('/refresh-Token', refreshToken);
router.get('/profile', verifyjwt, getProfile);
router.post('/logout', verifyjwt, logoutUser);
router.get('/teacher/dashboard', verifyjwt, authorizeRoles('teacher'), teacherDashboard);
router.get('/student/dashboard', verifyjwt, authorizeRoles('student'), studentDashboard);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/forgot-password-Otp', forgotPasswordOtp);
router.post('/reset-password-Otp', resetPasswordOtp,);

export default router;