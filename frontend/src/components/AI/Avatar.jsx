import { Bot, User } from "lucide-react";

function Avatar({ role }) {
    return (
        <div
            className={`w-10 h-10 rounded-full flex items-center justify-center
            ${
                role === "assistant"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-white"
            }`}
        >
            {role === "assistant" ? (
                <Bot size={20} />
            ) : (
                <User size={20} />
            )}
        </div>
    );
}

export default Avatar;