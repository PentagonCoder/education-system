import { useEffect, useState } from "react";
import { fetchClassroomById } from "../../services/classroomService";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
// import Assigment from "./CreateAssignment";
import { createAssignment, fetchMyAssignments } from "../../services/assignmentService";

function ClassroomDetails() {
  const [userClassrooms, setUserClassrooms] = useState(null);
  const [error, setError] = useState(null);
  const [assignment, setAssignment] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const {classroomId} = useParams()
  useEffect(() => {

    const fetchClassroom = async () => {
      try {
        const response = await fetchClassroomById(classroomId);
        setUserClassrooms(response.data.data);
        console.log("User classrooms fetched:", response.data);
      } catch (error) {
        console.error("Error fetching user classrooms:", error);
      }
    };
    const fetchAssignments = async () => {
      try {
        const response = await fetchMyAssignments(classroomId);
        setAssignment(response.data.data);
        console.log("User assignments fetched:", response.data);
      } catch (error) {
        console.error("Error fetching user assignments:", error);
      }
    };

    fetchAssignments();

    fetchClassroom();
  }, []);

  const handleCreateAssignment = async (data) => {
    setError(null);
    try {
      const response = await createAssignment(classroomId,data);
      setAssignment((prev) => [...prev, response.data.data]);
      console.log("Assignment created:", response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Create assignment failed");
    }
  };

  return (
    <div>
      <h1>classroom {userClassrooms?.name}</h1>
      <p>{userClassrooms?.description}</p>
      <p>{userClassrooms?.code}</p>
      <div>
        <h1>Create Classroom Page</h1>
          {error && <span>{error}</span>}
        
          {/* <Assigment classroomId={userClassrooms?._id} /> */}
      </div>
      <div>
      <h1>Create Assignment</h1>
        <form onSubmit={handleSubmit(handleCreateAssignment)}>
          <input
            type="title"
            placeholder="Assignment Name"
            {...register("title", { required: true })}
          />
          {errors?.title && <span>Title is required</span>}
          <br />
          <input
            type="description"
            placeholder="Assignment Description"
            {...register("description", { required: true })}
          />
          {errors?.description && <span>Description is required</span>}
          <br />
          <input
            type="date"
            placeholder="Due Date"
            {...register("dueDate", { required: true })}
          />
          {errors?.dueDate && <span>Due Date is required</span>}
          <br />
          <button type="submit">
            Create-Assignment
          </button>
        </form>
        {
          assignment.map((assignment) => (
            <div key={assignment._id}>
              <h2>{assignment.title}</h2>
              <p>{assignment.description}</p>
              <Link to={`/teacher/classrooms/${classroomId}/assignments/${assignment._id}`}>View Details</Link>
              <p>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
            </div>
          ))
        }
    </div>
    </div>
    
  );
}

export default ClassroomDetails;