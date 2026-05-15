import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoveAgain — 다시, 사랑",
  description: "돌싱을 위한 진지한 만남 앱. 새로운 시작을 응원합니다.",
  keywords: ["돌싱", "재혼", "만남", "소개팅", "싱글"],
  openGraph: {
    title: "LoveAgain — 다시, 사랑",
    description: "돌싱을 위한 진지한 만남 앱",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
