"use client";
import { useState } from "react";

const screens = [
  {
    id: "onboarding",
    label: "온보딩",
    title: "나를 소개해요",
    desc: "이혼·사별 경험, 자녀 유무, 재혼 의지 등 나만의 이야기를 솔직하게 담습니다.",
    phone: <OnboardingScreen />,
  },
  {
    id: "discover",
    label: "매칭 탐색",
    title: "나와 맞는 사람 찾기",
    desc: "AI가 가치관·라이프스타일·자녀 상황까지 분석해 진짜 잘 맞는 사람을 추천합니다.",
    phone: <DiscoverScreen />,
  },
  {
    id: "letter",
    label: "첫 편지",
    title: "정성을 담은 첫 인사",
    desc: "짧은 좋아요 대신, 상대방을 향한 진심을 담은 편지로 대화를 시작합니다.",
    phone: <LetterScreen />,
  },
  {
    id: "profile",
    label: "프로필",
    title: "투명한 프로필",
    desc: "나이, 직업, 자녀 현황, 재혼 의지가 모두 공개됩니다. 서로 숨기지 않아요.",
    phone: <ProfileScreen />,
  },
];

export default function AppScreens() {
  const [active, setActive] = useState(0);

  return (
    <section id="screens" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-rose-500 font-semibold text-sm uppercase tracking-widest">앱 화면</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
            어떻게 생겼을까요?
          </h2>
          <p className="text-gray-500 text-lg">
            실제 앱 화면을 미리 살펴보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: tab + description */}
          <div>
            <div className="flex flex-wrap gap-2 mb-10">
              {screens.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    active === i
                      ? "gradient-bg text-white shadow-lg shadow-rose-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <h3 className="text-3xl font-black text-gray-900 mb-4">{screens[active].title}</h3>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">{screens[active].desc}</p>

            <div className="flex flex-col gap-3">
              {[
                "돌싱 전용 맞춤 설계",
                "실명 인증으로 신뢰 보장",
                "자녀 상황 투명 공개",
                "진지한 만남 목적 매칭",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-5 h-5 rounded-full gradient-bg flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: phone */}
          <div className="flex justify-center">
            <div className="relative w-[260px] animate-float">
              <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-rose-200/40">
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-full z-10" />
                <div className="bg-white rounded-[2.5rem] overflow-hidden h-[520px]">
                  {screens[active].phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OnboardingScreen() {
  return (
    <div className="h-full bg-gradient-to-b from-rose-50 to-white p-5 pt-10">
      <div className="text-center mb-6">
        <span className="text-3xl">💝</span>
        <h3 className="font-black text-gray-900 text-xl mt-2">나를 소개해요</h3>
        <p className="text-gray-400 text-xs mt-1">솔직할수록 좋은 인연을 만나요</p>
      </div>
      <div className="space-y-3">
        {[
          { icon: "👤", label: "이름", value: "김지수" },
          { icon: "🎂", label: "나이", value: "38세" },
          { icon: "📍", label: "지역", value: "서울 강남구" },
          { icon: "💼", label: "직업", value: "마케터" },
          { icon: "👧", label: "자녀", value: "1명 (7세, 동거)" },
          { icon: "💍", label: "이혼 후", value: "2년 6개월" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <span>{item.icon}</span>
            <div className="flex-1">
              <div className="text-xs text-gray-400">{item.label}</div>
              <div className="text-sm font-semibold text-gray-800">{item.value}</div>
            </div>
            <span className="text-gray-300">›</span>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full gradient-bg text-white font-bold py-3 rounded-2xl text-sm">
        다음 단계 →
      </button>
    </div>
  );
}

function DiscoverScreen() {
  return (
    <div className="h-full bg-gray-50 p-4 pt-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-black text-gray-900 text-lg">오늘의 추천</h3>
        <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full font-semibold">AI 매칭</span>
      </div>
      {[
        { name: "박준호", age: 42, loc: "서울", job: "회사원", kid: "자녀 없음", score: 97, emoji: "👨" },
        { name: "이상혁", age: 40, loc: "경기", job: "개발자", kid: "1명 (비동거)", score: 94, emoji: "🧑" },
        { name: "최동현", age: 44, loc: "서울", job: "의사", kid: "자녀 없음", score: 91, emoji: "👨‍⚕️" },
      ].map((p) => (
        <div key={p.name} className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-200 to-amber-200 flex items-center justify-center text-2xl">
            {p.emoji}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900 text-sm">{p.name}</span>
              <span className="text-gray-400 text-xs">· {p.age}세 · {p.loc}</span>
            </div>
            <div className="text-xs text-gray-500">{p.job} · {p.kid}</div>
          </div>
          <div className="text-right">
            <div className="text-rose-500 font-black text-sm">{p.score}%</div>
            <div className="text-gray-400 text-xs">일치율</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LetterScreen() {
  return (
    <div className="h-full bg-amber-50 p-5 pt-10">
      <div className="text-center mb-6">
        <span className="text-3xl">💌</span>
        <h3 className="font-black text-gray-900 text-lg mt-2">첫 편지 보내기</h3>
        <p className="text-gray-400 text-xs mt-1">박준호님께 마음을 전해보세요</p>
      </div>
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-300 to-amber-300 flex items-center justify-center text-sm">👨</div>
          <div>
            <div className="text-xs font-semibold text-gray-700">박준호님 프로필</div>
            <div className="text-xs text-gray-400">42세 · 서울 · 회사원</div>
          </div>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          &ldquo;아이 없이 혼자 살고 있어요. 주말엔 등산이나 독서를 즐깁니다. 진지하게 새 출발 원합니다.&rdquo;
        </p>
      </div>
      <div className="bg-white rounded-3xl border border-amber-200 p-4 mb-4 min-h-[120px]">
        <p className="text-sm text-gray-600 leading-relaxed">
          안녕하세요, 준호님. 프로필을 보고 많은 공감이 됐어요. 저도 혼자 아이를 키우며...
        </p>
        <span className="inline-block w-0.5 h-4 bg-rose-400 animate-pulse ml-0.5" />
      </div>
      <div className="flex gap-2">
        <button className="flex-1 bg-gray-100 text-gray-500 font-semibold py-3 rounded-2xl text-sm">취소</button>
        <button className="flex-1 gradient-bg text-white font-bold py-3 rounded-2xl text-sm">편지 보내기 💌</button>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="h-full bg-white pt-10">
      <div className="bg-gradient-to-b from-rose-400 to-rose-600 h-32 relative">
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white bg-gradient-to-br from-rose-200 to-amber-200 flex items-center justify-center text-2xl shadow-lg">
          👩
        </div>
      </div>
      <div className="pt-10 px-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <h3 className="font-black text-gray-900 text-xl">김지수</h3>
          <span className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
            <span className="text-rose-500 text-xs">✓</span>
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4">38세 · 서울 강남구 · 마케터</p>
        <div className="flex justify-center gap-2 flex-wrap mb-4">
          {["진지한 만남", "자녀 있음", "재혼 희망"].map((tag) => (
            <span key={tag} className="bg-rose-50 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full border border-rose-100">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-500 text-xs leading-relaxed mb-4 text-left bg-gray-50 rounded-2xl p-4">
          &ldquo;7살 딸과 함께 살고 있어요. 서로의 상황을 이해하면서 천천히 알아가고 싶습니다. 함께 밥 한 끼 먹을 수 있는 분이면 좋겠어요.&rdquo;
        </p>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: "매칭률", value: "97%" },
            { label: "응답률", value: "92%" },
            { label: "편지", value: "14개" },
          ].map((s) => (
            <div key={s.label} className="bg-rose-50 rounded-2xl py-2">
              <div className="font-black text-rose-600 text-sm">{s.value}</div>
              <div className="text-gray-400 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
