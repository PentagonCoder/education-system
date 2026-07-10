import { useState } from "react";
import { askAI } from "../../services/aiService";
function AIAssistant() {

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const handleSend = async () => {

    if (!prompt.trim()) return;

    const userMessage = {
      role: "user",
      text: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      let res;

      if(selectedClassroom){
        res = await askAI ({ prompt, classroomId: selectedClassroom, });
      } else {
        res = await askAI ({ prompt,});
      }

      console.log(res.data);

    const aiData = res.data.data;

    const aiMessage = {
        role: "assistant",
        text: res.data.data.message,
        data: aiData,
    };

    setMessages(prev => [...prev, aiMessage]);

    // Save classroom id
    if (aiData.type === "classroom") {
        setSelectedClassroom(aiData.classroom._id);
    }

    } catch (err) {

        setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                text: "Something went wrong.",
            },
        ]);

    }

    setPrompt("");
    setLoading(false);
};

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-2">
          🤖 AI Teacher Assistant
      </h1>

      <p className="text-gray-500 mb-8">
          Create classrooms, assignments and more using AI.
      </p>

      <div className="space-y-4 mb-8">

          {messages.map((msg, index) => (

              <div
                  key={index}
                  className={`p-4 rounded-xl ${
                      msg.role === "user"
                          ? "bg-blue-500 text-white ml-auto max-w-xl"
                          : "bg-gray-200 text-black mr-auto max-w-xl"
                  }`}
              >
                  {msg.text}

                  {msg.data?.type === "classroom" && (

                    <div className="mt-3 border-t pt-3">

                        <p>
                            📚 <b>Classroom:</b> {msg.data.classroom.name}
                        </p>

                        <p className="mt-2 text-sm">
                            {msg.data.classroom.description}
                        </p>

                    </div>

                )}

                {msg.data?.type === "assignment" && (

                    <div className="mt-3 border-t pt-3">

                        <p className="font-semibold mb-3">
                            📝 Assignments Created
                        </p>

                        {msg.data.assignments.map((assignment) => (

                            <div
                                key={assignment._id}
                                className="border rounded-lg p-3 mb-3"
                            >

                                <p>
                                    <b>{assignment.title}</b>
                                </p>

                                <p className="text-sm mt-1">
                                    {assignment.description}
                                </p>

                                <p className="text-sm text-gray-500 mt-2">
                                    Due:
                                    {" "}
                                    {new Date(
                                        assignment.dueDate
                                    ).toLocaleDateString()}
                                </p>

                            </div>

                        ))}

                    </div>

                )}
                  

              </div>

          ))}

      </div>

      <textarea
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          placeholder="Ask anything..."
          className="w-full h-40 border rounded-xl p-4 resize-none"
      />

      <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
          {loading ? "Thinking..." : "Send"}
      </button>

    </div>
  );
}

export default AIAssistant;