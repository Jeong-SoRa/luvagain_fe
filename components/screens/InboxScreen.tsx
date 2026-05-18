"use client";
import { profiles, conversations } from "@/components/data/profiles";
import type { Profile } from "@/components/data/profiles";
import { useTheme } from "@/components/ThemeContext";

const matchedIds = [1, 2];

export default function InboxScreen({
  onOpenChat,
  heldProfiles,
  onLikeHeld,
  onPassHeld,
}: {
  onOpenChat: (p: Profile) => void;
  heldProfiles: Profile[];
  onLikeHeld: (p: Profile) => void;
  onPassHeld: (p: Profile) => void;
}) {
  const { theme } = useTheme();
  const matched = profiles.filter((p) => matchedIds.includes(p.id));
  const liked = profiles.filter((p) => !matchedIds.includes(p.id)).slice(0, 2);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-5 pt-10 pb-4 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900">메시지</h1>
        <p className="text-xs text-gray-400 mt-0.5">매칭된 {matched.length}명과 대화 중</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* New matches */}
        <div className="px-5 pt-4 pb-3 border-b border-gray-50">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">새 매칭</p>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {matched.map((p) => (
              <button key={p.id} onClick={() => onOpenChat(p)} className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 bg-gray-100" style={{ borderColor: theme.primary }}>
                  <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-gray-600">{p.name}</span>
                {/* D-day tag */}
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#FFF1F1", color: "#EF4444" }}>
                  D-1
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active chats */}
        <div className="px-5 pt-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">대화</p>
          {matched.map((p) => {
            const msgs = conversations[p.id] ?? [];
            const last = msgs[msgs.length - 1];
            const unread = p.id === 1;
            return (
              <button
                key={p.id}
                onClick={() => onOpenChat(p)}
                className="w-full flex items-center gap-3 py-3.5 border-b border-gray-50 text-left active:bg-gray-50"
              >
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100">
                    <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  {unread && (
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: theme.primary }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm ${unread ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>{p.name}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#FFF1F1", color: "#EF4444" }}>D-1</span>
                    </div>
                    <span className="text-[11px] text-gray-400">{last?.time ?? ""}</span>
                  </div>
                  <p className={`text-xs truncate ${unread ? "text-gray-700 font-medium" : "text-gray-400"}`}>
                    {last?.text ?? "대화를 시작해보세요"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* 보류함 */}
        {heldProfiles.length > 0 && (
          <div className="px-5 pt-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">보류 중</p>
              <span
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ color: theme.primary, backgroundColor: theme.primarySoft }}
              >
                {heldProfiles.length}명
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-3">마음이 바뀌면 지금 선택하세요.</p>
            {heldProfiles.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-3 border-b border-gray-50">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100 shrink-0">
                  <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">{p.name} · {p.age}세</p>
                  <p className="text-xs text-gray-400">{p.job} · {p.location}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => onPassHeld(p)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onLikeHeld(p)}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Liked no reply */}
        <div className="px-5 pt-5 pb-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">좋아요 보낸 분들</p>
          {liked.map((p) => (
            <div key={p.id} className="flex items-center gap-3 py-3 border-b border-gray-50">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100 opacity-50 shrink-0">
                <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">{p.name} · {p.age}세</p>
                <p className="text-xs text-gray-400">답장 대기 중</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
