function MessageInput({
  prompt,
  setPrompt,
  onSend,
  loading,
}) {

  const handleKeyDown = (e) => {
    // Press Enter to send
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="space-y-4">

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask AI to create classrooms, assignments..."
        className="w-full h-40 border rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={onSend}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Thinking..." : "Send"}
      </button>

    </div>
  );
}

export default MessageInput;