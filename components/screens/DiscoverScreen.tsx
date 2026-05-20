"use client";
import { useState, useEffect } from "react";
import { profiles, type Profile } from "@/components/data/profiles";
import { useTheme } from "@/components/ThemeContext";

const REFRESH_HOURS = 3;
const REFRESH_SECONDS = REFRESH_HOURS * 60 * 60;

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
  const countdown = useCountdown(REFRESH_SECONDS, true);

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
    <div className="flex flex-col h-full bg-[#F0EFED]">
      {/* Header */}
      <div className="px-5 pt-10 pb-3 bg-white border-b border-gray-100">
        <div className="flex items-start justify-between mb-2.5">
          <div>
            <h1 className="text-lg font-bold text-gray-900">다시, 3일</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              오늘의 추천 {profiles.length}명
              {heldCount > 0 && (
                <span className="ml-2 text-amber-500 font-semibold">· 보류 {heldCount}명</span>
              )}
            </p>
          </div>
        </div>
        {/* Countdown — centered */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-100">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[10px] text-gray-400">떠나기까지 남은시간</span>
              <span className="text-[13px] font-mono font-semibold text-gray-600">{countdown}</span>
            </div>
          </div>
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
      <div className="flex-1 relative px-4 pt-1 pb-5 flex items-center">
        {done ? (
          <DoneState countdown={countdown} theme={theme} onReset={() => setIndex(0)} />
        ) : (
          <div className="relative w-full h-full" >
            {/* Next card peek */}
            {next && (
              <div className="absolute inset-x-4 top-3 bottom-0 rounded-3xl overflow-hidden shadow-sm">
                <CardContent profile={next} theme={theme} mini />
              </div>
            )}
            {/* Current card */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl transition-all duration-300"
              style={{
                transform:
                  action === "like" ? "translateX(50px) rotate(4deg)"
                  : action === "pass" ? "translateX(-50px) rotate(-4deg)"
                  : action === "hold" ? "translateY(-24px) scale(0.97)"
                  : "none",
                opacity: action ? 0 : 1,
              }}
            >
              <CardContent
                profile={current}
                theme={theme}
                onTap={() => onViewProfile(current)}
                onAction={handleAction}
              />
            </div>
          </div>
        )}
      </div>
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
      <div className="px-6 py-3 rounded-2xl" style={{ backgroundColor: theme.primarySoft }}>
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
  profile, theme, onTap, mini, onAction,
}: {
  profile: Profile;
  theme: ReturnType<typeof useTheme>["theme"];
  onTap?: () => void;
  mini?: boolean;
  onAction?: (type: "like" | "pass" | "hold") => void;
}) {
  return (
    <div
      className="relative h-full w-full bg-gray-300"
      onClick={onTap}
      style={{ cursor: onTap ? "pointer" : "default" }}
    >
      {/* Full-bleed photo */}
      <img
        src={profile.photo}
        alt={profile.name}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {!mini && (
        <>
          {/* Intent tag — top left */}
          <div className="absolute top-4 left-4">
            <span
              className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white uppercase"
              style={{ letterSpacing: "0.06em" }}
            >
              ♥ {profile.intent}
            </span>
          </div>

          {/* Match score — top right */}
          <div className="absolute top-4 right-4">
            <span className="bg-black/40 backdrop-blur-sm text-[11px] font-semibold px-2.5 py-1 rounded-full text-white tracking-wide">
              {profile.matchScore}% 일치
            </span>
          </div>

          {/* Bio preview — right aligned, below match score */}
          <div className="absolute top-14 right-4 pr-1" style={{ width: "70%" }}>
            <p className="text-white/100 text-[12px] leading-[1.55] line-clamp-2 text-right" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
              {profile.bio}
            </p>
          </div>
          {/* Bottom frosted glass panel — profile info + buttons */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-b-3xl px-5 pt-4 pb-5"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, transparent calc(100% - 60px), rgba(10,10,10,0.7) 100%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Name row */}
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-[23px] tracking-tight leading-none" style={{ color: "#3B1F0E", textShadow: "0 0 8px rgba(255,255,255,0.9), 0 1px 2px rgba(255,255,255,0.7)" }}>
                {profile.name}
              </span>
              <span className="text-base font-semibold" style={{ color: "#6B3A22", textShadow: "0 0 6px rgba(255,255,255,0.8)" }}>{profile.age}</span>
              {profile.verified && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <circle cx="12" cy="8" r="4" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
                  <path d="M8 12 L6 21 L12 18 L18 21 L16 12" fill="#FFD700" stroke="#FFA500" strokeWidth="1" strokeLinejoin="round"/>
                  <circle cx="12" cy="8" r="2" fill="#FFA500"/>
                </svg>
              )}
            </div>

            {/* Job · Location */}
            <p className="text-[13px] font-semibold mb-2" style={{ color: "#7A4530", textShadow: "0 0 6px rgba(255,255,255,0.8)" }}>
              {profile.job} · {profile.location}
            </p>



            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4">
              {/* Pass */}
              <button
                onClick={() => onAction?.("pass")}
                className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(220,38,38,0.35)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(248,113,113,0.5)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-[10px] font-medium" style={{ color: "rgba(252,165,165,0.9)" }}>패스</span>
              </button>

              {/* Like — 3일 채팅 */}
              <button
                onClick={() => onAction?.("like")}
                className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
              >
                <div
                  className="rounded-full flex items-center justify-center shadow-2xl"
                  style={{ width: 62, height: 62, backgroundColor: theme.primary }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="text-[10px] text-white font-semibold">3일 채팅</span>
              </button>

              {/* Hold */}
              <button
                onClick={() => onAction?.("hold")}
                className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(202,138,4,0.30)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(253,224,71,0.45)" }}
                >
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="text-[10px] font-medium" style={{ color: "rgba(253,224,71,0.9)" }}>보류</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
