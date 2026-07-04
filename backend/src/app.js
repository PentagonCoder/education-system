import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


import { notFound } from './middlewares/notFound.middleware.js'
import { errorHandler } from './middlewares/error.middleware.js'

import userRoutes from './routes/user.routes.js'
import assignmentRouter from "./routes/assignment.routes.js";
import submissionRouter from "./routes/submission.routes.js";

app.use('/api/users', userRoutes);
app.use('/api/assignment', assignmentRouter)
app.use('/api/submission', submissionRouter)

app.use(notFound);
app.use(errorHandler);

export {app};