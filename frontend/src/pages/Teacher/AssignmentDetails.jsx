import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAssignmentById } from "../../services/assignmentService";
import { fetchMySubmissions } from "../../services/submissionService";

function AssignmentDetailTeacher() {
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const { classroomId, assignmentId } = useParams();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetchAssignmentById(classroomId, assignmentId);
        setAssignment(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSubmissions = async () => {
      try {
        const response = await fetchMySubmissions(assignmentId);
        setSubmissions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAssignment();
    fetchSubmissions();
  }, []);

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Assignment Details */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            {assignment?.title}
          </h1>

          <p className="text-slate-600 mb-4">
            {assignment?.description}
          </p>

          <p className="font-semibold text-slate-700">
            Due Date:
            <span className="ml-2 text-blue-600">
              {assignment &&
                new Date(assignment.dueDate).toLocaleDateString()}
            </span>
          </p>
        </div>

        {/* Student Submissions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Student Submissions
          </h2>

          {submissions.length === 0 ? (
            <p className="text-gray-500">
              No submissions yet.
            </p>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission._id}
                  className="border rounded-lg p-5 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {submission.studentId.fullname}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        Submitted on{" "}
                        {new Date(
                          submission.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        submission.status === "submitted"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AssignmentDetailTeacher;