import { useEffect, useState } from "react";
import { fetchClassroomById } from "../../services/classroomService";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
// import Assigment from "./CreateAssignment";
import { fetchAssignmentById } from "../../services/assignmentService";
import { createSubmission,fetchMySubmissions } from "../../services/submissionService";
function AssignmentDetailTeacher() {
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
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

    const fetchSubmissions = async () => {
      try {
        const response = await fetchMySubmissions(assignmentId);
        setSubmissions(response.data.data);
        console.log("User submissions fetched:", response.data);
      } catch (error) {
        console.error("Error fetching user submissions:", error);
      }
    };

    fetchAssignment();
    fetchSubmissions();
  }, []);


  return (
    <div>
      <h1>Assignment: {assignment?.title}</h1>
      <p>{assignment?.description}</p>
      <p>Due Date: {new Date(assignment?.dueDate).toLocaleDateString()}</p>
      <div>
        <h2>Submissions</h2>
          
          <div>
            {submissions.map((submission) => (
              <div key={submission._id}>
                <p>Student: {submission.studentId.fullname}</p>
                <p>Status: {submission.status}</p>
                <p>Submitted At: {new Date(submission.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

      </div>
    </div>
    
  );
}

export default AssignmentDetailTeacher;