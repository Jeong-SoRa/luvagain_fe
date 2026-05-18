"use client";
import { useState, useEffect } from "react";
import { profiles, type Profile } from "@/components/data/profiles";
import { useTheme } from "@/components/ThemeContext";

const REFRESH_HOURS = 3;
const REFRESH_SECONDS = REFRESH_HOURS * 60 * 60; // for prototype we'll count down from this

function useCountdown(totalSeconds: number, active: boolean) {
  const [remaining, setRemaining] = useState(totalSeconds);
  useEffect(() => {
    if (!active) { setRemaining(totalSeconds); return; }
    const interval = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(interval);
  }, [active, totalSeconds]);
  const h = String(Math.floor(remaining / 3600)).padStart(2, "0");
  const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function DiscoverScreen({
  onViewProfile,
  onMatch,
  onHold,
  heldCount,
}: {
  onViewProfile: (p: Profile) => void;
  onMatch: (p: Profile) => void;
  onHold: (p: Profile) => void;
  heldCount: number;
}) {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [action, setAction] = useState<"like" | "pass" | "hold" | null>(null);

  const current = profiles[index];
  const next = profiles[index + 1];
  const done = index >= profiles.length;
  const countdown = useCountdown(REFRESH_SECONDS, done);

  function handleAction(type: "like" | "pass" | "hold") {
    setAction(type);
    setTimeout(() => {
      if (type === "hold") onHold(current);
      else if (type === "like" && current.matchScore >= 90) onMatch(current);
      setAction(null);
      setIndex((i) => i + 1);
    }, 300);
  }

  return (
    <div className="flex flex-col h-full bg-[#F8F7F6]">
      {/* Header */}
      <div className="px-5 pt-10 pb-3 bg-white flex items-center justify-between border-b border-gray-100">
        <div>
          <h1 className="text-lg font-bold text-gray-900">LoveAgain</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            오늘의 추천 {profiles.length}명
            {heldCount > 0 && (
              <span className="ml-2 text-amber-500 font-semibold">· 보류 {heldCount}명</span>
            )}
          </p>
        </div>
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
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
          <DoneState countdown={countdown} theme={theme} onReset={() => setIndex(0)} />
        ) : (
          <div className="relative w-full" style={{ height: 400 }}>
            {next && (
              <div className="absolute inset-x-3 top-3 bottom-0 rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                <CardContent profile={next} theme={theme} mini />
              </div>
            )}
            <div
              className="absolute inset-0 rounded-2xl bg-white shadow-md border border-gray-100 overflow-hidden transition-all duration-300"
              style={{
                transform:
                  action === "like" ? "translateX(40px) rotate(3deg)"
                  : action === "pass" ? "translateX(-40px) rotate(-3deg)"
                  : action === "hold" ? "translateY(-20px)"
                  : "none",
                opacity: action ? 0 : 1,
              }}
            >
              <CardContent
                profile={current}
                theme={theme}
                onTap={() => onViewProfile(current)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {!done && (
        <div className="px-6 pb-5 flex items-center justify-center gap-4">
          {/* Pass */}
          <button
            onClick={() => handleAction("pass")}
            className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </div>
            <span className="text-[10px] text-gray-400">패스</span>
          </button>

          {/* Hold */}
          <button
            onClick={() => handleAction("hold")}
            className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
          >
            <div
              className="w-14 h-14 rounded-full bg-white border flex items-center justify-center shadow-sm"
              style={{ borderColor: `${theme.primary}50` }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2">
                <path d="M10 9V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-4" />
                <path d="M15 3h6v6" /><path d="M10 14 21 3" />
              </svg>
            </div>
            <span className="text-[10px] font-medium" style={{ color: theme.primary }}>보류</span>
          </button>

          {/* Like (heart — starts 3-day chat) */}
          <button
            onClick={() => handleAction("like")}
            className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
          >
            <div
              className="rounded-full flex items-center justify-center shadow-lg"
              style={{ width: 64, height: 64, backgroundColor: theme.primary }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <span className="text-[10px] text-white font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: theme.primary }}>
              3일 채팅
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

function DoneState({ countdown, theme, onReset }: { countdown: string; theme: ReturnType<typeof useTheme>["theme"]; onReset: () => void }) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-8 text-center px-4">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: theme.primarySoft }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-base">오늘 추천을 모두 확인했어요</p>
        <p className="text-gray-400 text-sm mt-1">새로운 사람을 탐색하기까지</p>
      </div>
      {/* 3-hour countdown */}
      <div
        className="px-6 py-3 rounded-2xl"
        style={{ backgroundColor: theme.primarySoft }}
      >
        <p className="text-2xl font-bold font-mono" style={{ color: theme.primary }}>{countdown}</p>
        <p className="text-xs text-gray-400 mt-0.5">후 새로운 추천 ({REFRESH_HOURS}시간 주기)</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <button
          className="w-full py-3 rounded-xl text-white text-sm font-semibold"
          style={{ backgroundColor: theme.primary }}
        >
          티켓으로 추가 추천 받기
        </button>
        <button onClick={onReset} className="text-xs text-gray-400 underline">
          프로토타입 — 처음부터 다시 보기
        </button>
      </div>
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
      <div className="relative overflow-hidden bg-gray-100" style={{ height: mini ? 120 : 230 }}>
        <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
        {!mini && (
          <>
            {profile.verified && (
              <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: theme.primary }}>
                ✓ 인증
              </div>
            )}
            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-xs font-semibold px-2 py-0.5 rounded-full text-gray-700">
              {profile.matchScore}% 일치
            </div>
          </>
        )}
      </div>
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
                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
