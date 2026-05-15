"use client";
import { useState, useRef, useEffect } from "react";
import type { Profile } from "@/components/data/profiles";
import { conversations } from "@/components/data/profiles";
import type { ChatMessage } from "@/components/data/profiles";

export default function ChatScreen({
  profile,
  onBack,
}: {
  profile: Profile;
  onBack: () => void;
}) {
  const initMsgs: ChatMessage[] = conversations[profile.id] ?? [
    { id: 1, from: "them", text: "안녕하세요! 프로필 잘 봤어요 😊", time: "방금" },
  ];
  const [messages, setMessages] = useState<ChatMessage[]>(initMsgs);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const newMsg: ChatMessage = { id: Date.now(), from: "me", text, time: "방금" };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Auto reply after delay
    setTimeout(() => {
      const replies = [
        "네, 저도 그렇게 생각해요 😊",
        "정말요? 저도 비슷한 경험이 있어요",
        "하하, 맞아요! 공감돼요 ☺️",
        "그렇군요. 더 이야기해요!",
      ];
      const reply: ChatMessage = {
        id: Date.now() + 1,
        from: "them",
        text: replies[Math.floor(Math.random() * replies.length)],
        time: "방금",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-10 pb-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 text-lg active:bg-gray-100"
        >
          ←
        </button>
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${profile.gradient} flex items-center justify-center text-lg`}>
          {profile.emoji}
        </div>
        <div className="flex-1">
          <p className="font-bold text-gray-900 text-sm">{profile.name}</p>
          <p className="text-xs text-green-500 font-medium">활동 중</p>
        </div>
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 active:bg-gray-100">
          ⋯
        </button>
      </div>

      {/* Date pill */}
      <div className="flex justify-center py-3">
        <span className="text-xs bg-gray-200 text-gray-500 px-3 py-1 rounded-full">오늘</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-2 flex flex-col gap-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-0.5 ${msg.from === "me" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.from === "me"
                  ? "gradient-bg text-white rounded-br-sm"
                  : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm"
              }`}
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
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 text-lg">+</button>
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
          className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all ${
            input.trim() ? "gradient-bg text-white shadow-md" : "bg-gray-100 text-gray-300"
          }`}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
