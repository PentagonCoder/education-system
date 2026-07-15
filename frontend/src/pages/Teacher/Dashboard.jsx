import { useEffect, useState } from "react";
import { fetchProfile } from "../../services/authService";
import { fetchMyClassrooms, createClassroom, deleteClassroom } from "../../services/classroomService";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function DashboardTeacher() {
  const [userProfile, setUserProfile] = useState(null);
  const [userClassrooms, setUserClassrooms] = useState([]);

  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchProfile();
        setUserProfile(response.data);
        console.log("User profile fetched:", response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchUserClassrooms = async () => {
      try {
        const response = await fetchMyClassrooms();
        setUserClassrooms(response.data.data);
        console.log("User classrooms fetched:", response.data);
      } catch (error) {
        console.error("Error fetching user classrooms:", error);
      }
    };

    fetchUserProfile();
    fetchUserClassrooms();
  }, []);

  const RemoveClassroom = async (classroomId) => {
    try {
      await deleteClassroom(classroomId);
      setUserClassrooms((prev) => prev.filter((classroom) => classroom._id !== classroomId));
    } catch (error) {
      console.error("Error deleting classroom:", error);
    }
  };

  const handleCreateClassroom = async (data) => {
    setError(null);
    try {
      const response = await createClassroom(data);
      setUserClassrooms((prev) => [...prev, response.data.data]);
      console.log("Classroom created:", response.data);
      setError(null);
      reset();
    } catch (err) {
      setError(err.response?.data?.message || "Create classroom failed");
    }
  };

  return (
  <div className="space-y-8">
    {/* Profile */}
    <div className="bg-white rounded-xl shadow-md border p-6">
      <h1 className="text-3xl font-bold mb-6">
        Teacher Dashboard
      </h1>

      <h2 className="text-xl font-semibold mb-4">
        Welcome back, {userProfile?.data.fullname} 👋
      </h2>

      <div className="space-y-2 text-gray-700">
        {/* <p>
          <span className="font-semibold">Name:</span>{" "}
          {userProfile?.data.fullname}
        </p>

        <p>
          <span className="font-semibold">Email:</span>{" "}
          {userProfile?.data.email}
        </p> */}

        <p>
          <span className="font-semibold">Role:</span>{" "}
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize">
            {userProfile?.data.role}
          </span>
        </p>
      </div>
      <p className="text-gray-500 mt-2">
        You have created {userClassrooms.length} classroom
        {userClassrooms.length !== 1 && "s"}.
      </p>
    </div>

    {/* Create Classroom */}
    <div className="bg-white rounded-xl shadow-md border p-6">
      <h2 className="text-2xl font-semibold mb-5">
        Create Classroom
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleCreateClassroom)}
        className="flex gap-4"
      >
        <input
          type="text"
          placeholder="Classroom Name"
          {...register("name", { required: true })}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Classroom Description"
          {...register("description")}
          className="flex-2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition"
        >
          Create
        </button>
      </form>

      {errors?.name && (
        <p className="text-red-500 mt-2">
          Classroom name is required
        </p>
      )}
    </div>

    {/* Classroom List */}
    <div className="bg-white rounded-xl shadow-md border p-6">
      <h2 className="text-2xl font-semibold mb-5">
        My Classrooms
      </h2>

      {userClassrooms.length === 0 ? (
        <p className="text-gray-500">
          No classrooms created yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {userClassrooms.map((classroom) => (
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
                  onClick={() => RemoveClassroom(classroom._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}

export default DashboardTeacher;