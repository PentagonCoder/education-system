import { useState } from "react";
import { askAI } from "../../services/aiService";
import ChatWindow from "../../components/AI/ChatWindow";
import MessageInput from "../../components/AI/MessageInput";
import SuggestionCards from "../../components/AI/SuggestionCards";
import TypingIndicator from "../../components/AI/TypingIndicator";
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
    const handleSuggestion = (text) => {
        setPrompt(text);
    };
  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-2">
          🤖 AI Teacher Assistant
      </h1>
        <SuggestionCards
            onSelect={handleSuggestion}
        />
      <p className="text-gray-500 mb-8">
          Create classrooms, assignments and more using AI.
      </p>
      <ChatWindow messages={messages} loading={loading} />

      <MessageInput 
            prompt={prompt}
            setPrompt={setPrompt}
            onSend={handleSend}
            loading={loading}
        />

    </div>
  );
}

export default AIAssistant;