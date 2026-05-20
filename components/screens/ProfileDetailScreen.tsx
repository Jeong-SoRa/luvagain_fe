"use client";
import type { Profile } from "@/components/data/profiles";
import { useTheme } from "@/components/ThemeContext";

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
  profile, onBack, onLike, onPass, onHold,
}: {
  profile: Profile;
  onBack: () => void;
  onLike: (p: Profile) => void;
  onPass: () => void;
  onHold: (p: Profile) => void;
}) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      {/* Photo — 사진 탭하면 뒤로가기 */}
      <div
        className="relative overflow-hidden bg-gray-100 shrink-0 cursor-pointer"
        style={{ height: 400 }}
        onClick={onBack}
      >
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Back button */}
        <button
          onClick={(e) => { e.stopPropagation(); onBack(); }}
          className="absolute top-10 left-4 w-9 h-9 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Verified badge */}
        {profile.verified && (
          <div className="absolute top-10 right-4 bg-black/30 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 text-white">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: theme.primary }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            인증됨
          </div>
        )}

        {/* Intent tag — 사진 하단 좌측 */}
        <div className="absolute bottom-4 left-4">
          <span className="text-[12px] font-medium px-3 py-1.5 rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-sm">
            {profile.intent}
          </span>
        </div>

        {/* Match score — 사진 하단 우측 */}
        <div className="absolute bottom-4 right-4 bg-white/90 rounded-xl px-3 py-1.5 shadow-sm">
          <span className="font-bold text-sm" style={{ color: theme.primary }}>{profile.matchScore}%</span>
          <span className="text-gray-400 text-xs ml-1">일치</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-4">
        {/* Name + age */}
        <div className="mb-0.5">
          <h2 className="text-2xl font-bold text-gray-900 inline">{profile.name}</h2>
          <span className="text-gray-400 font-light text-xl ml-2">{profile.age}</span>
        </div>

        {/* Location · Job */}
        <p className="text-gray-400 text-sm mb-2.5">{profile.location} · {profile.job}</p>

        {/* Bio preview — 자기소개 앞 2줄 */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-5">{profile.bio}</p>

        {/* Full bio card */}
        <div className="bg-gray-50 rounded-xl p-4 mb-5">
          <p className="text-[11px] font-semibold text-gray-400 mb-2 uppercase tracking-wide">자기소개</p>
          <p className="text-gray-700 text-sm leading-relaxed">{profile.bio}</p>
          {profile.kidsDetail && (
            <p className="text-gray-400 text-xs mt-3 italic border-t border-gray-100 pt-3">{profile.kidsDetail}</p>
          )}
        </div>

        {/* Tags */}
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-gray-400 mb-2.5 uppercase tracking-wide">관심사</p>
          <div className="flex flex-wrap gap-2">
            {profile.tags.map((tag) => (
              <span key={tag} className="text-sm text-gray-600 px-3 py-1.5 rounded-full bg-gray-100 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Info grid */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold text-gray-400 mb-2.5 uppercase tracking-wide">기본 정보</p>
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

      {/* Sticky CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-4 flex gap-2.5">
        <button
          onClick={onPass}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 font-medium text-sm active:bg-gray-50"
        >
          패스
        </button>
        <button
          onClick={() => onHold(profile)}
          className="flex-1 py-3 rounded-xl border font-medium text-sm active:opacity-80"
          style={{ color: theme.primary, borderColor: `${theme.primary}60`, backgroundColor: theme.primarySoft }}
        >
          보류
        </button>
        <button
          onClick={() => onLike(profile)}
          className="flex-[1.4] py-3 rounded-xl text-white font-semibold text-sm active:opacity-90"
          style={{ backgroundColor: theme.primary }}
        >
          좋아요
        </button>
      </div>
    </div>
  );
}
