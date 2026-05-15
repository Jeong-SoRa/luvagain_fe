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
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm px-6">
      <div className="w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-[#C2185B] px-6 py-8 text-center">
          <p className="text-white/70 text-sm mb-1">서로 좋아요를 눌렀어요</p>
          <h2 className="text-white text-2xl font-bold mb-6">매칭됐어요</h2>

          <div className="flex items-center justify-center gap-5">
            <div className="w-18 h-18 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-4xl"
              style={{ width: 72, height: 72 }}>
              {myProfile.emoji}
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.7">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="w-18 h-18 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-4xl"
              style={{ width: 72, height: 72 }}>
              {profile.emoji}
            </div>
          </div>

          <p className="text-white/60 text-xs mt-4">
            {myProfile.name}님과 {profile.name}님
          </p>
        </div>

        {/* Buttons */}
        <div className="px-5 py-5 flex flex-col gap-2.5">
          <button
            onClick={() => onMessage(profile)}
            className="w-full py-3.5 bg-[#C2185B] text-white font-semibold text-sm rounded-xl active:opacity-90"
          >
            메시지 보내기
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 border border-gray-200 text-gray-500 font-medium text-sm rounded-xl active:bg-gray-50"
          >
            계속 탐색하기
          </button>
        </div>
      </div>
    </div>
  );
}
