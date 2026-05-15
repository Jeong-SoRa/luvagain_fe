type Screen = "discover" | "inbox" | "myprofile";

const tabs = [
  { id: "discover" as Screen, icon: "💝", label: "탐색" },
  { id: "inbox" as Screen, icon: "💬", label: "메시지" },
  { id: "myprofile" as Screen, icon: "👤", label: "내 프로필" },
];

export default function BottomNav({
  current,
  onChange,
  unread,
}: {
  current: Screen;
  onChange: (s: Screen) => void;
  unread: number;
}) {
  return (
    <div className="flex border-t border-gray-100 bg-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-all relative ${
            current === tab.id ? "text-rose-500" : "text-gray-400"
          }`}
        >
          <span className="text-xl leading-none">{tab.icon}</span>
          <span className="text-[10px] font-semibold">{tab.label}</span>
          {tab.id === "inbox" && unread > 0 && (
            <span className="absolute top-2 right-[calc(50%-14px)] w-4 h-4 bg-rose-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">
              {unread}
            </span>
          )}
          {current === tab.id && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-rose-500 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
