import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { handleLogout, loading } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-white shadow px-6 py-4">
      <h1 className="text-2xl font-bold text-indigo-600">
        Classroom LMS
      </h1>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </nav>
  );
}

export default Navbar;