import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to EduHub</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Manage classrooms, assignments, and AI assistance all in one place.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-indigo-700 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-800 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
