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
      <div className={`relative flex items-center justify-center bg-gradient-to-br ${profile.gradient} shrink-0`}
        style={{ height: 280 }}>
        <span className="text-8xl">{profile.emoji}</span>

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-10 left-4 w-9 h-9 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white text-lg"
        >
          ←
        </button>

        {/* Verified badge */}
        {profile.verified && (
          <div className="absolute top-10 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <span>✓</span> 인증됨
          </div>
        )}

        {/* Match score */}
        <div className="absolute bottom-4 right-4 bg-white rounded-2xl px-3 py-1.5 shadow-lg flex items-center gap-1.5">
          <span className="text-rose-500 font-black text-lg">{profile.matchScore}%</span>
          <span className="text-gray-400 text-xs">일치율</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-5">
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-2xl font-black text-gray-900">{profile.name}</h2>
          <span className="text-sm bg-rose-50 text-rose-600 font-semibold px-3 py-1 rounded-full border border-rose-100">
            {profile.intent}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4">📍 {profile.location} · {profile.job}</p>

        {/* Bio */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-5">
          <p className="text-sm font-semibold text-gray-500 mb-2">자기소개</p>
          <p className="text-gray-700 text-sm leading-relaxed">{profile.bio}</p>
          {profile.kidsDetail && (
            <p className="text-gray-500 text-xs mt-2 italic">💬 {profile.kidsDetail}</p>
          )}
        </div>

        {/* Tags */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-gray-500 mb-2">관심사</p>
          <div className="flex flex-wrap gap-2">
            {profile.tags.map((tag) => (
              <span key={tag} className="text-sm bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full border border-rose-100 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-500 mb-3">기본 정보</p>
          <div className="grid grid-cols-2 gap-2">
            {detailRows(profile).map((row) => (
              <div key={row.label} className="bg-gray-50 rounded-xl px-3 py-2.5">
                <p className="text-xs text-gray-400 mb-0.5">{row.label}</p>
                <p className="text-sm font-semibold text-gray-800">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons — sticky */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-4 flex gap-3">
        <button
          onClick={onPass}
          className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-gray-500 font-semibold text-sm active:bg-gray-50"
        >
          ✕ 패스
        </button>
        <button
          onClick={() => onLike(profile)}
          className="flex-2 px-8 py-3.5 rounded-2xl gradient-bg text-white font-bold text-sm shadow-lg shadow-rose-200 active:opacity-90"
        >
          💝 좋아요
        </button>
      </div>
    </div>
  );
}
