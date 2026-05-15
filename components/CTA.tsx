export default function CTA() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="gradient-bg rounded-[2.5rem] p-12 md:p-16 text-center text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-white/30">
              🚀 2025년 하반기 정식 출시 예정
            </span>

            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              새로운 시작,<br />함께하고 싶지 않으신가요?
            </h2>

            <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
              베타 테스터로 참여하시면 정식 출시 시 6개월 프리미엄 무료 + 첫 만남 카페 쿠폰을 드립니다.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-5 py-4 rounded-2xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="bg-white text-rose-600 font-black px-8 py-4 rounded-2xl hover:bg-rose-50 transition-colors whitespace-nowrap shadow-lg"
              >
                베타 신청 →
              </button>
            </form>

            <div className="flex items-center justify-center gap-6 text-white/70 text-sm">
              <span>✓ 스팸 없음</span>
              <span>✓ 언제든 취소 가능</span>
              <span>✓ 무료 신청</span>
            </div>
          </div>
        </div>

        {/* Team sharing note */}
        <div className="mt-12 p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center">
          <p className="text-amber-800 font-semibold mb-1">👋 팀원분들께</p>
          <p className="text-amber-700 text-sm">
            이 페이지는 LoveAgain 프로토타입 공유용입니다. 피드백은{" "}
            <a href="mailto:team@loveagain.kr" className="underline font-semibold hover:text-amber-900">
              team@loveagain.kr
            </a>
            로 보내주세요. 현재 <strong>prototype</strong> 브랜치에서 개발 중입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
