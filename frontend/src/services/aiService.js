import api from "../api/axios";

export const askAI = (data) => {
    return api.post("/api/ai/chat", data);
};