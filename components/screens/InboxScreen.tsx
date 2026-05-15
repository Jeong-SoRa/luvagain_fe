import { profiles, conversations } from "@/components/data/profiles";
import type { Profile } from "@/components/data/profiles";

const matchedIds = [1, 2];

export default function InboxScreen({ onOpenChat }: { onOpenChat: (p: Profile) => void }) {
  const matched = profiles.filter((p) => matchedIds.includes(p.id));
  const liked = profiles.filter((p) => !matchedIds.includes(p.id)).slice(0, 3);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-5 pt-10 pb-4 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900">메시지</h1>
        <p className="text-xs text-gray-400 mt-0.5">매칭된 {matched.length}명과 대화 중</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* New matches */}
        <div className="px-5 pt-4 pb-3 border-b border-gray-50">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">새 매칭</p>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {matched.map((p) => (
              <button
                key={p.id}
                onClick={() => onOpenChat(p)}
                className="flex flex-col items-center gap-1.5 shrink-0"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-b ${p.gradient} flex items-center justify-center text-2xl border-2 border-[#C2185B]/40`}>
                  {p.emoji}
                </div>
                <span className="text-xs text-gray-600">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Conversations */}
        <div className="px-5 pt-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">대화</p>
          {matched.map((p) => {
            const msgs = conversations[p.id] ?? [];
            const last = msgs[msgs.length - 1];
            const unread = p.id === 1;
            return (
              <button
                key={p.id}
                onClick={() => onOpenChat(p)}
                className="w-full flex items-center gap-3 py-3.5 border-b border-gray-50 text-left active:bg-gray-50"
              >
                <div className="relative shrink-0">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-b ${p.gradient} flex items-center justify-center text-lg`}>
                    {p.emoji}
                  </div>
                  {unread && (
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#C2185B] rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-sm ${unread ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
                      {p.name}
                    </span>
                    <span className="text-[11px] text-gray-400">{last?.time ?? ""}</span>
                  </div>
                  <p className={`text-xs truncate ${unread ? "text-gray-700 font-medium" : "text-gray-400"}`}>
                    {last?.text ?? "대화를 시작해보세요"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Liked */}
        <div className="px-5 pt-5">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">좋아요 보낸 분들</p>
          {liked.map((p) => (
            <div key={p.id} className="flex items-center gap-3 py-3 border-b border-gray-50">
              <div className={`w-11 h-11 rounded-full bg-gradient-to-b ${p.gradient} flex items-center justify-center text-lg opacity-50`}>
                {p.emoji}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">{p.name} · {p.age}세</p>
                <p className="text-xs text-gray-400">답장 대기 중</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
