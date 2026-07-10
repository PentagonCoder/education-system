import {getMyAiResponse} from "../ai/gemini.js";
import { Router } from 'express';
import { verifyjwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/chat',verifyjwt, getMyAiResponse);

export default router;
