# Assignment Management System — Context for ChatGPT

Copy this document into a new ChatGPT conversation when you need help with this project.

## Project goal

This is a full-stack web application where teachers create classrooms and assignments, and students join classrooms, view assignments, and submit a status. It also has a Gemini AI assistant that can create classrooms and assignments from natural-language prompts.

## Stack

- Frontend: React 19 + Vite, React Router, Axios, Zustand, React Hook Form, Tailwind CSS.
- Backend: Node.js, Express 5, MongoDB/Mongoose, JWT cookies, bcrypt, Zod, Multer.
- External services: Google Gemini, Nodemailer, Cloudinary (assignment attachments).
- Frontend development URL: `http://localhost:5173`.
- Backend API URL: `http://localhost:3000` (hard-coded in `frontend/src/api/axios.js`).

## Start commands

```bash
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

`backend/.env` needs MongoDB, JWT, SMTP, Gemini, and Cloudinary values:

```env
PORT=3000
MONGODB_URI=...
ACCESS_TOKEN_SECRET=...
REFRESH_TOKEN_SECRET=...
ACCEES_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d
EMAIL_USER=...
EMAIL_PASS=...
VERIFYLINK=http://localhost:5173/verify-email
GEMINI_API_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Note: `ACCEES_TOKEN_EXPIRES` is intentionally misspelled because the existing code uses that spelling.

## Main folders

```text
frontend/src/
  api/axios.js                 Axios client
  pages/Auth/                  Register, login, verification
  pages/Teacher/               Teacher dashboard, classroom, assignment details
  pages/Student/               Student dashboard, classroom, assignment details
  services/                    API request functions
  store/authStore.js           Auth state
  components/AI/               Chat UI

backend/src/
  routes/                      Express endpoints
  controllers/                 HTTP request handlers
  Services/                    Classroom and assignment business logic
  model/                       Mongoose models
  middlewares/                 JWT, roles, classroom/assignment access, Multer
  ai/                          Gemini agent and tool functions
  utils/                       API response/error helpers, email, Cloudinary
```

## Important routes

- Auth/users: `/api/users/register`, `/login`, `/profile`, `/logout`, verification and password-reset endpoints.
- Classrooms: `/api/classroom/create`, `/my-classrooms`, `/:classroomId`, `/join-classroom`.
- Assignments: `/api/assignment/:classroomId/create`, `/:classroomId/my-assignments`, and `/:classroomId/assignments/:assignmentId`.
- Submissions: `/api/submission/create/:assignmentId`, `/my-submission/:assignmentId`.
- AI: `POST /api/ai/chat`.

## Authentication and roles

Users register as `teacher` or `student`, verify email, then log in. Login sets HTTP-only JWT cookies. `verifyjwt` protects routes and `authorizeRoles` / access middleware checks permissions. CORS currently allows Vite ports 5173–5176.

## Assignment attachment / PDF work in progress

Teachers create assignments in `frontend/src/pages/Teacher/ClassroomDetails.jsx` using `FormData`; the file field is `attachedFile`. The backend route uses Multer (`backend/src/middlewares/multer.middleware.js`), then `backend/src/Services/assignment.service.js` uploads the attachment to Cloudinary and saves its `secure_url` as `Assignment.attachedFile`.

The attachment was not visible to students because `frontend/src/pages/Student/AssignmentDetails.jsx` did not render a link. A **View / download attachment** link was added there. Teacher assignment details also render a link. Both upgrade old `http:` URLs to `https:` in the browser.

Current attachment rules:

- Allowed: PDF, `.ppt`, `.pptx`.
- Maximum size: 10 MB.
- New Cloudinary uploads use `resource_type: "auto"` and a secure URL.
- After changing upload behavior, upload a **new** PDF; old MongoDB records still contain their old saved URLs.

If a newly uploaded PDF opens a Cloudinary unauthorized/not-found page, enable **Allow delivery of PDF and ZIP files** in Cloudinary Console → Settings → Security. This is an account setting, not a frontend issue.

## Current known issues / review targets

1. `backend/src/routes/submission.routes.js` declares `GET '/:assignmentId'` twice. Express will use the first matching route, so the second route is unreachable.
2. `backend/src/app.js` serves `express.static("public")`, while Multer writes temporary uploads to `src/public`; these paths do not match. Cloudinary upload makes local static serving unnecessary, but this should be cleaned up.
3. Authentication cookies are configured as secure. Plain `http://localhost` may not send them depending on browser/cookie configuration.
4. There is no automated test suite. `npm run build` in `frontend` is currently the baseline verification.
5. Do not expose or commit `.env` credentials.

## How to help safely

Before editing, inspect existing uncommitted changes with `git status --short` and preserve unrelated user work. Use `apply_patch` for source edits. When changing an API contract, update both frontend service/page and backend route/controller together. After frontend changes, run:

```bash
cd frontend && npm run build
```

## Current task state

The immediate task was: “PDF does not appear after clicking download.” The code now has student attachment rendering plus safer PDF upload settings. The next real-world test is: restart both apps, create an assignment with a brand-new PDF, open it as both teacher and student, and report the exact browser/network error if it still fails.
