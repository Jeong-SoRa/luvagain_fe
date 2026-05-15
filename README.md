# LoveAgain — 다시, 사랑

돌싱(이혼·사별 후 싱글)을 위한 진지한 매칭 앱 프로토타입입니다.

## 프로토타입 보기

> **prototype** 브랜치에서 개발 중입니다.  
> Vercel 배포 URL은 GitHub Actions 완료 후 PR 댓글로 자동 공유됩니다.

## 로컬 실행

```bash
npm install
npm run dev
# http://localhost:3000
```

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel (GitHub Actions 자동 배포)

## Vercel 배포 설정 (네이티브 GitHub 연동)

1. [vercel.com](https://vercel.com) → **New Project**
2. GitHub 계정 연결 후 `Jeong-SoRa/luvagain_fe` 레포 선택
3. **Import** → Framework: Next.js 자동 감지 → **Deploy**
4. 이후 `prototype` 및 `main` 브랜치 push 시 자동 배포됨

> - `prototype` 브랜치 → **Preview URL** (팀 공유용)
> - `main` 브랜치 → **Production URL**

## 페이지 구성

- **Hero** — 앱 소개 및 핵심 메시지
- **Problem** — 돌싱이 겪는 현실 문제
- **Features** — 6가지 핵심 기능
- **App Screens** — 실제 앱 화면 인터랙티브 미리보기
- **How It Works** — 5단계 이용 방법
- **Testimonials** — 베타 테스터 후기
- **Team** — 팀 소개
- **CTA** — 베타 신청 폼

## 팀 피드백

피드백: [team@loveagain.kr](mailto:team@loveagain.kr)
