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
  <div className="space-y-8">

    {/* Classroom Info */}
    <div className="bg-white rounded-xl shadow-md border p-6">
      <h1 className="text-3xl font-bold">
        {userClassrooms?.name}
      </h1>

      <p className="text-gray-600 mt-3">
        {userClassrooms?.description}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
        <span className="font-semibold">Class Code:</span>
        <span>{userClassrooms?.code}</span>
      </div>
    </div>

    {/* Create Assignment */}
    <div className="bg-white rounded-xl shadow-md border p-6">

      <h2 className="text-2xl font-semibold mb-5">
        Create Assignment
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleCreateAssignment)}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Assignment Title"
          {...register("title", { required: true })}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.title && (
          <p className="text-red-500">
            Title is required
          </p>
        )}

        <textarea
          rows={4}
          placeholder="Assignment Description"
          {...register("description", { required: true })}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.description && (
          <p className="text-red-500">
            Description is required
          </p>
        )}

        <input
          type="date"
          {...register("dueDate", { required: true })}
          className="border rounded-lg px-4 py-2"
        />

        {errors.dueDate && (
          <p className="text-red-500">
            Due Date is required
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Create Assignment
        </button>

      </form>

    </div>

    {/* Assignment List */}

    <div className="bg-white rounded-xl shadow-md border p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-semibold">
          Assignments
        </h2>

        <span className="bg-gray-100 px-3 py-1 rounded-full">
          {assignment.length} Assignment
          {assignment.length !== 1 && "s"}
        </span>

      </div>

      {assignment.length === 0 ? (

        <p className="text-gray-500">
          No assignments created yet.
        </p>

      ) : (

        <div className="grid md:grid-cols-2 gap-5">

          {assignment.map((assignment) => (

            <div
              key={assignment._id}
              className="border rounded-xl p-5 hover:shadow-lg transition"
            >

              <h3 className="text-xl font-semibold">
                {assignment.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {assignment.description}
              </p>

              <p className="text-sm text-gray-500 mt-4">
                Due:{" "}
                {new Date(
                  assignment.dueDate
                ).toLocaleDateString()}
              </p>

              <div className="mt-5">

                <Link
                  to={`/teacher/classrooms/${classroomId}/assignments/${assignment._id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  View Submissions
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
);
}

export default ClassroomDetails;