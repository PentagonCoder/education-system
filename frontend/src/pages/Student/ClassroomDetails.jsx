import { useEffect, useState } from "react";
import { fetchClassroomById } from "../../services/classroomService";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
// import Assigment from "./CreateAssignment";
import { createAssignment, fetchMyAssignments } from "../../services/assignmentService";

function ClassroomDetailsStudent() {
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

  return (
    <div>
      <h1>classroom {userClassrooms?.name}</h1>
      <p>{userClassrooms?.description}</p>
      <p>{userClassrooms?.code}</p>
      <div>
      </div>
      <div>
        {
          assignment.map((assignment) => (
            <div key={assignment._id}>
              <Link to={`/student/classrooms/${classroomId}/assignments/${assignment._id}`}>
                {assignment.title}
              </Link>
              <p>{assignment.description}</p>
              <p>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
            </div>
          ))
        }
    </div>
    </div>
    
  );
}

export default ClassroomDetailsStudent;