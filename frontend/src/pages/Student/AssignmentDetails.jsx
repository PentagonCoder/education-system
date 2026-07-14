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
  <div className="space-y-8">

    {/* Assignment Details */}
    <div className="bg-white rounded-xl shadow-md border p-6">

      <h1 className="text-3xl font-bold">
        {assignment?.title}
      </h1>

      <p className="text-gray-600 mt-4">
        {assignment?.description}
      </p>

      <div className="mt-6">
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
          Due Date:{" "}
          {assignment?.dueDate
            ? new Date(assignment.dueDate).toLocaleDateString()
            : "-"}
        </span>
      </div>

    </div>

    {/* Submit Assignment */}

    <div className="bg-white rounded-xl shadow-md border p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Submit Assignment
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(SubmiteAssignment)}
        className="space-y-5"
      >

        <div>

          <label className="block font-medium mb-2">
            Submission Status
          </label>

          <select
            {...register("status", { required: true })}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="submitted">
              Submitted
            </option>

            <option value="pending">
              Pending
            </option>
          </select>

          {errors.status && (
            <p className="text-red-500 mt-2">
              Status is required
            </p>
          )}

        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
        >
          Submit Assignment
        </button>

      </form>

      {submissions && (
        <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-lg">
          {submissions}
        </div>
      )}

    </div>

  </div>
);
}

export default AssignmentDetail;