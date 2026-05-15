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

## Vercel 배포 설정

GitHub Repository Secrets에 다음을 추가하세요:

| Secret | 설명 |
|--------|------|
| `VERCEL_TOKEN` | Vercel 계정 토큰 |
| `VERCEL_ORG_ID` | Vercel 조직 ID |
| `VERCEL_PROJECT_ID` | Vercel 프로젝트 ID |

> `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`는 `vercel link` 실행 후 `.vercel/project.json`에서 확인할 수 있습니다.

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
