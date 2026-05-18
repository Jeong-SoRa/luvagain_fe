"use client";
import { myProfile } from "@/components/data/profiles";
import { themes, useTheme, type ThemeId } from "@/components/ThemeContext";

const sections = [
  { icon: "📝", label: "자기소개", value: myProfile.bio },
  { icon: "💍", label: "재혼 의향", value: myProfile.intent },
  { icon: "👶", label: "자녀 현황", value: myProfile.kids },
  { icon: "📍", label: "지역", value: myProfile.location },
  { icon: "💼", label: "직업", value: myProfile.job },
];

export default function MyProfileScreen() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col h-full bg-[#F8F7F6] overflow-y-auto">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">내 프로필</h1>
        <button
          className="text-xs font-medium px-3 py-1.5 rounded-full border"
          style={{ color: theme.primary, borderColor: `${theme.primary}40`, backgroundColor: theme.primaryMid }}
        >
          편집
        </button>
      </div>

      {/* Profile card */}
      <div className="bg-white mx-4 mt-4 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        <div className="h-28 overflow-hidden bg-gray-100">
          <img src={myProfile.photo} alt={myProfile.name} className="w-full h-full object-cover object-top" />
        </div>
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-gray-900">{myProfile.name}</h2>
            <span
              className="text-[11px] font-medium border px-2 py-0.5 rounded-full"
              style={{ color: theme.primary, borderColor: `${theme.primary}40`, backgroundColor: theme.primaryMid }}
            >
              인증됨 ✓
            </span>
          </div>
          <p className="text-gray-400 text-xs mb-4">{myProfile.age}세 · {myProfile.location} · {myProfile.job}</p>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "매칭률", value: `${myProfile.matchScore}%` },
              { label: "응답률", value: `${myProfile.responseRate}%` },
              { label: "받은 편지", value: `${myProfile.letters}통` },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl py-2.5 text-center">
                <p className="font-bold text-gray-900 text-base">{s.value}</p>
                <p className="text-gray-400 text-[11px]">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {myProfile.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-4 mt-3 space-y-2 pb-3">
        {sections.map((s) => (
          <div key={s.label} className="bg-white rounded-xl px-4 py-3.5 flex items-start gap-3 border border-gray-100">
            <span className="text-base mt-0.5">{s.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-gray-400 mb-0.5">{s.label}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{s.value}</p>
            </div>
            <span className="text-gray-300 text-sm mt-0.5">›</span>
          </div>
        ))}
      </div>

      {/* 테마 설정 */}
      <div className="mx-4 mt-3 mb-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <p className="text-sm font-semibold text-gray-800">테마 색상</p>
          <p className="text-xs text-gray-400 mt-0.5">앱 전체 색상을 변경합니다</p>
        </div>
        <div className="px-4 py-4 grid grid-cols-4 gap-3">
          {themes.map((t) => {
            const active = t.id === theme.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as ThemeId)}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: t.swatch,
                    boxShadow: active ? `0 0 0 3px white, 0 0 0 5px ${t.swatch}` : "none",
                  }}
                >
                  {active && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-gray-500">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-4 mb-6 bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
        {["알림 설정", "계정 설정", "차단 목록", "로그아웃"].map((item) => (
          <button
            key={item}
            className="w-full px-4 py-3.5 flex items-center justify-between text-sm active:bg-gray-50"
            style={{ color: item === "로그아웃" ? theme.primary : "#374151" }}
          >
            <span>{item}</span>
            {item !== "로그아웃" && <span className="text-gray-300 text-xs">›</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
