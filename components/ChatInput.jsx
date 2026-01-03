"use client";

import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim() || loading) return;
    onSend(input);
    setInput("");
  }

  return (
    <div className="flex items-center gap-3 p-4 border-t bg-white">
      {/* Mic icon (UI only for now) */}
      <button
        className="h-12 w-12 rounded-full bg-pink-500 text-white flex items-center justify-center"
        disabled
      >
        🎤
      </button>

      {/* Text input */}
      <input
        type="text"
        className="flex-1 h-12 px-4 rounded-full border outline-none"
        placeholder="Type your query... (e.g., Where is Zara?)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
        disabled={loading}
      />

      {/* Send button */}
      <button
        onClick={handleSend}
        className="h-12 w-12 rounded-full bg-pink-500 text-white flex items-center justify-center"
        disabled={loading}
      >
        ➤
      </button>
    </div>
  );
}
