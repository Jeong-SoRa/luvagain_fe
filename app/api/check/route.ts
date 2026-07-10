import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { io } from 'socket.io-client';

export const runtime = 'nodejs';

// Vercel의 Redis(Upstash) 마켓플레이스 연동은 보통 KV_REST_API_URL/KV_REST_API_TOKEN
// 이름으로 환경변수를 주입한다. Redis.fromEnv()의 기본 이름(UPSTASH_REDIS_REST_*)과
// 달라 명시적으로 지정한다.
const kv = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const CHAT_HTTP_URL = process.env.CHAT_SERVER_URL || 'https://chatserver-production-6f07.up.railway.app';
const MATCH_HTTP_URL = process.env.MATCH_SERVER_URL || 'https://matchingserver-production.up.railway.app';
const HISTORY_KEY = 'health:history';
const MAX_HISTORY = 500;

type CheckResult = {
  name: string;
  ok: boolean;
  status?: number;
  detail?: string;
  error?: string;
  latencyMs: number;
};

async function checkHttp(name: string, baseUrl: string): Promise<CheckResult> {
  const start = Date.now();
  try {
    const res = await fetch(`${baseUrl}/health`, { signal: AbortSignal.timeout(8000) });
    return { name, ok: res.ok, status: res.status, latencyMs: Date.now() - start };
  } catch (e) {
    return { name, ok: false, error: String((e as Error)?.message || e), latencyMs: Date.now() - start };
  }
}

// 토큰 없이 소켓에 붙는다. 채팅 서버가 살아있다면 io.use() 인증 미들웨어가
// 즉시 connect_error('인증 토큰이 없습니다')로 응답하는데, 이게 "서버가
// 정상 응답 중"이라는 증거가 된다. 실제 메시지 송수신이나 인증 우회는 하지 않는다.
function checkChatSocket(baseUrl: string): Promise<CheckResult> {
  const start = Date.now();
  return new Promise((resolve) => {
    const socket = io(baseUrl, {
      transports: ['websocket'],
      reconnection: false,
      timeout: 8000,
      auth: {},
    });

    let settled = false;
    const finish = (result: CheckResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.close();
      resolve(result);
    };

    const timer = setTimeout(() => {
      finish({ name: 'chat_socket', ok: false, detail: 'timeout', latencyMs: Date.now() - start });
    }, 9000);

    socket.on('connect_error', (err) => {
      const msg = (err as Error)?.message || String(err);
      const authRejected = /인증 토큰이 없습니다|유효하지 않은 토큰/.test(msg);
      finish({ name: 'chat_socket', ok: authRejected, detail: msg, latencyMs: Date.now() - start });
    });

    socket.on('connect', () => {
      // 토큰 없이 연결이 그냥 열리면 인증 미들웨어가 동작하지 않는다는 뜻이라 비정상으로 표시한다
      finish({ name: 'chat_socket', ok: false, detail: 'connected without auth (unexpected)', latencyMs: Date.now() - start });
    });
  });
}

export async function GET(request: NextRequest) {
  if (process.env.CRON_SECRET) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
  }

  const [chatHttp, matchHttp, chatSocket] = await Promise.all([
    checkHttp('chat_http', CHAT_HTTP_URL),
    checkHttp('match_http', MATCH_HTTP_URL),
    checkChatSocket(CHAT_HTTP_URL),
  ]);

  const entry = {
    timestamp: new Date().toISOString(),
    checks: [chatHttp, matchHttp, chatSocket],
  };

  await kv.lpush(HISTORY_KEY, JSON.stringify(entry));
  await kv.ltrim(HISTORY_KEY, 0, MAX_HISTORY - 1);

  return NextResponse.json(entry);
}
