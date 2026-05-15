"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💝</span>
          <span className="text-xl font-bold gradient-text">LoveAgain</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-rose-600 transition-colors">주요 기능</a>
          <a href="#screens" className="hover:text-rose-600 transition-colors">앱 화면</a>
          <a href="#how" className="hover:text-rose-600 transition-colors">이용 방법</a>
          <a href="#team" className="hover:text-rose-600 transition-colors">팀 소개</a>
        </div>
        <a
          href="#contact"
          className="gradient-bg text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity shadow-md"
        >
          베타 신청
        </a>
      </div>
    </nav>
  );
}
