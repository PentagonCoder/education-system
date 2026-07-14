import { useEffect, useState } from "react";
import api from "../../api/axios";
import { fetchProfile } from "../../services/authService";
import { useForm } from "react-hook-form";
import { joinClassroom } from "../../services/classroomService";
import { Link } from "react-router-dom";
import { fetchMyClassrooms } from "../../services/classroomService";

function DashboardStudent() {
  const [userProfile, setUserProfile] = useState(null);
  const [userClassrooms, setUserClassrooms] = useState([]);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

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

  const joinClassroombyCode = async (data) => {
      setError(null);
      try {
        const response = await joinClassroom(data);
        setUserClassrooms([...userClassrooms, response.data.data]);
        console.log("Classroom joined:", response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Join classroom failed");
      }
    };

  return (
  <div className="space-y-8">
    {/* Profile Card */}
    <div className="bg-white rounded-xl shadow-md p-6 border">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <h2 className="text-xl font-semibold mb-4">Profile</h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Name:</span>{" "}
          {userProfile?.data.fullname}
        </p>

        <p>
          <span className="font-semibold">Email:</span>{" "}
          {userProfile?.data.email}
        </p>

        <p>
          <span className="font-semibold">Role:</span>{" "}
          <span className="capitalize bg-green-100 text-green-700 px-2 py-1 rounded">
            {userProfile?.data.role}
          </span>
        </p>
      </div>
    </div>

    {/* Join Classroom */}
    <div className="bg-white rounded-xl shadow-md p-6 border">
      <h2 className="text-2xl font-semibold mb-5">
        Join Classroom
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(joinClassroombyCode)}
        className="flex gap-4"
      >
        <input
          type="text"
          placeholder="Enter Classroom Code"
          {...register("invitationToken", { required: true })}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          type="submit"
        >
          Join
        </button>
      </form>

      {errors?.invitationToken && (
        <p className="text-red-500 mt-2">
          Classroom Code is required
        </p>
      )}
    </div>

    {/* My Classrooms */}
    <div className="bg-white rounded-xl shadow-md p-6 border">
      <h2 className="text-2xl font-semibold mb-5">
        My Classrooms
      </h2>

      {userClassrooms.length === 0 ? (
        <p className="text-gray-500">
          You haven't joined any classroom yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {userClassrooms.map((classroom) => (
            <Link
              key={classroom._id}
              to={`/student/classrooms/${classroom._id}`}
              className="border rounded-xl p-5 hover:shadow-lg hover:border-blue-500 transition"
            >
              <h3 className="text-xl font-semibold">
                {classroom.name}
              </h3>

              <p className="text-gray-500 mt-2">
                Open Classroom →
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
);
}

export default DashboardStudent;