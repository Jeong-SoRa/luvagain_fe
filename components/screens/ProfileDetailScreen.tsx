"use client";
import { useState, useRef } from "react";
import type { Profile } from "@/components/data/profiles";
import { useTheme } from "@/components/ThemeContext";

const detailRows = (p: Profile) => [
  { label: "나이", value: `${p.age}세` },
  { label: "지역", value: p.location },
  { label: "직업", value: p.job },
  { label: "자녀", value: p.kids },
  { label: "키", value: p.height },
  { label: "종교", value: p.religion },
  { label: "흡연", value: p.smoking },
  { label: "음주", value: p.drinking },
  { label: "이혼/사별", value: p.status },
];

type Comment = { id: number; text: string; time: string };

const SAMPLE_COMMENTS: Record<number, Comment[]> = {
  0: [
    { id: 1, text: "미소가 너무 따뜻하네요 😊", time: "2일 전" },
    { id: 2, text: "첫인상이 정말 좋으세요!", time: "1일 전" },
  ],
  1: [
    { id: 3, text: "등산 좋아하시는군요! 저도 자주 가요", time: "3일 전" },
  ],
};

export default function ProfileDetailScreen({
  profile, onBack, onLike, onPass, onHold,
}: {
  profile: Profile;
  onBack: () => void;
  onLike: (p: Profile) => void;
  onPass: () => void;
  onHold: (p: Profile) => void;
}) {
  const { theme } = useTheme();
  const allPhotos = [profile.photo, ...(profile.photos ?? [])];
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);

  const [comments, setComments] = useState<Record<number, Comment[]>>(
    Object.fromEntries(allPhotos.map((_, i) => [i, SAMPLE_COMMENTS[i] ?? []]))
  );
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function openViewer(i: number) {
    setViewerIndex(i);
    setInputText("");
  }
  function closeViewer() { setViewerIndex(null); }
  function prev() {
    setViewerIndex((i) => (i! > 0 ? i! - 1 : allPhotos.length - 1));
    setInputText("");
  }
  function next() {
    setViewerIndex((i) => (i! < allPhotos.length - 1 ? i! + 1 : 0));
    setInputText("");
  }

  function submitComment() {
    const text = inputText.trim();
    if (!text || viewerIndex === null) return;
    const newComment: Comment = { id: Date.now(), text, time: "방금" };
    setComments((prev) => ({
      ...prev,
      [viewerIndex]: [...(prev[viewerIndex] ?? []), newComment],
    }));
    setInputText("");
  }

  const caption = viewerIndex !== null ? (profile.captions?.[viewerIndex] ?? null) : null;
  const currentComments = viewerIndex !== null ? (comments[viewerIndex] ?? []) : [];
  const totalReactions = currentComments.length;

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      {/* Photo — tap to go back */}
      <div
        className="relative overflow-hidden bg-gray-100 shrink-0 cursor-pointer"
        style={{ height: 260 }}
        onClick={onBack}
      >
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Back button */}
        <button
          onClick={(e) => { e.stopPropagation(); onBack(); }}
          className="absolute top-10 left-4 w-9 h-9 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Verified badge */}
        {profile.verified && (
          <div className="absolute top-10 right-4 bg-black/30 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 text-white">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: theme.primary }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            인증됨
          </div>
        )}

        {/* Intent tag */}
        <div className="absolute bottom-4 left-4">
          <span className="text-[12px] font-medium px-3 py-1.5 rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-sm">
            {profile.intent}
          </span>
        </div>

        {/* Match score */}
        <div className="absolute bottom-4 right-4 bg-white/90 rounded-xl px-3 py-1.5 shadow-sm">
          <span className="font-bold text-sm" style={{ color: theme.primary }}>{profile.matchScore}%</span>
          <span className="text-gray-400 text-xs ml-1">일치</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-4">
        {/* Name + age */}
        <div className="mb-0.5">
          <h2 className="text-2xl font-bold text-gray-900 inline">{profile.name}</h2>
          <span className="text-gray-400 font-light text-xl ml-2">{profile.age}</span>
        </div>

        {/* Location · Job */}
        <p className="text-gray-400 text-sm mb-2.5">{profile.location} · {profile.job}</p>

        {/* Bio preview */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-5">{profile.bio}</p>

        {/* Full bio card */}
        <div className="bg-gray-50 rounded-xl p-4 mb-5">
          <p className="text-[11px] font-semibold text-gray-400 mb-2 uppercase tracking-wide">자기소개</p>
          <p className="text-gray-700 text-sm leading-relaxed">{profile.bio}</p>
          {profile.kidsDetail && (
            <p className="text-gray-400 text-xs mt-3 italic border-t border-gray-100 pt-3">{profile.kidsDetail}</p>
          )}
        </div>

        {/* Photo gallery */}
        {allPhotos.length > 1 && (
          <div className="mb-5">
            <p className="text-[11px] font-semibold text-gray-400 mb-2.5 uppercase tracking-wide">갤러리</p>
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {allPhotos.map((src, i) => (
                <div
                  key={i}
                  className="shrink-0 rounded-xl overflow-hidden cursor-pointer active:opacity-80 relative"
                  style={{ width: 120, height: 160 }}
                  onClick={() => openViewer(i)}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  {/* Comment count badge */}
                  {(comments[i]?.length ?? 0) > 0 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 rounded-full px-1.5 py-0.5 flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span className="text-[9px] text-white font-semibold">{comments[i].length}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-gray-400 mb-2.5 uppercase tracking-wide">관심사</p>
          <div className="flex flex-wrap gap-2">
            {profile.tags.map((tag) => (
              <span key={tag} className="text-sm text-gray-600 px-3 py-1.5 rounded-full bg-gray-100 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Info grid */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold text-gray-400 mb-2.5 uppercase tracking-wide">기본 정보</p>
          <div className="grid grid-cols-2 gap-2">
            {detailRows(profile).map((row) => (
              <div key={row.label} className="bg-gray-50 rounded-xl px-3 py-2.5">
                <p className="text-[11px] text-gray-400 mb-0.5">{row.label}</p>
                <p className="text-sm font-semibold text-gray-700">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen photo viewer */}
      {viewerIndex !== null && (
        <div
          className="absolute inset-0 z-50 bg-black flex flex-col"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (dx > 50) prev();
            else if (dx < -50) next();
          }}
        >
          {/* Photo — fills remaining space */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src={allPhotos[viewerIndex]}
              alt=""
              className="w-full h-full object-contain"
            />

            {/* Close */}
            <button
              onClick={closeViewer}
              className="absolute top-12 right-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Prev */}
            {viewerIndex > 0 && (
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            )}

            {/* Next */}
            {viewerIndex < allPhotos.length - 1 && (
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
              {allPhotos.map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full transition-all" style={{ backgroundColor: i === viewerIndex ? "white" : "rgba(255,255,255,0.4)" }} />
              ))}
            </div>

          </div>

          {/* Bottom comment panel */}
          <div
            className="shrink-0 flex flex-col"
            style={{ backgroundColor: "rgba(15,15,15,0.95)", height: 200 }}
          >
            {/* Caption */}
            <div className="px-4 pt-3 pb-2 shrink-0">
              {caption ? (
                <p className="text-white/80 text-sm leading-relaxed">
                  <span className="font-semibold text-white">{profile.name}</span>
                  <span className="mx-1.5 text-white/30">·</span>
                  {caption}
                </p>
              ) : (
                <p className="text-white/30 text-sm italic">캡션 없음</p>
              )}
            </div>

            {/* Divider */}
            <div className="mx-4 border-t border-white/10 shrink-0" />

            {/* Comment list */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {currentComments.length === 0 ? (
                <p className="text-white/30 text-xs text-center py-3">첫 댓글을 남겨보세요</p>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {currentComments.map((c) => (
                    <div key={c.id} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white/85 text-[13px] leading-snug">{c.text}</p>
                        <p className="text-white/30 text-[10px] mt-0.5">{c.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 flex gap-2 items-center shrink-0 border-t border-white/10">
              <input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") submitComment(); }}
                placeholder="댓글 달기..."
                className="flex-1 bg-white/10 rounded-full px-4 py-2 text-white text-sm placeholder-white/30 outline-none"
              />
              <button
                onClick={submitComment}
                disabled={!inputText.trim()}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity"
                style={{
                  backgroundColor: inputText.trim() ? theme.primary : "rgba(255,255,255,0.15)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-4 flex gap-2.5">
        <button
          onClick={onPass}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 font-medium text-sm active:bg-gray-50"
        >
          패스
        </button>
        <button
          onClick={() => onHold(profile)}
          className="flex-1 py-3 rounded-xl border font-medium text-sm active:opacity-80"
          style={{ color: theme.primary, borderColor: `${theme.primary}60`, backgroundColor: theme.primarySoft }}
        >
          보류
        </button>
        <button
          onClick={() => onLike(profile)}
          className="flex-[1.4] py-3 rounded-xl text-white font-semibold text-sm active:opacity-90"
          style={{ backgroundColor: theme.primary }}
        >
          좋아요
        </button>
      </div>
    </div>
  );
}
