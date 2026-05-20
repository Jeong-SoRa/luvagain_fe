"use client";
import { useState } from "react";
import { myProfile } from "@/components/data/profiles";
import { themes, useTheme, type ThemeId } from "@/components/ThemeContext";
import EditProfileScreen, { type EditableProfile } from "@/components/screens/EditProfileScreen";

function profileSections(p: EditableProfile) {
  return [
    { icon: "📝", label: "자기소개", value: p.bio },
    { icon: "💍", label: "재혼 의향", value: p.intent },
    { icon: "👶", label: "자녀 현황", value: p.kids },
    { icon: "📍", label: "지역", value: p.location },
    { icon: "💼", label: "직업", value: p.job },
  ];
}

const ALARM_ITEMS = [
  { id: "match" as const, label: "매칭 알림", desc: "새로운 매칭이 성사되면 알려드려요" },
  { id: "chat" as const, label: "채팅 알림", desc: "새 메시지가 도착하면 알려드려요" },
  { id: "refresh" as const, label: "추천 갱신 알림", desc: "3시간 후 새 추천이 준비되면 알려드려요" },
  { id: "marketing" as const, label: "마케팅 알림", desc: "이벤트·혜택 소식을 알려드려요" },
];

type AlarmState = { match: boolean; chat: boolean; refresh: boolean; marketing: boolean };

function Toggle({ on, onChange, color }: { on: boolean; onChange: () => void; color: string }) {
  return (
    <button
      onClick={onChange}
      className="w-11 h-6 rounded-full relative flex-shrink-0 transition-colors duration-200"
      style={{ backgroundColor: on ? color : "#D1D5DB" }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200"
        style={{ transform: on ? "translateX(21px)" : "translateX(2px)" }}
      />
    </button>
  );
}

export default function MyProfileScreen() {
  const { theme, setTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<EditableProfile>({
    name: myProfile.name,
    job: myProfile.job,
    location: myProfile.location,
    bio: myProfile.bio,
    intent: myProfile.intent,
    kids: myProfile.kids,
    status: "이혼 후 2년",
    tags: [...myProfile.tags],
  });
  const [showAlarm, setShowAlarm] = useState(false);
  const [alarms, setAlarms] = useState<AlarmState>({
    match: true,
    chat: true,
    refresh: true,
    marketing: false,
  });

  function toggleAlarm(id: keyof AlarmState) {
    setAlarms((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  if (isEditing) {
    return (
      <EditProfileScreen
        initial={profile}
        photo={myProfile.photo}
        onSave={(p) => setProfile(p)}
        onBack={() => setIsEditing(false)}
      />
    );
  }

  return (
    // 바깥 wrapper: relative로 모달 기준점, overflow-hidden으로 내용 클립
    <div className="flex flex-col h-full relative overflow-hidden">

      {/* 스크롤 가능한 메인 컨텐츠 */}
      <div className="flex-1 overflow-y-auto bg-[#F8F7F6]">

        {/* Header */}
        <div className="bg-white px-5 pt-10 pb-4 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">내 프로필</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border"
            style={{ color: theme.primary, borderColor: `${theme.primary}40`, backgroundColor: theme.primaryMid }}
          >
            편집
          </button>
        </div>

        {/* Profile header — 전체 너비, 카드 없음 */}
        <div className="bg-white border-b border-gray-100">
          <div className="h-36 overflow-hidden bg-gray-100">
            <img src={myProfile.photo} alt={profile.name} className="w-full h-full object-cover object-top" />
          </div>
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-gray-900">{profile.name}</h2>
              <span
                className="text-[11px] font-medium border px-2 py-0.5 rounded-full"
                style={{ color: theme.primary, borderColor: `${theme.primary}40`, backgroundColor: theme.primaryMid }}
              >
                인증됨 ✓
              </span>
            </div>
            <p className="text-gray-400 text-xs mb-4">{myProfile.age}세 · {profile.location} · {profile.job}</p>

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
              {profile.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Profile info sections */}
        <div className="mx-4 mt-3 space-y-2">
          {profileSections(profile).map((s) => (
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

        {/* 테마 색상 */}
        <div className="mx-4 mt-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
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
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: t.swatch,
                      boxShadow: active ? `0 0 0 3px white, 0 0 0 5px ${t.swatch}` : "none",
                      transform: active ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {active && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[11px]" style={{ color: active ? t.swatch : "#9CA3AF", fontWeight: active ? 600 : 400 }}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 설정 메뉴 */}
        <div className="mx-4 mt-3 mb-8 bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
          {/* 알림 설정 */}
          <button
            onClick={() => setShowAlarm(true)}
            className="w-full px-4 py-3.5 flex items-center justify-between text-sm text-gray-700 active:bg-gray-50"
          >
            <div className="flex items-center gap-2.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span>알림 설정</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: theme.primarySoft, color: theme.primary }}
              >
                {Object.values(alarms).filter(Boolean).length}개 ON
              </span>
              <span className="text-gray-300 text-xs">›</span>
            </div>
          </button>

          {["계정 설정", "차단 목록"].map((item) => (
            <button
              key={item}
              className="w-full px-4 py-3.5 flex items-center justify-between text-sm text-gray-700 active:bg-gray-50"
            >
              <span>{item}</span>
              <span className="text-gray-300 text-xs">›</span>
            </button>
          ))}

          <button
            className="w-full px-4 py-3.5 text-left text-sm active:bg-gray-50"
            style={{ color: theme.primary }}
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* 알림 설정 바텀시트 — absolute로 전체 화면 덮음 */}
      {showAlarm && (
        <div className="absolute inset-0 z-40 flex flex-col justify-end">
          {/* 딤 배경 */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowAlarm(false)}
          />

          {/* 시트 본체 */}
          <div className="relative bg-white rounded-t-3xl z-10">
            {/* 핸들 */}
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-9 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* 헤더 */}
            <div className="px-5 pt-2 pb-4 flex items-center justify-between border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900 text-base">알림 설정</h3>
                <p className="text-xs text-gray-400 mt-0.5">받을 알림을 선택하세요</p>
              </div>
              <button
                onClick={() => setShowAlarm(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 토글 목록 */}
            <div className="px-5 pb-10 divide-y divide-gray-50">
              {ALARM_ITEMS.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle
                    on={alarms[item.id]}
                    onChange={() => toggleAlarm(item.id)}
                    color={theme.primary}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
