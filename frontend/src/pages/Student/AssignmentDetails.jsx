import { useEffect, useState } from "react";
import { fetchClassroomById } from "../../services/classroomService";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
// import Assigment from "./CreateAssignment";
import { fetchAssignmentById } from "../../services/assignmentService";
import { createSubmission } from "../../services/submissionService";
function AssignmentDetail() {
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { classroomId, assignmentId } = useParams()

  useEffect(() => {

    const fetchAssignment = async () => {
      try {
        const response = await fetchAssignmentById(classroomId, assignmentId);
        setAssignment(response.data.data);
        console.log("User assignment fetched:", response.data);
      } catch (error) {
        console.error("Error fetching user assignment:", error);
      }
    };

    fetchAssignment();
  }, []);

  const SubmiteAssignment = async (data) => {
    setError(null);
    try {
      const response = await createSubmission(assignmentId, data);
      setSubmissions( response.data.message);
      console.log("Assignment submitted:", response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Submit assignment failed");
    }
  };

  return (
    <div>
      <h1>Assignment: {assignment?.title}</h1>
      <p>{assignment?.description}</p>
      <p>Due Date: {new Date(assignment?.dueDate).toLocaleDateString()}</p>
      <div>
        <h2>Submissions</h2>
          <form onSubmit={handleSubmit(SubmiteAssignment)}>
            <br />
            <span>Role:</span>
            <select {...register("status", { required: true })}>
              <option value="submitted">Submitted</option>
              <option value="pending">Pending</option>
            </select>
            {errors.status && <span>Status is required</span>}
            <br />
            <button type="submit">
              Submit Assignment
            </button>
          </form>
          <div>
            {submissions}
          </div>

      </div>
    </div>
    
  );
}

export default AssignmentDetail;