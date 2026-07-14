import { useState } from "react";
import { askAI } from "../../services/aiService";

function AiAssistant({ classroomId }) {

  const [prompt, setPrompt] = useState("");

    const handleAskAI = async () => {

    try{

      const response = await askAI({
        prompt,
        classroomId
      });

      console.log(response.data);

    }catch(err){
      console.log(err);
    }
}

  return (
    <div>

      <textarea
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        placeholder="Ask AI..."
      />

      <button onClick={handleAskAI}>
        Send
      </button>

    </div>
  );
}

export default AiAssistant;