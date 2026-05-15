export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              2025 출시 예정 · 베타 모집 중
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              다시,{" "}
              <span className="gradient-text">사랑</span>할<br />
              준비가 됐나요?
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
              LoveAgain은 <strong className="text-gray-800">돌싱</strong>을 위한 진지한 만남 앱입니다.
              지난 삶의 경험을 존중하며, 새로운 시작을 함께합니다.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#contact"
                className="gradient-bg text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-rose-200 text-base"
              >
                베타 테스터 신청 →
              </a>
              <a
                href="#screens"
                className="bg-white text-gray-700 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm text-base"
              >
                앱 미리보기
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="text-rose-500 font-bold text-base">3,200+</span>
                사전 등록
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <span className="text-rose-500 font-bold text-base">★ 4.9</span>
                베타 평점
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <span className="text-rose-500 font-bold text-base">100%</span>
                실명 인증
              </div>
            </div>
          </div>

          {/* Right — Phone mockup */}
          <div className="flex justify-center">
            <div className="relative animate-float">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-[280px]">
      {/* Phone frame */}
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-rose-300/40">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-full z-10" />
        <div className="bg-white rounded-[2.5rem] overflow-hidden h-[560px] relative">
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 pt-8 pb-2">
            <span className="text-xs font-semibold text-gray-800">9:41</span>
            <div className="flex gap-1 items-center">
              <div className="flex gap-0.5">
                {[4, 6, 8, 10].map((h) => (
                  <div key={h} className="w-1 rounded-sm bg-gray-800" style={{ height: h }} />
                ))}
              </div>
              <div className="w-6 h-3 rounded-sm border-2 border-gray-800 ml-1">
                <div className="w-4 h-full bg-gray-800 rounded-sm" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="px-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs text-gray-400">안녕하세요</p>
                <p className="font-bold text-gray-900">지수님 👋</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center text-white font-bold">
                지
              </div>
            </div>

            {/* Match card */}
            <div className="relative rounded-3xl overflow-hidden h-64 bg-gradient-to-b from-rose-200 to-rose-400 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center text-4xl mx-auto mb-2">
                    👩
                  </div>
                  <p className="text-white font-bold text-lg">민정 · 38세</p>
                  <p className="text-white/80 text-xs">서울 · 디자이너</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
                <div className="flex gap-2">
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">자녀 있음</span>
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">진지한 만남</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-6">
              <button className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl shadow-md">
                ✕
              </button>
              <button className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-2xl shadow-lg shadow-rose-200">
                💝
              </button>
              <button className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl shadow-md">
                ⭐
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-4 -right-8 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 text-sm font-semibold">
        <span className="text-xl">🎉</span>
        <div>
          <div className="text-gray-800 text-xs">오늘의 매칭</div>
          <div className="text-rose-500 text-xs font-bold">3명 연결됨</div>
        </div>
      </div>
      <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 text-sm font-semibold">
        <span className="text-xl">💬</span>
        <div>
          <div className="text-gray-800 text-xs">새 메시지</div>
          <div className="text-rose-500 text-xs font-bold">준호님이 보낸 편지</div>
        </div>
      </div>
    </div>
  );
}
