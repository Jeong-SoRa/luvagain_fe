const stats = [
  { number: "150만+", label: "국내 돌싱 인구", sub: "매년 10만 명 증가 추세" },
  { number: "68%", label: "재혼 의향 있음", sub: "설문 응답 기준" },
  { number: "3년+", label: "평균 재혼 준비 기간", sub: "망설임이 가장 큰 이유" },
];

const problems = [
  {
    emoji: "😔",
    title: "기존 앱, 우리에겐 맞지 않아요",
    desc: "20대 중심의 가벼운 만남 앱. 돌싱에게 필요한 깊이와 배려가 없습니다.",
  },
  {
    emoji: "🙈",
    title: "주변 시선이 두렵습니다",
    desc: "소개팅·맞선에 대한 사회적 시선. 조용히, 나만 알게 새 인연을 찾고 싶습니다.",
  },
  {
    emoji: "👧",
    title: "자녀 문제, 누가 이해해줄까요",
    desc: "자녀를 둔 돌싱은 상대방도 이 상황을 이해해야 합니다. 같은 처지의 사람을 만나야 해요.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-widest">왜 LoveAgain인가</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
            돌싱의 현실,<br />
            <span className="gradient-text">제대로 마주봤습니다</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            새로운 시작을 원하지만 선뜻 나서지 못하는 분들을 위해 LoveAgain을 만들었습니다.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-2xl bg-rose-50 border border-rose-100">
              <div className="text-4xl font-black gradient-text mb-1">{s.number}</div>
              <div className="font-semibold text-gray-800 mb-1">{s.label}</div>
              <div className="text-xs text-gray-400">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className="card-hover p-7 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm"
            >
              <div className="text-4xl mb-4">{p.emoji}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
