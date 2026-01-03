"use client";

import { useState } from "react";
import ChatInput from "../components/ChatInput";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(text) {
    if (!text.trim()) return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch(
        "https://ayushsai-mall-assistant-superai.hf.space/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            history: messages,
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 text-black">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-black">
          Namaste 🙏 Welcome to Super-AI Mall
        </h1>
        <p className="text-gray-700 mt-1">
          How can I help you today?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 mb-4">
        <QuickAction
          label="Find a Store"
          emoji="📍"
          onClick={() => sendMessage("Help me find a store")}
        />
        <QuickAction
          label="Washrooms"
          emoji="🚻"
          onClick={() => sendMessage("Where are the washrooms?")}
        />
        <QuickAction
          label="Food Court"
          emoji="🍴"
          onClick={() => sendMessage("Where is the food court?")}
        />
        <QuickAction
          label="Offers & Events"
          emoji="🎁"
          onClick={() =>
            sendMessage("What offers or events are available today?")
          }
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-[80%] text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-pink-200 text-black"
                  : "bg-white text-black border"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-600 italic">
            Assistant is typing…
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} loading={loading} />
    </main>
  );
}

/* ------------------------------
   Quick Action Card
-------------------------------- */
function QuickAction({ label, emoji, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow p-4 flex flex-col items-center gap-2 hover:shadow-md transition text-black"
    >
      <div className="text-3xl">{emoji}</div>
      <div className="text-sm font-medium">
        {label}
      </div>
    </button>
  );
}
