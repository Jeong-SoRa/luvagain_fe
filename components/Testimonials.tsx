const testimonials = [
  {
    name: "김지연",
    age: 42,
    avatar: "👩‍💼",
    text: "이혼 후 3년간 혼자 살면서 재혼은 꿈도 못 꿨어요. LoveAgain에서 비슷한 처지의 분을 만나 지금은 진지하게 만나고 있습니다.",
    matched: "연남 · 43세 · 회사원",
    stars: 5,
  },
  {
    name: "박성진",
    age: 45,
    avatar: "👨‍💻",
    text: "기존 소개팅 앱은 너무 가벼웠어요. LoveAgain은 처음부터 진지한 분들만 있어서 좋았습니다. 지금 예비 아내와 이 앱에서 만났어요.",
    matched: "강남 · 40세 · 디자이너",
    stars: 5,
  },
  {
    name: "최미진",
    age: 38,
    avatar: "👩‍🏫",
    text: "아이가 있어서 걱정이 많았는데, 상대방도 자녀가 있어 처음부터 서로 이해하고 시작했어요. 이런 앱이 있었으면 했는데.",
    matched: "마포 · 41세 · 교육업",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-widest">실제 후기</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
            이미 새 인연을<br />
            <span className="gradient-text">찾은 분들</span>
          </h2>
          <p className="text-gray-400 text-sm">베타 테스터 후기 (실명 비공개)</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-hover bg-gradient-to-br from-rose-50 to-white rounded-3xl p-7 border border-rose-100">
              <div className="flex text-amber-400 text-sm mb-4">
                {"★".repeat(t.stars)}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-rose-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-amber-200 flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name} · {t.age}세</div>
                  <div className="text-xs text-gray-400">→ {t.matched}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
