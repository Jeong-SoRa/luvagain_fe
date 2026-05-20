"use client";
import { useState } from "react";
import { useTheme } from "@/components/ThemeContext";

export type EditableProfile = {
  name: string;
  job: string;
  location: string;
  bio: string;
  intent: string;
  kids: string;
  status: string;
  tags: string[];
};

const INTENT_OPTIONS = ["진지한 만남", "재혼 희망", "연애 우선", "일단 만남부터"];

const STATUS_OPTIONS = [
  "이혼 후 1년 미만",
  "이혼 후 1년",
  "이혼 후 2년",
  "이혼 후 3년 이상",
  "사별 후 1년 미만",
  "사별 후 1년",
  "사별 후 2년 이상",
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{label}</p>
      {children}
    </div>
  );
}

export default function EditProfileScreen({
  initial,
  photo,
  onSave,
  onBack,
}: {
  initial: EditableProfile;
  photo: string;
  onSave: (p: EditableProfile) => void;
  onBack: () => void;
}) {
  const { theme } = useTheme();
  const [form, setForm] = useState<EditableProfile>(initial);
  const [tagInput, setTagInput] = useState("");
  const [showStatusPicker, setShowStatusPicker] = useState(false);

  function set<K extends keyof EditableProfile>(key: K, value: EditableProfile[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t) && form.tags.length < 10) {
      set("tags", [...form.tags, t]);
    }
    setTagInput("");
  }

  function handleSave() {
    onSave(form);
    onBack();
  }

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 focus:outline-none focus:border-gray-300 transition-colors";

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-[#F8F7F6]">

      {/* 상단 네비 */}
      <div className="bg-white px-5 pt-10 pb-3.5 border-b border-gray-100 flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="text-sm font-medium text-gray-500 active:opacity-60"
        >
          취소
        </button>
        <h1 className="text-base font-bold text-gray-900">프로필 편집</h1>
        <button
          onClick={handleSave}
          className="text-sm font-semibold active:opacity-60"
          style={{ color: theme.primary }}
        >
          저장
        </button>
      </div>

      {/* 스크롤 폼 */}
      <div className="flex-1 overflow-y-auto">

        {/* 프로필 사진 */}
        <div className="bg-white flex flex-col items-center pt-6 pb-5 border-b border-gray-100">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 ring-2 ring-gray-100">
              <img src={photo} alt="프로필 사진" className="w-full h-full object-cover" />
            </div>
            <div
              className="absolute bottom-0.5 right-0.5 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center"
              style={{ backgroundColor: theme.primary }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2.5">사진 변경</p>
        </div>

        {/* 폼 필드 */}
        <div className="px-5 py-5 space-y-5">

          {/* 이름 */}
          <Field label="이름">
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputCls}
              placeholder="이름을 입력하세요"
            />
          </Field>

          {/* 직업 */}
          <Field label="직업">
            <input
              type="text"
              value={form.job}
              onChange={(e) => set("job", e.target.value)}
              className={inputCls}
              placeholder="직업을 입력하세요"
            />
          </Field>

          {/* 지역 */}
          <Field label="지역">
            <input
              type="text"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className={inputCls}
              placeholder="거주 지역을 입력하세요"
            />
          </Field>

          {/* 재혼/만남 의향 */}
          <Field label="만남 의향">
            <div className="grid grid-cols-2 gap-2">
              {INTENT_OPTIONS.map((opt) => {
                const active = form.intent === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => set("intent", opt)}
                    className="py-2.5 px-3 rounded-xl border text-sm font-medium transition-all text-left"
                    style={{
                      backgroundColor: active ? theme.primarySoft : "white",
                      borderColor: active ? theme.primary : "#E5E7EB",
                      color: active ? theme.primary : "#6B7280",
                    }}
                  >
                    {active && <span className="mr-1">✓</span>}
                    {opt}
                  </button>
                );
              })}
            </div>
          </Field>

          {/* 자녀 현황 */}
          <Field label="자녀 현황">
            <input
              type="text"
              value={form.kids}
              onChange={(e) => set("kids", e.target.value)}
              className={inputCls}
              placeholder="예: 1명 (7세, 동거)"
            />
          </Field>

          {/* 이혼/사별 현황 */}
          <Field label="이혼·사별 현황">
            <button
              onClick={() => setShowStatusPicker(true)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-sm text-left flex items-center justify-between"
            >
              <span className={form.status ? "text-gray-800" : "text-gray-400"}>
                {form.status || "선택하세요"}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </Field>

          {/* 자기소개 */}
          <Field label="자기소개">
            <textarea
              value={form.bio}
              onChange={(e) => set("bio", e.target.value.slice(0, 300))}
              rows={4}
              className={`${inputCls} resize-none leading-relaxed`}
              placeholder="나를 소개해주세요"
            />
            <p className="text-right text-[11px] text-gray-400 mt-1">{form.bio.length} / 300자</p>
          </Field>

          {/* 관심사 태그 */}
          <Field label="관심사">
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {form.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => set("tags", form.tags.filter((t) => t !== tag))}
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full font-medium active:opacity-70"
                  style={{ backgroundColor: theme.primarySoft, color: theme.primary }}
                >
                  {tag}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              ))}
              {form.tags.length === 0 && (
                <p className="text-xs text-gray-400">태그를 추가해주세요</p>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="관심사 입력 후 추가"
                className="flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:border-gray-300"
                maxLength={10}
              />
              <button
                onClick={addTag}
                className="px-4 py-2 rounded-xl text-white text-sm font-medium active:opacity-80"
                style={{ backgroundColor: theme.primary }}
              >
                추가
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5">최대 10개 · 탭하면 삭제</p>
          </Field>

        </div>

        {/* 하단 여백 */}
        <div className="h-8" />
      </div>

      {/* 이혼/사별 현황 바텀시트 */}
      {showStatusPicker && (
        <div className="absolute inset-0 z-40 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowStatusPicker(false)} />
          <div className="relative bg-white rounded-t-3xl z-10">
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-9 h-1 bg-gray-200 rounded-full" />
            </div>
            <div className="px-5 pt-2 pb-2 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">이혼·사별 현황</h3>
            </div>
            <div className="pb-8">
              {STATUS_OPTIONS.map((opt) => {
                const active = form.status === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => { set("status", opt); setShowStatusPicker(false); }}
                    className="w-full px-5 py-3.5 flex items-center justify-between text-sm active:bg-gray-50"
                    style={{ color: active ? theme.primary : "#374151" }}
                  >
                    <span>{opt}</span>
                    {active && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
