"use client";
import { useState } from "react";
import { themes, useTheme, type ThemeId } from "./ThemeContext";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating trigger — sits inside the phone frame as prototype meta-control */}
      <button
        onClick={() => setOpen(true)}
        title="테마 변경"
        className="absolute bottom-[72px] right-3 z-30 w-8 h-8 rounded-full shadow-lg border border-white/30 flex items-center justify-center"
        style={{ backgroundColor: theme.primary }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </button>

      {/* Bottom sheet */}
      {open && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          {/* Sheet */}
          <div className="relative bg-white rounded-t-3xl px-5 pt-5 pb-8 z-10">
            {/* Handle */}
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900 text-base">테마 선택</h3>
              <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                프로토타입 전용
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-5">팀원 검토용 테마 변경 기능입니다</p>

            <div className="grid grid-cols-4 gap-3">
              {themes.map((t) => {
                const active = t.id === theme.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id as ThemeId); setOpen(false); }}
                    className={`flex flex-col items-center gap-2 py-3 rounded-2xl border-2 transition-all ${
                      active ? "border-gray-800 bg-gray-50" : "border-transparent bg-gray-50"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full shadow-sm"
                      style={{ backgroundColor: t.swatch }}
                    />
                    <span className={`text-xs font-medium ${active ? "text-gray-900" : "text-gray-500"}`}>
                      {t.label}
                    </span>
                    {active && (
                      <span className="text-[10px] text-gray-400">현재</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
