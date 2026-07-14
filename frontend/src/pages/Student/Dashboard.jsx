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
    <div>
      <h1>Student Dashboard Page</h1>
        <div>
          <h2>User Profile</h2>
          <p>Name: {userProfile?.data.fullname}</p>
          <p>Email: {userProfile?.data.email}</p>
          <p>Role: {userProfile?.data.role}</p>
        </div>
        <div>
          <h2>ClassRoom</h2>
          <form onSubmit={handleSubmit(joinClassroombyCode)}>
            <h1>Join Classroom</h1>
            <input
              type="code"
              placeholder="Classroom Code"
              {...register("invitationToken", { required: true })}
            />
            {errors?.invitationToken && <span>Classroom Code is required</span>}
            <br />
            <button type="submit">
              Join Classroom
            </button>
          </form>

          {userClassrooms.length > 0 && (
            <div>
              <h2>My Classrooms</h2>
              <ul>
                {userClassrooms.map((classroom) => (
                  <div key={classroom?._id}>
                    <Link to={`/student/classrooms/${classroom._id}`}>{classroom?.name}</Link>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
    </div>
  );
}

export default DashboardStudent;