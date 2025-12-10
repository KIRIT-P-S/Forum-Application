import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;

    const userMsg = { role: "user", content: input };
    const aiMsg = { role: "ai", content: `AI says: You typed "${input}"` };

    setMessages([...messages, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg">
      <h2 className="text-white font-bold mb-2">AI Chatbot</h2>
      <div className="h-64 overflow-y-auto mb-2 space-y-1">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={m.role === "user" ? "text-right text-blue-400" : "text-left text-gray-300"}
          >
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 p-2 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
