import Avatar from "./Avatar";
import { motion } from "framer-motion";
function ChatBubble({ msg }) {
  return (
    <motion.div
      className="flex gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >

      <Avatar role={msg.role} />

      <div className="flex-1">

        <h3 className="font-semibold mb-2">
          {msg.role === "assistant"
            ? "AI Assistant"
            : "You"}
        </h3>

        <div className="bg-white rounded-2xl shadow p-5">

          <p>{msg.text}</p>

          {msg.data && (
            <div className="mt-4 border-t pt-4">

              {/* Classroom Card */}
              {msg.data.type === "classroom" && (
                <div className="rounded-xl border p-4 bg-blue-50">

                  <h2 className="font-bold text-lg">
                    📚 {msg.data.classroom.name}
                  </h2>

                  <p className="text-sm text-gray-600 mt-2">
                    {msg.data.classroom.description}
                  </p>

                </div>
              )}

              {/* Assignment Cards */}
              {msg.data.type === "assignment" && (
                <div>

                  <h2 className="font-bold mb-4">
                    📝 Assignments Created
                  </h2>

                  <div className="space-y-3">

                    {msg.data.assignments.map((assignment) => (
                      <div
                        key={assignment._id}
                        className="rounded-xl border p-4 bg-green-50"
                      >

                        <h3 className="font-semibold">
                          {assignment.title}
                        </h3>

                        <p className="text-sm mt-2">
                          {assignment.description}
                        </p>

                        <p className="text-xs text-gray-500 mt-3">
                          📅{" "}
                          {new Date(
                            assignment.dueDate
                          ).toLocaleDateString()}
                        </p>

                      </div>
                    ))}

                  </div>

                </div>
              )}

              {/* Course Card */}

              {msg.data.type === "course" && (

                <div className="space-y-4">

                  <div className="rounded-xl border p-4 bg-blue-50">

                    <h2 className="font-bold">
                      📚 {msg.data.classroom.name}
                    </h2>

                    <p className="text-sm mt-2">
                      {msg.data.classroom.description}
                    </p>

                  </div>

                  <div>

                    <h3 className="font-bold mb-3">
                        📝 Assignments
                    </h3>

                    {msg.data.assignments.map((assignment)=>(
                      <div
                        key={assignment._id}
                        className="border rounded-xl p-4 mb-3"
                      >

                        <p className="font-semibold">
                          {assignment.title}
                        </p>

                        <p className="text-sm mt-2">
                          {assignment.description}
                        </p>

                      </div>
                    ))}

                  </div>

                </div>

              )}

            </div>
          )}

        </div>

      </div>

    </motion.div>
  );
}

export default ChatBubble;