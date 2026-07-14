import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
function ChatWindow({ messages, loading }) {
  return (
    <div className="space-y-4 mb-8">
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          msg={msg}
        />
      ))}
      {loading && <TypingIndicator />}
    </div>
  );
}

export default ChatWindow;