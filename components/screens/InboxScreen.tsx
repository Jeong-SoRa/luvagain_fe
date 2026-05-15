import { profiles, conversations } from "@/components/data/profiles";
import type { Profile } from "@/components/data/profiles";

const matchedIds = [1, 2];

export default function InboxScreen({ onOpenChat }: { onOpenChat: (p: Profile) => void }) {
  const matched = profiles.filter((p) => matchedIds.includes(p.id));
  const others = profiles.filter((p) => !matchedIds.includes(p.id)).slice(0, 3);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-5 pt-10 pb-3 border-b border-gray-100">
        <h1 className="text-xl font-black text-gray-900 mb-0.5">메시지</h1>
        <p className="text-xs text-gray-400">매칭된 {matched.length}명과 대화 중</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* New matches row */}
        <div className="px-5 pt-4 pb-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">새 매칭</p>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {matched.map((p) => (
              <button
                key={p.id}
                onClick={() => onOpenChat(p)}
                className="flex flex-col items-center gap-1.5 shrink-0"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${p.gradient} flex items-center justify-center text-2xl border-2 border-rose-400`}>
                  {p.emoji}
                </div>
                <span className="text-xs text-gray-600 font-medium">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Conversations */}
        <div className="px-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">대화</p>
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
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${p.gradient} flex items-center justify-center text-xl`}>
                    {p.emoji}
                  </div>
                  {unread && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-sm font-bold ${unread ? "text-gray-900" : "text-gray-700"}`}>
                      {p.name}
                    </span>
                    <span className="text-xs text-gray-400">{last?.time ?? ""}</span>
                  </div>
                  <p className={`text-xs truncate ${unread ? "text-gray-800 font-semibold" : "text-gray-400"}`}>
                    {last?.text ?? "대화를 시작해보세요"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Suggested (not yet matched) */}
        <div className="px-5 mt-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">좋아요 보낸 분들</p>
          {others.map((p) => (
            <div key={p.id} className="flex items-center gap-3 py-3 border-b border-gray-50">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${p.gradient} flex items-center justify-center text-xl opacity-60`}>
                {p.emoji}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-500">{p.name} · {p.age}세</p>
                <p className="text-xs text-gray-400">답장을 기다리는 중...</p>
              </div>
              <span className="text-xs text-gray-300">💝</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
