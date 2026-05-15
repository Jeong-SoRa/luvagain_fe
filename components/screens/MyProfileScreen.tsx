import { myProfile } from "@/components/data/profiles";

const sections = [
  { icon: "📝", label: "자기소개", value: myProfile.bio },
  { icon: "💍", label: "재혼 의향", value: myProfile.intent },
  { icon: "👶", label: "자녀 현황", value: myProfile.kids },
  { icon: "📍", label: "지역", value: myProfile.location },
  { icon: "💼", label: "직업", value: myProfile.job },
];

export default function MyProfileScreen() {
  return (
    <div className="flex flex-col h-full bg-[#F8F7F6] overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-4 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">내 프로필</h1>
        <button className="text-xs text-[#C2185B] font-medium bg-[#C2185B]/5 border border-[#C2185B]/20 px-3 py-1.5 rounded-full">
          편집
        </button>
      </div>

      {/* Profile card */}
      <div className="bg-white mx-4 mt-4 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        <div className={`h-24 bg-gradient-to-b ${myProfile.gradient} flex items-center justify-center`}>
          <span className="text-5xl">{myProfile.emoji}</span>
        </div>
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-gray-900">{myProfile.name}</h2>
            <span className="text-[11px] text-[#C2185B] font-medium border border-[#C2185B]/30 px-2 py-0.5 rounded-full bg-[#C2185B]/5">
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
              <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info sections */}
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

      {/* Settings */}
      <div className="mx-4 mb-6 bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
        {["알림 설정", "계정 설정", "차단 목록", "로그아웃"].map((item) => (
          <button
            key={item}
            className={`w-full px-4 py-3.5 flex items-center justify-between text-sm active:bg-gray-50 ${
              item === "로그아웃" ? "text-[#C2185B]" : "text-gray-700"
            }`}
          >
            <span>{item}</span>
            {item !== "로그아웃" && <span className="text-gray-300 text-xs">›</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
