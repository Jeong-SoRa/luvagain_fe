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
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold tracking-tight">다시, 3일</h1>
          <p className="text-white/40 text-sm mt-1.5 font-light tracking-widest">3일의 설렘, 그리고 선택</p>
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
