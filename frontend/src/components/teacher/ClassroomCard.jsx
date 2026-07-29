import { Link } from "react-router-dom";

export function ClassroomCard({ classroom, onDelete }) {
  return (
    <div
      key={classroom._id}
      className="border rounded-xl p-5 hover:shadow-lg transition"
    >
      <Link
        to={`/teacher/classrooms/${classroom._id}`}
        className="block"
      >
        <h3 className="text-xl font-semibold text-blue-600 hover:underline">
          {classroom.name}
        </h3>
      </Link>

      <div className="mt-5 flex justify-between items-center">
        <Link
          to={`/teacher/classrooms/${classroom._id}`}
          className="text-blue-600 hover:underline"
        >
          Open →
        </Link>

        <button
          onClick={() => onDelete(classroom._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}