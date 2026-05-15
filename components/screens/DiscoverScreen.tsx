"use client";
import { useState } from "react";
import { profiles, type Profile } from "@/components/data/profiles";

export default function DiscoverScreen({
  onViewProfile,
  onMatch,
}: {
  onViewProfile: (p: Profile) => void;
  onMatch: (p: Profile) => void;
}) {
  const [index, setIndex] = useState(0);
  const [action, setAction] = useState<"like" | "pass" | null>(null);

  const current = profiles[index];
  const next = profiles[index + 1];
  const done = index >= profiles.length;

  function handleAction(type: "like" | "pass") {
    setAction(type);
    setTimeout(() => {
      setAction(null);
      setIndex((i) => i + 1);
      if (type === "like" && current) {
        const isMatch = current.matchScore >= 90;
        if (isMatch) onMatch(current);
      }
    }, 350);
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="px-5 pt-10 pb-3 bg-white flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">
            <span className="gradient-text">LoveAgain</span>
          </h1>
          <p className="text-xs text-gray-400">오늘의 추천 {profiles.length}명</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-base">
            🔔
          </button>
          <button className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-base">
            ⚙️
          </button>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 justify-center py-2">
        {profiles.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all ${
              i < index ? "bg-rose-300 w-3" : i === index ? "bg-rose-500 w-5" : "bg-gray-200 w-3"
            }`}
          />
        ))}
      </div>

      {/* Card stack */}
      <div className="flex-1 relative px-4 pb-2 flex items-center">
        {done ? (
          <div className="w-full flex flex-col items-center justify-center gap-3 py-10 text-center">
            <span className="text-5xl">🌸</span>
            <p className="font-bold text-gray-800 text-lg">오늘의 추천을 모두 봤어요</p>
            <p className="text-gray-400 text-sm">내일 새로운 분들을 소개해드릴게요</p>
            <button
              onClick={() => setIndex(0)}
              className="mt-2 gradient-bg text-white font-semibold px-6 py-3 rounded-2xl text-sm"
            >
              다시 보기
            </button>
          </div>
        ) : (
          <div className="relative w-full" style={{ height: 400 }}>
            {/* Back card */}
            {next && (
              <div className="absolute inset-x-3 top-3 bottom-0 rounded-3xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                <CardContent profile={next} mini />
              </div>
            )}
            {/* Front card */}
            <div
              className={`absolute inset-0 rounded-3xl bg-white shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 ${
                action === "like" ? "translate-x-12 rotate-6 opacity-0" :
                action === "pass" ? "-translate-x-12 -rotate-6 opacity-0" : ""
              }`}
            >
              <CardContent
                profile={current}
                onTap={() => onViewProfile(current)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {!done && (
        <div className="px-6 pb-4 flex items-center justify-center gap-5">
          <button
            onClick={() => handleAction("pass")}
            className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-2xl shadow-md active:scale-95 transition-transform"
          >
            ✕
          </button>
          <button
            onClick={() => onViewProfile(current)}
            className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xl shadow-sm active:scale-95 transition-transform"
          >
            ℹ️
          </button>
          <button
            onClick={() => handleAction("like")}
            className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-2xl shadow-lg shadow-rose-200 active:scale-95 transition-transform"
          >
            💝
          </button>
          <button
            onClick={() => handleAction("like")}
            className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-xl shadow-md active:scale-95 transition-transform"
          >
            ⭐
          </button>
        </div>
      )}
    </div>
  );
}

function CardContent({ profile, onTap, mini }: { profile: Profile; onTap?: () => void; mini?: boolean }) {
  return (
    <div className="flex flex-col h-full" onClick={onTap} style={{ cursor: onTap ? "pointer" : "default" }}>
      {/* Photo area */}
      <div className={`relative flex items-center justify-center bg-gradient-to-br ${profile.gradient}`}
        style={{ height: mini ? 140 : 240 }}>
        <span className="text-7xl">{profile.emoji}</span>
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <span className="text-white text-xs font-bold">{profile.matchScore}%</span>
          <span className="text-white text-xs">일치</span>
        </div>
        {profile.verified && (
          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <span className="text-white text-xs">✓ 인증됨</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 p-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <span className="font-black text-gray-900 text-xl">{profile.name}</span>
            <span className="text-gray-500 text-base ml-1.5">{profile.age}세</span>
          </div>
          <span className="text-xs bg-rose-50 text-rose-600 font-semibold px-2 py-0.5 rounded-full border border-rose-100">
            {profile.intent}
          </span>
        </div>
        <p className="text-gray-400 text-xs mb-2">📍 {profile.location} · {profile.job}</p>
        <p className="text-gray-400 text-xs mb-3">👶 {profile.kids}</p>
        {!mini && (
          <>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">{profile.bio}</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
