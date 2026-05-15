"use client";
import type { Profile } from "@/components/data/profiles";
import { myProfile } from "@/components/data/profiles";

export default function MatchModal({
  profile,
  onMessage,
  onClose,
}: {
  profile: Profile;
  onMessage: (p: Profile) => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm px-6">
      {/* Confetti dots */}
      {[...Array(16)].map((_, i) => (
        <span
          key={i}
          className="absolute text-lg pointer-events-none animate-bounce"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 90}%`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.8 + Math.random() * 0.6}s`,
          }}
        >
          {["💕", "✨", "🌸", "💫"][i % 4]}
        </span>
      ))}

      <div className="w-full bg-white rounded-3xl overflow-hidden shadow-2xl relative z-10">
        {/* Header gradient */}
        <div className="gradient-bg px-6 py-8 text-center">
          <p className="text-white/80 text-sm font-semibold mb-1">서로 좋아요를 눌렀어요!</p>
          <h2 className="text-white text-3xl font-black mb-6">매칭됐어요 💝</h2>

          {/* Two avatars */}
          <div className="flex items-center justify-center gap-4">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${myProfile.gradient} flex items-center justify-center text-4xl border-4 border-white shadow-lg`}>
              {myProfile.emoji}
            </div>
            <span className="text-white text-3xl animate-pulse">💕</span>
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${profile.gradient} flex items-center justify-center text-4xl border-4 border-white shadow-lg`}>
              {profile.emoji}
            </div>
          </div>

          <p className="text-white/80 text-sm mt-5">
            {myProfile.name}님 · {profile.name}님
          </p>
        </div>

        {/* Buttons */}
        <div className="px-6 py-5 flex flex-col gap-3">
          <button
            onClick={() => onMessage(profile)}
            className="w-full py-4 gradient-bg text-white font-black text-base rounded-2xl shadow-lg shadow-rose-200 active:opacity-90"
          >
            💌 첫 편지 보내기
          </button>
          <button
            onClick={onClose}
            className="w-full py-3.5 border border-gray-200 text-gray-500 font-semibold text-sm rounded-2xl active:bg-gray-50"
          >
            계속 탐색하기
          </button>
        </div>
      </div>
    </div>
  );
}
