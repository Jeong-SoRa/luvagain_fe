# 백엔드 헬스 모니터

Flutter 앱과 독립적으로 채팅 서버/매칭 서버가 살아있는지 주기적으로 확인하고 이력을 기록하는 기능입니다.

## 엔드포인트

- `GET /api/check` — `chat_http`, `match_http`(`/health` 응답), `chat_socket`을 확인해 Vercel KV에 기록
- `GET /api/history?limit=100` — 기록된 이력 조회
- `/health-dashboard.html` — 결과를 보는 대시보드 (정적 페이지, "지금 바로 확인" 버튼 포함)

## chat_socket 검증 방식

채팅 서버 socket.io에 **인증 토큰 없이** 접속을 시도합니다. 서버가 살아있으면 `io.use()` 인증
미들웨어가 즉시 `connect_error('인증 토큰이 없습니다')`로 응답하는데, 이 응답 자체가 "서버가
정상 동작 중"이라는 증거입니다. 실제 메시지 송수신이나 인증 우회는 하지 않습니다 — 토큰 없이
연결이 그냥 열리면(`connect` 이벤트) 오히려 인증 미들웨어가 안 도는 비정상 상황으로 표시합니다.

## 배포 전 준비

1. Vercel 프로젝트 Storage 탭에서 **Redis(Upstash)** 데이터베이스를 연결하세요(기존 Vercel KV는
   deprecated되어 Upstash Redis로 통합됨). 연결하면 `KV_REST_API_URL`, `KV_REST_API_TOKEN`
   환경변수가 자동으로 주입되고, 코드는 `@upstash/redis`로 이 값을 사용합니다.
2. (선택) `CRON_SECRET` 환경변수를 설정하면 `/api/check`가 Vercel Cron이 보내는
   `Authorization: Bearer <CRON_SECRET>` 헤더가 있을 때만 동작합니다. 설정 시
   `/health-dashboard.html`의 "지금 바로 확인" 버튼은 401을 받게 되니, 수동 테스트가
   필요하면 이 값을 잠시 빼두세요.
3. (선택) `CHAT_SERVER_URL`, `MATCH_SERVER_URL` 환경변수로 대상 서버 주소를 바꿀 수 있습니다.

## Cron 주기 관련 주의사항

`vercel.json`에 10분마다(`*/10 * * * *`) 실행되도록 설정했지만, **Vercel Hobby(무료) 플랜은
Cron Job이 하루 1회만 실제로 트리거됩니다.** 더 자주 확인하려면 Pro 플랜으로 올리거나,
cron-job.org 같은 외부 무료 크론 서비스로 배포된 `/api/check` URL을 원하는 주기로 호출하세요.
