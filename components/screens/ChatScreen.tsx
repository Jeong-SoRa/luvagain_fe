"use client";
import { useState, useRef, useEffect } from "react";
import type { Profile, ChatMessage } from "@/components/data/profiles";
import { conversations } from "@/components/data/profiles";
import { useTheme } from "@/components/ThemeContext";

export default function ChatScreen({ profile, onBack }: { profile: Profile; onBack: () => void }) {
  const { theme } = useTheme();
  const init: ChatMessage[] = conversations[profile.id] ?? [
    { id: 1, from: "them", text: "안녕하세요! 프로필 잘 봤어요 😊", time: "방금" },
  ];
  const [messages, setMessages] = useState<ChatMessage[]>(init);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "me", text, time: "방금" }]);
    setInput("");
    setTimeout(() => {
      const replies = ["네, 저도 그렇게 생각해요 😊", "정말요? 저도 비슷한 경험이 있어요", "공감돼요!", "하하 맞아요 ☺️"];
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "them", text: replies[Math.floor(Math.random() * replies.length)], time: "방금" },
      ]);
    }, 1200);
  }

  return (
    <div className="flex flex-col h-full bg-[#F8F7F6]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-10 pb-3 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center active:bg-gray-100 rounded-full">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 shrink-0">
          <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm">{profile.name}</p>
          <p className="text-[11px] text-green-500">활동 중</p>
        </div>
      </div>

      <div className="flex justify-center py-3">
        <span className="text-[11px] bg-gray-200/70 text-gray-500 px-3 py-1 rounded-full">오늘</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-2 flex flex-col gap-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col gap-0.5 ${msg.from === "me" ? "items-end" : "items-start"}`}>
            <div
              className="max-w-[75%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl"
              style={
                msg.from === "me"
                  ? { backgroundColor: theme.primary, color: "white", borderBottomRightRadius: 4 }
                  : { backgroundColor: "white", color: "#111827", borderBottomLeftRadius: 4, border: "1px solid #F3F4F6" }
              }
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-3 py-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="메시지를 입력하세요..."
          className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 text-sm outline-none text-gray-800 placeholder:text-gray-400"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
          style={{ backgroundColor: input.trim() ? theme.primary : "#F3F4F6" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={input.trim() ? "white" : "#D1D5DB"}>
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
