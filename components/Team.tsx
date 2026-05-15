const team = [
  {
    emoji: "👨‍💻",
    name: "김민준",
    role: "CEO & 공동창업자",
    bio: "전 카카오 PM · 이혼 경험자 · 돌싱 커뮤니티 운영 3년",
    color: "from-rose-400 to-pink-500",
  },
  {
    emoji: "👩‍🎨",
    name: "이서연",
    role: "CPO & 공동창업자",
    bio: "전 토스 디자이너 · UX 전공 · 한부모 가정 이해 깊음",
    color: "from-amber-400 to-orange-400",
  },
  {
    emoji: "👨‍💼",
    name: "박현우",
    role: "CTO",
    bio: "AI 매칭 알고리즘 개발 · 전 네이버 백엔드 엔지니어",
    color: "from-purple-400 to-rose-400",
  },
  {
    emoji: "👩‍⚕️",
    name: "최유진",
    role: "심리 자문",
    bio: "임상심리사 · 이혼 후 심리 회복 연구 전문가",
    color: "from-teal-400 to-green-500",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-gradient-to-b from-white to-rose-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-widest">팀 소개</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
            직접 경험하고,<br />
            <span className="gradient-text">직접 만들었습니다</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            LoveAgain 팀은 모두 돌싱 혹은 돌싱 가족을 둔 사람들입니다.
            우리 자신의 문제를 해결하기 위해 만들었습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {team.map((t) => (
            <div key={t.name} className="card-hover text-center bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${t.color} flex items-center justify-center text-3xl mx-auto mb-4 shadow-md`}>
                {t.emoji}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">{t.name}</h3>
              <div className="text-rose-500 text-xs font-semibold mb-3">{t.role}</div>
              <p className="text-gray-400 text-xs leading-relaxed">{t.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
