"use client";
import { useState } from "react";
import { profiles, type Profile } from "@/components/data/profiles";
import { useTheme } from "@/components/ThemeContext";

export default function DiscoverScreen({
  onViewProfile,
  onMatch,
}: {
  onViewProfile: (p: Profile) => void;
  onMatch: (p: Profile) => void;
}) {
  const { theme } = useTheme();
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
      if (type === "like" && current && current.matchScore >= 90) onMatch(current);
    }, 320);
  }

  return (
    <div className="flex flex-col h-full bg-[#F8F7F6]">
      {/* Header */}
      <div className="px-5 pt-10 pb-3 bg-white flex items-center justify-between border-b border-gray-100">
        <div>
          <h1 className="text-lg font-bold text-gray-900">LoveAgain</h1>
          <p className="text-xs text-gray-400 mt-0.5">오늘의 추천 {profiles.length}명</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 px-5 py-2.5">
        {profiles.map((_, i) => (
          <div
            key={i}
            className="h-0.5 flex-1 rounded-full transition-all"
            style={{
              backgroundColor:
                i < index ? `${theme.primary}60` : i === index ? theme.primary : "#E5E7EB",
            }}
          />
        ))}
      </div>

      {/* Card stack */}
      <div className="flex-1 relative px-4 pt-1 pb-2 flex items-center">
        {done ? (
          <div className="w-full flex flex-col items-center justify-center gap-3 py-10 text-center">
            <span className="text-4xl">🌸</span>
            <p className="font-semibold text-gray-700 text-base">오늘 추천을 모두 확인했어요</p>
            <p className="text-gray-400 text-sm">추가 추천은 티켓을 사용하세요</p>
            <button
              className="mt-3 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{ backgroundColor: theme.primary }}
              onClick={() => setIndex(0)}
            >
              티켓으로 더 보기 (+1명)
            </button>
            <button
              onClick={() => setIndex(0)}
              className="text-xs text-gray-400 underline"
            >
              처음부터 다시 보기
            </button>
          </div>
        ) : (
          <div className="relative w-full" style={{ height: 400 }}>
            {next && (
              <div className="absolute inset-x-3 top-3 bottom-0 rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                <CardContent profile={next} theme={theme} mini />
              </div>
            )}
            <div
              className={`absolute inset-0 rounded-2xl bg-white shadow-md border border-gray-100 overflow-hidden transition-all duration-300 ${
                action === "like" ? "translate-x-10 rotate-3 opacity-0"
                : action === "pass" ? "-translate-x-10 -rotate-3 opacity-0" : ""
              }`}
            >
              <CardContent profile={current} theme={theme} onTap={() => onViewProfile(current)} />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      {!done && (
        <div className="px-6 pb-5 flex items-center justify-center gap-4">
          <button
            onClick={() => handleAction("pass")}
            className="w-13 h-13 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            style={{ width: 52, height: 52 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={() => onViewProfile(current)}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
            </svg>
          </button>
          <button
            onClick={() => handleAction("like")}
            className="rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
            style={{ width: 64, height: 64, backgroundColor: theme.primary }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <button
            onClick={() => handleAction("like")}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="#F59E0B">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function CardContent({
  profile, theme, onTap, mini,
}: {
  profile: Profile;
  theme: ReturnType<typeof useTheme>["theme"];
  onTap?: () => void;
  mini?: boolean;
}) {
  return (
    <div className="flex flex-col h-full" onClick={onTap} style={{ cursor: onTap ? "pointer" : "default" }}>
      {/* Photo */}
      <div className="relative overflow-hidden bg-gray-100" style={{ height: mini ? 120 : 230 }}>
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {!mini && (
          <>
            {profile.verified && (
              <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1" style={{ color: theme.primary }}>
                ✓ 인증
              </div>
            )}
            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-xs font-semibold px-2 py-0.5 rounded-full text-gray-700">
              {profile.matchScore}% 일치
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 px-4 py-3.5">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-gray-900 text-lg">{profile.name}</span>
            <span className="text-gray-400 text-sm">{profile.age}</span>
          </div>
          <span
            className="text-[11px] font-medium border px-2 py-0.5 rounded-full"
            style={{ color: theme.primary, borderColor: `${theme.primary}40`, backgroundColor: theme.primaryMid }}
          >
            {profile.intent}
          </span>
        </div>
        <p className="text-gray-400 text-xs mb-1">{profile.location} · {profile.job}</p>
        <p className="text-gray-400 text-xs mb-3">자녀 {profile.kids}</p>
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
