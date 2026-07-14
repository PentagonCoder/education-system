import { useEffect, useState } from "react";
import { fetchProfile } from "../../services/authService";
import { fetchMyClassrooms, createClassroom, deleteClassroom } from "../../services/classroomService";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function DashboardTeacher() {
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
    } catch (err) {
      setError(err.response?.data?.message || "Create classroom failed");
    }
  };

  return (
    <div>
      <h1>Teacher Dashboard Page</h1>
        <div>
          <h2>User Profile</h2>
          <p>Name: {userProfile?.data.fullname}</p>
          <p>Email: {userProfile?.data.email}</p>
          <p>Role: {userProfile?.data.role}</p>
        </div>
      <div>
        <h1>Create Classroom Page</h1>
          {error && <span>{error}</span>}
          {/* <Link to="/teacher/dashboard">Back to Dashboard</Link> */}
          <br />
          <br />
          <form onSubmit={handleSubmit(handleCreateClassroom)}>
            <h1>Create Classroom</h1>
            <input
              type="name"
              placeholder="name"
              {...register("name")}
            />
            {errors?.name && <span>Name is required</span>}
            <br />
            <button type="submit">
              Create Classroom
            </button>
          </form>

          {userClassrooms.length > 0 && (
            <div>
              <h2>My Classrooms</h2>
              <ul>
                {userClassrooms.map((classroom) => (
                  <div key={classroom?._id}>
                    <Link to={`/teacher/classrooms/${classroom._id}`}>{classroom?.name}</Link>
                    <button onClick={() => RemoveClassroom(classroom._id)}>Remove</button>
                  </div>
                ))}
              </ul>
            </div>
          )}

      </div>
    </div>
    
  );
}

export default DashboardTeacher;