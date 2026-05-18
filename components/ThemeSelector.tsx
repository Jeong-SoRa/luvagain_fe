"use client";
import { useState } from "react";
import { themes, useTheme, type ThemeId } from "./ThemeContext";

const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    title: "탐색 · 3시간 주기",
    desc: "3시간마다 5명 추천 갱신. 소진 시 카운트다운 + 티켓 CTA 표시.",
    actions: [
      { label: "✕ 패스", note: "영구 제거. 다시 탐색 불가" },
      { label: "보류", note: "보류함 저장 → 나중에 재결정" },
      { label: "💝 좋아요", note: "3일 채팅 채널 오픈" },
    ],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 11H3v10h6V11zM15 5H9v16h6V5zM21 8h-6v13h6V8z" />
      </svg>
    ),
    title: "보류함",
    desc: "보류한 프로필은 메시지탭 > 보류 중 섹션에 보관.",
    actions: [
      { label: "좋아요", note: "보류함에서 바로 좋아요 → 매칭" },
      { label: "패스", note: "최종 제거" },
    ],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "3일 채팅 · Save / Throw",
    desc: "💝 누르면 3일 한시적 채팅 채널 개설. 헤더에 D-day 표시.",
    actions: [
      { label: "Save", note: "채팅 무기한 연장" },
      { label: "Throw", note: "채팅방 영구 삭제. 재연결 불가" },
    ],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "매칭",
    desc: "서로 좋아요 or 보류함에서 좋아요 → 매칭 팝업 노출.",
    actions: [
      { label: "메시지 보내기", note: "채팅방으로 이동" },
      { label: "계속 탐색", note: "팝업 닫고 탐색 유지" },
    ],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: "사업화 · 티켓",
    desc: "3시간당 5명 무료. 추가 추천은 티켓(1,900원~). 월정액 무제한.",
    actions: [
      { label: "티켓 1개", note: "1,900원 · 추천 +1명" },
      { label: "월정액", note: "29,900원 · 추천 무제한" },
    ],
  },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"features" | "theme">("features");

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        title="프로토타입 가이드"
        className="absolute z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg border border-white/20 text-white text-xs font-semibold"
        style={{
          bottom: 72 + 12,
          right: 12,
          backgroundColor: theme.primary,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        팀 가이드
      </button>

      {/* Bottom sheet */}
      {open && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

          <div className="relative bg-white rounded-t-3xl z-10 flex flex-col" style={{ maxHeight: "82%" }}>
            {/* Header */}
            <div className="px-5 pt-4 pb-0 shrink-0">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">프로토타입 가이드</h3>
                  <p className="text-xs text-gray-400 mt-0.5">LoveAgain · 팀원 공유용</p>
                </div>
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  PROTOTYPE
                </span>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-4">
                {(["features", "theme"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={
                      tab === t
                        ? { backgroundColor: theme.primary, color: "white" }
                        : { color: "#6B7280" }
                    }
                  >
                    {t === "features" ? "주요 기능" : "테마"}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 pb-8">
              {tab === "features" ? (
                <div className="flex flex-col gap-3">
                  {FEATURES.map((f, i) => (
                    <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
                      {/* Feature header */}
                      <div
                        className="flex items-center gap-3 px-4 py-3"
                        style={{ backgroundColor: theme.primarySoft }}
                      >
                        <span style={{ color: theme.primary }}>{f.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                          <p className="text-gray-500 text-xs leading-snug mt-0.5">{f.desc}</p>
                        </div>
                      </div>
                      {/* Actions */}
                      <div className="px-4 py-2.5 flex flex-col gap-1.5 bg-white">
                        {f.actions.map((a, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <span
                              className="text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0"
                              style={{ backgroundColor: theme.primaryMid, color: theme.primary }}
                            >
                              {a.label}
                            </span>
                            <span className="text-xs text-gray-400">{a.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Flow summary */}
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 mt-1">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">전체 플로우</p>
                    <div className="flex items-center gap-1 flex-wrap text-xs text-gray-600">
                      {[
                        "탐색 카드", "→", "좋아요", "→", "매칭 팝업", "→",
                        "채팅 (D-3)", "→", "D-0", "→", "Save / Throw",
                      ].map((step, i) => (
                        <span
                          key={i}
                          className={step === "→" ? "text-gray-300" : "font-medium px-2 py-0.5 rounded-md"}
                          style={step !== "→" ? { backgroundColor: theme.primarySoft, color: theme.primary } : {}}
                        >
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-gray-400 mb-4">앱 전체 색상 테마를 변경합니다</p>
                  <div className="grid grid-cols-4 gap-3">
                    {themes.map((t) => {
                      const active = t.id === theme.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t.id as ThemeId)}
                          className="flex flex-col items-center gap-2 py-3 rounded-2xl border-2 transition-all"
                          style={{
                            borderColor: active ? theme.primary : "transparent",
                            backgroundColor: active ? theme.primarySoft : "#F9FAFB",
                          }}
                        >
                          <div className="w-10 h-10 rounded-full shadow-sm" style={{ backgroundColor: t.swatch }} />
                          <span className="text-xs font-medium text-gray-600">{t.label}</span>
                          {active && (
                            <span className="text-[10px] font-bold" style={{ color: theme.primary }}>적용 중</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
