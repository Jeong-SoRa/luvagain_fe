const steps = [
  {
    num: "01",
    icon: "📝",
    title: "프로필 등록",
    desc: "이름, 나이, 직업, 자녀 현황, 재혼 의지를 솔직하게 입력합니다. 본인 인증 필수.",
    color: "from-rose-400 to-pink-500",
  },
  {
    num: "02",
    icon: "✅",
    title: "인증 심사",
    desc: "LoveAgain 팀이 48시간 내 제출 서류를 검토합니다. 허위 정보는 즉시 차단.",
    color: "from-amber-400 to-orange-500",
  },
  {
    num: "03",
    icon: "💝",
    title: "AI 매칭 추천",
    desc: "매일 3~5명의 최적 매칭이 추천됩니다. 가치관, 라이프스타일, 가족 상황 고려.",
    color: "from-rose-500 to-rose-700",
  },
  {
    num: "04",
    icon: "💌",
    title: "편지로 시작",
    desc: "관심 있는 분께 진심 담긴 첫 편지를 보냅니다. 빠른 좋아요보다 깊은 인사로.",
    color: "from-purple-400 to-pink-500",
  },
  {
    num: "05",
    icon: "☕",
    title: "실제 만남",
    desc: "편지 → 채팅 → 안전 장소 오프라인 만남. 충분히 알아가고 만납니다.",
    color: "from-green-400 to-teal-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-gradient-to-b from-rose-50/30 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-widest">이용 방법</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
            5단계로 새 인연을<br />
            <span className="gradient-text">안전하게 만납니다</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-rose-200 via-amber-200 to-rose-200" />

          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="text-center relative">
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg relative z-10`}>
                  {step.icon}
                </div>
                <div className="font-black text-xs text-gray-300 mb-1">{step.num}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
