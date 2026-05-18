"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeContext";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const { theme } = useTheme();
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("out"), 2000);
    const t3 = setTimeout(() => onDone(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ backgroundColor: theme.splash, opacity: phase === "out" ? 0 : 1 }}
    >
      <div
        className="flex flex-col items-center gap-5 transition-all duration-500"
        style={{ opacity: phase === "in" ? 0 : 1, transform: phase === "in" ? "translateY(12px)" : "translateY(0)" }}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 27S4 20 4 11.5A7.5 7.5 0 0 1 16 6a7.5 7.5 0 0 1 12 5.5C28 20 16 27 16 27z"
              fill={theme.primary}
            />
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold tracking-tight">LoveAgain</h1>
          <p className="text-white/40 text-sm mt-1.5 font-light tracking-widest">다시, 사랑</p>
        </div>
      </div>

      <div
        className="absolute bottom-16 flex gap-1.5 transition-opacity duration-300"
        style={{ opacity: phase === "hold" ? 1 : 0 }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
