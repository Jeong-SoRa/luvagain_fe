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
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-4 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-black text-gray-900">내 프로필</h1>
        <button className="text-xs text-rose-500 font-semibold bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100">
          편집
        </button>
      </div>

      {/* Profile card */}
      <div className="bg-white mx-4 mt-4 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <div className={`h-28 bg-gradient-to-br ${myProfile.gradient} flex items-center justify-center`}>
          <span className="text-6xl">{myProfile.emoji}</span>
        </div>
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-black text-gray-900">{myProfile.name}</h2>
            <span className="text-xs bg-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded-full">
              인증됨 ✓
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{myProfile.age}세 · {myProfile.location} · {myProfile.job}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "매칭률", value: `${myProfile.matchScore}%`, color: "text-rose-500" },
              { label: "응답률", value: `${myProfile.responseRate}%`, color: "text-amber-500" },
              { label: "받은 편지", value: `${myProfile.letters}통`, color: "text-purple-500" },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-2xl py-3 text-center">
                <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
                <p className="text-gray-400 text-xs">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {myProfile.tags.map((tag) => (
              <span key={tag} className="text-xs bg-rose-50 text-rose-500 px-2.5 py-1 rounded-full border border-rose-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="mx-4 mt-3 space-y-2 pb-6">
        {sections.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl px-4 py-3.5 flex items-start gap-3 shadow-sm border border-gray-100">
            <span className="text-lg mt-0.5">{s.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-0.5">{s.label}</p>
              <p className="text-sm text-gray-700 font-medium leading-relaxed">{s.value}</p>
            </div>
            <span className="text-gray-300 text-sm mt-0.5">›</span>
          </div>
        ))}
      </div>

      {/* Settings link */}
      <div className="mx-4 mb-6 bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 shadow-sm overflow-hidden">
        {["알림 설정", "계정 설정", "차단 목록", "로그아웃"].map((item) => (
          <button key={item} className={`w-full px-4 py-3.5 flex items-center justify-between text-sm active:bg-gray-50 ${item === "로그아웃" ? "text-rose-500" : "text-gray-700"}`}>
            <span>{item}</span>
            {item !== "로그아웃" && <span className="text-gray-300">›</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
