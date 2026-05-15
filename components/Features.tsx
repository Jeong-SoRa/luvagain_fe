const features = [
  {
    icon: "🔐",
    color: "bg-rose-50 border-rose-100",
    iconBg: "bg-rose-100",
    title: "100% 실명 인증",
    desc: "본인 인증 + 이혼 / 사별 확인서 등록으로 신뢰할 수 있는 만남을 보장합니다.",
    badge: "신뢰",
  },
  {
    icon: "🎯",
    color: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100",
    title: "딥 프로파일 매칭",
    desc: "나이, 자녀 유무, 재혼 의지, 가치관까지 고려한 심층 매칭 알고리즘.",
    badge: "정확도",
  },
  {
    icon: "💌",
    color: "bg-pink-50 border-pink-100",
    iconBg: "bg-pink-100",
    title: "편지 우선 대화",
    desc: "즉각 채팅 대신 정성 가득한 첫 편지로 시작합니다. 진지함이 기본값입니다.",
    badge: "진지한 만남",
  },
  {
    icon: "👨‍👩‍👧",
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100",
    title: "자녀 상황 공유",
    desc: "자녀 여부·나이·동거 여부를 투명하게 공개해 서로 이해하고 시작합니다.",
    badge: "가족 배려",
  },
  {
    icon: "🛡️",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
    title: "안전 신고 시스템",
    desc: "AI 모니터링 + 24시간 신고 센터로 악용 사례를 즉시 차단합니다.",
    badge: "안전",
  },
  {
    icon: "🌸",
    color: "bg-green-50 border-green-100",
    iconBg: "bg-green-100",
    title: "커뮤니티 & 모임",
    desc: "비슷한 처지의 사람들과 소모임, 취미 모임으로 자연스럽게 연결됩니다.",
    badge: "커뮤니티",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-rose-50/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-widest">주요 기능</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
            처음부터 끝까지,<br />
            <span className="gradient-text">돌싱을 위해 설계</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            단순한 매칭을 넘어, 새로운 삶의 동반자를 찾을 수 있도록 모든 기능을 설계했습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className={`card-hover p-6 rounded-3xl border ${f.color}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center text-2xl`}>
                  {f.icon}
                </div>
                <span className="text-xs font-semibold text-gray-400 bg-white/80 px-3 py-1 rounded-full border border-gray-100">
                  {f.badge}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
