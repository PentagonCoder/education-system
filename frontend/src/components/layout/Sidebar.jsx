import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function Sidebar() {
  const user = useAuthStore(state => state.user);

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

      <nav className="flex flex-col gap-4">
        <div>
          {user && user.data?.role?.toLowerCase() === "teacher" ? (
            <Link
              to="/teacher/dashboard"
              className="hover:bg-slate-700 px-4 py-2 rounded-lg block"
            >
              Teacher Dashboard
            </Link>
          ) : (
            <Link
              to="/student/dashboard"
              className="hover:bg-slate-700 px-4 py-2 rounded-lg block"
            >
              Student Dashboard
            </Link>
          )}
        </div>

        <Link
          to="/members"
          className="hover:bg-slate-700 px-4 py-2 rounded-lg block"
        >
          Members
        </Link>

        <Link
          to="/settings"
          className="hover:bg-slate-700 px-4 py-2 rounded-lg block"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
