"use client";
import { createContext, useContext, useState } from "react";

export type ThemeId = "rose" | "navy" | "forest" | "burgundy";

export type Theme = {
  id: ThemeId;
  label: string;
  swatch: string;       // color for the swatch dot
  primary: string;      // main action color
  primarySoft: string;  // light tinted background
  primaryMid: string;   // mid opacity bg (badges, borders)
  splash: string;       // splash screen background
};

export const themes: Theme[] = [
  {
    id: "rose",
    label: "로즈",
    swatch: "#C2185B",
    primary: "#C2185B",
    primarySoft: "#FFF0F5",
    primaryMid: "rgba(194,24,91,0.08)",
    splash: "#111111",
  },
  {
    id: "navy",
    label: "네이비",
    swatch: "#1B4F8C",
    primary: "#1B4F8C",
    primarySoft: "#EEF4FF",
    primaryMid: "rgba(27,79,140,0.08)",
    splash: "#0A1628",
  },
  {
    id: "forest",
    label: "포레스트",
    swatch: "#2D7A52",
    primary: "#2D7A52",
    primarySoft: "#EDFAF4",
    primaryMid: "rgba(45,122,82,0.08)",
    splash: "#0F2419",
  },
  {
    id: "burgundy",
    label: "버건디",
    swatch: "#7D1A35",
    primary: "#7D1A35",
    primarySoft: "#FFF0F3",
    primaryMid: "rgba(125,26,53,0.08)",
    splash: "#1A0810",
  },
];

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (id: ThemeId) => void;
  appName: string;
}>({ theme: themes[0], setTheme: () => {}, appName: "LoveAgain" });

export function ThemeProvider({ children, appName = "LoveAgain" }: { children: React.ReactNode; appName?: string }) {
  const [id, setId] = useState<ThemeId>("rose");
  return (
    <ThemeContext.Provider value={{ theme: themes.find((t) => t.id === id)!, setTheme: setId, appName }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
