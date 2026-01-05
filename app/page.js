"use client";

import { useState } from "react";
import ChatInput from "../components/ChatInput";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(text) {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
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
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col h-screen bg-black text-white">

      {/* Header */}
      <div className="p-6 bg-white text-black border-b">
        <h1 className="text-2xl font-semibold">
          Namaste 🙏 Welcome to Super-AI Mall
        </h1>
        <p className="text-gray-600 mt-1">
          Your smart mall assistant is here to help
        </p>
      </div>

      {/* CHAT STAGE */}
      <div className="relative flex-1 overflow-hidden">

        {/* Background Image */}
        <img
          src="/mall-bot.png"
          alt="Mall background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT OVER IMAGE */}
        <div className="relative z-10 flex flex-col h-full">

          {/* Quick Actions — NOW OVER IMAGE */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4">
            <QuickAction label="Find a Store" emoji="📍" onClick={() => sendMessage("Help me find a store")} />
            <QuickAction label="Washrooms" emoji="🚻" onClick={() => sendMessage("Where are the washrooms?")} />
            <QuickAction label="Food Court" emoji="🍴" onClick={() => sendMessage("Where is the food court?")} />
            <QuickAction label="Offers & Events" emoji="🎁" onClick={() => sendMessage("What offers or events are available today?")} />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-[75%] text-sm backdrop-blur ${
                    msg.role === "user"
                      ? "bg-pink-300 text-black"
                      : "bg-white/90 text-black"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="italic text-white">
                Assistant is typing…
              </div>
            )}
          </div>

          {/* Input */}
          <div className="bg-white text-black">
            <ChatInput onSend={sendMessage} loading={loading} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ------------------------------ */
function QuickAction({ label, emoji, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white/90 text-black rounded-xl shadow p-4 flex flex-col items-center gap-2 hover:bg-white transition"
    >
      <div className="text-3xl">{emoji}</div>
      <div className="text-sm font-medium">{label}</div>
    </button>
  );
}
