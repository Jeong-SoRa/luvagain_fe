"use client";
import { useTheme } from "./ThemeContext";

type Screen = "discover" | "inbox" | "myprofile";

const tabs: { id: Screen; label: string; icon: (active: boolean, color: string) => React.ReactNode }[] = [
  {
    id: "discover",
    label: "탐색",
    icon: (active, color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "#9CA3AF"} strokeWidth="1.8">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    id: "inbox",
    label: "메시지",
    icon: (active, color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "#9CA3AF"} strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "myprofile",
    label: "프로필",
    icon: (active, color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "#9CA3AF"} strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function BottomNav({
  current, onChange, unread,
}: {
  current: Screen;
  onChange: (s: Screen) => void;
  unread: number;
}) {
  const { theme } = useTheme();

  return (
    <div className="flex border-t border-gray-100 bg-white">
      {tabs.map((tab) => {
        const active = current === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="flex-1 flex flex-col items-center py-3 gap-1 relative"
          >
            <div className="relative">
              {tab.icon(active, theme.primary)}
              {tab.id === "inbox" && unread > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white"
                  style={{ backgroundColor: theme.primary }}
                />
              )}
            </div>
            <span
              className="text-[10px] font-medium"
              style={{ color: active ? theme.primary : "#9CA3AF" }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
