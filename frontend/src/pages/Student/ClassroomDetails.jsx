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
  <div className="space-y-8">

    {/* Classroom Info */}
    <div className="bg-white border rounded-xl shadow-md p-6">
      <h1 className="text-3xl font-bold">
        {userClassrooms?.name}
      </h1>

      <p className="text-gray-600 mt-3">
        {userClassrooms?.description}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
        <span className="font-semibold">
          Classroom Code:
        </span>

        <span>{userClassrooms?.code}</span>
      </div>
    </div>

    {/* Assignments */}

    <div className="bg-white border rounded-xl shadow-md p-6">

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
          No assignments available.
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
                  to={`/student/classrooms/${classroomId}/assignments/${assignment._id}`}
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Open Assignment
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

export default ClassroomDetailsStudent;