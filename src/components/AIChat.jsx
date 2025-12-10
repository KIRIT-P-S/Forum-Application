import { useState } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const send = async () => {
    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // FAKE AI (replace with real API)
    setTimeout(() => {
      const aiMsg = {
        role: "assistant",
        content: "AI Response to: " + userMsg.content,
      };
      setMessages((m) => [...m, aiMsg]);
    }, 500);
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-3">AI Assistant</h2>

      <div className="flex-1 overflow-y-auto border rounded p-3 bg-gray-50">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded ${
              m.role === "user" ? "bg-blue-100" : "bg-green-100"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <div className="flex mt-3">
        <input
          className="flex-1 border px-2 py-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI..."
        />
        <button
          className="ml-2 bg-black text-white px-4 rounded"
          onClick={send}
        >
          Send
        </button>
      </div>
    </div>
  );
}
