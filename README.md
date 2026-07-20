# Assignment Management System

A full-stack classroom workspace for teachers and students. Teachers can organise classrooms and assignments; students can join classrooms and record submissions. The application also includes an AI assistant that can create classrooms and assignments from natural-language requests.

## Features

- Role-based accounts for **teachers** and **students**
- Email verification, login, refresh-token sessions, logout, and password-reset endpoints
- Classroom creation, editing, deletion, and joining by invitation code
- Assignment creation, viewing, editing, and deletion for authorised teachers
- Student assignment views and submission-status tracking
- Separate teacher and student dashboards
- Gemini-powered assistant for creating classrooms and one or more assignments

## Tech stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, Vite, React Router, React Query, Zustand, Axios, Tailwind CSS |
| Backend | Node.js, Express 5, Mongoose, JWT, bcrypt, Zod |
| Database | MongoDB |
| Integrations | Google Gemini API and Nodemailer |

## Project structure

```text
.
├── frontend/                 # React single-page application
│   └── src/
│       ├── pages/            # Auth, dashboard, classroom, assignment and AI views
│       ├── components/       # Layout and AI chat components
│       ├── services/         # API client calls
│       └── store/            # Authentication state
└── backend/                  # Express API
    └── src/
        ├── controllers/      # Request handlers
        ├── routes/           # /api route definitions
        ├── model/            # Mongoose models
        ├── middlewares/      # Auth, role and access checks
        ├── Services/         # Classroom and assignment domain logic
        └── ai/               # Gemini agent and tool handlers
```

## Getting started

### Prerequisites

- Node.js 20 or later
- A MongoDB database (local or Atlas)
- A Google Gemini API key for the AI assistant
- SMTP credentials if email verification and password-reset email should be sent

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure the API

Create `backend/.env` using the following values:

```env
PORT=3000

# The application appends /test to this value when connecting.
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>

ACCESS_TOKEN_SECRET=replace-with-a-long-random-secret
REFRESH_TOKEN_SECRET=replace-with-a-different-long-random-secret
ACCEES_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

EMAIL_USER=your-smtp-email@example.com
EMAIL_PASS=your-smtp-password-or-app-password
VERIFYLINK=http://localhost:5173/verify-email

GEMINI_API_KEY=your-gemini-api-key
```

`ACCEES_TOKEN_EXPIRES` is intentionally spelled as it appears in the current backend code.

### 3. Start the applications

In one terminal:

```bash
cd backend
npm run dev
```

In another terminal:

```bash
cd frontend
npm run dev
```

Open the Vite address printed in the terminal (normally `http://localhost:5173`). The API listens on `http://localhost:3000`.

## Available scripts

| Location | Command | Purpose |
| --- | --- | --- |
| `backend` | `npm run dev` | Start the Express server with Nodemon |
| `frontend` | `npm run dev` | Start the Vite development server |
| `frontend` | `npm run build` | Create a production build |
| `frontend` | `npm run lint` | Run ESLint |
| `frontend` | `npm run preview` | Preview the frontend production build |

## API overview

All API routes are prefixed with `/api`. Protected routes expect the JWT cookie created at login.

| Resource | Base path | Main operations |
| --- | --- | --- |
| Users | `/api/users` | Register, verify email, login, profile, refresh session, logout, password reset, dashboards |
| Classrooms | `/api/classroom` | Create, list mine, read/update/delete, join with invitation token |
| Assignments | `/api/assignment` | Create, list by classroom, read/update/delete |
| Submissions | `/api/submission` | Create/update a submission, list submissions for an assignment |
| AI assistant | `/api/ai/chat` | Send a prompt; the agent can create classrooms and assignments |

## Authentication and roles

New users select either the `teacher` or `student` role during registration and must verify their email before logging in. The API issues HTTP-only access and refresh cookies on login. Route middleware enforces both authentication and resource/role access.

## Development notes

- The frontend API client is currently configured for `http://localhost:3000` in `frontend/src/api/axios.js`.
- CORS currently permits Vite development ports `5173` through `5176`.
- Authentication cookies are configured with `secure: true`; browsers only send them over HTTPS. Use HTTPS locally or adjust this deliberately for a local-only development environment.
- No automated test suite is configured yet; use the frontend lint and production-build commands as baseline checks.

## Security

Never commit `.env` files, database credentials, SMTP passwords, JWT secrets, or Gemini keys. If any real credentials have been committed, rotate them immediately and remove them from version control history before sharing the repository.

## License

No license has been specified for this project.
