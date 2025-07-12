import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-3 bg-slate-800 border-t border-slate-700">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full pl-6 pr-16 py-3 bg-slate-900 rounded-full border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all duration-200 text-slate-200 placeholder-slate-500"
            aria-label="Type your message"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/40 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <IoSend className="text-xl text-white" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Typesend;