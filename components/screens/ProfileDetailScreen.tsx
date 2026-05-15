import type { Profile } from "@/components/data/profiles";

const detailRows = (p: Profile) => [
  { label: "나이", value: `${p.age}세` },
  { label: "지역", value: p.location },
  { label: "직업", value: p.job },
  { label: "자녀", value: p.kids },
  { label: "키", value: p.height },
  { label: "종교", value: p.religion },
  { label: "흡연", value: p.smoking },
  { label: "음주", value: p.drinking },
  { label: "이혼/사별", value: p.status },
];

export default function ProfileDetailScreen({
  profile,
  onBack,
  onLike,
  onPass,
}: {
  profile: Profile;
  onBack: () => void;
  onLike: (p: Profile) => void;
  onPass: () => void;
}) {
  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      {/* Photo */}
      <div
        className={`relative flex items-center justify-center bg-gradient-to-b ${profile.gradient} shrink-0`}
        style={{ height: 260 }}
      >
        <span className="text-8xl select-none">{profile.emoji}</span>

        <button
          onClick={onBack}
          className="absolute top-10 left-4 w-8 h-8 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center text-gray-700"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {profile.verified && (
          <div className="absolute top-10 right-4 bg-white/70 backdrop-blur-sm text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="text-[#C2185B] text-xs">✓</span> 인증됨
          </div>
        )}

        <div className="absolute bottom-4 right-4 bg-white rounded-xl px-3 py-1.5 shadow-sm">
          <span className="text-[#C2185B] font-bold text-sm">{profile.matchScore}%</span>
          <span className="text-gray-400 text-xs ml-1">일치</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-5">
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
          <span className="text-xs text-[#C2185B] font-medium border border-[#C2185B]/30 px-2.5 py-1 rounded-full bg-[#C2185B]/5">
            {profile.intent}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-5">{profile.location} · {profile.job}</p>

        {/* Bio */}
        <div className="bg-gray-50 rounded-xl p-4 mb-5">
          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">자기소개</p>
          <p className="text-gray-700 text-sm leading-relaxed">{profile.bio}</p>
          {profile.kidsDetail && (
            <p className="text-gray-400 text-xs mt-3 italic border-t border-gray-100 pt-3">
              {profile.kidsDetail}
            </p>
          )}
        </div>

        {/* Tags */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-400 mb-2.5 uppercase tracking-wide">관심사</p>
          <div className="flex flex-wrap gap-2">
            {profile.tags.map((tag) => (
              <span key={tag} className="text-sm text-gray-600 px-3 py-1.5 rounded-full bg-gray-100 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Details grid */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 mb-2.5 uppercase tracking-wide">기본 정보</p>
          <div className="grid grid-cols-2 gap-2">
            {detailRows(profile).map((row) => (
              <div key={row.label} className="bg-gray-50 rounded-xl px-3 py-2.5">
                <p className="text-[11px] text-gray-400 mb-0.5">{row.label}</p>
                <p className="text-sm font-semibold text-gray-700">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky action */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-4 flex gap-3">
        <button
          onClick={onPass}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 font-medium text-sm active:bg-gray-50"
        >
          패스
        </button>
        <button
          onClick={() => onLike(profile)}
          className="flex-2 px-8 py-3 rounded-xl bg-[#C2185B] text-white font-semibold text-sm active:opacity-90"
        >
          좋아요
        </button>
      </div>
    </div>
  );
}
