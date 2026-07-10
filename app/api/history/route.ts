import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const runtime = 'nodejs';

const kv = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const HISTORY_KEY = 'health:history';

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get('limit');
  const limit = Math.min(parseInt(limitParam || '100', 10) || 100, 500);
  const raw = await kv.lrange<string>(HISTORY_KEY, 0, limit - 1);
  const entries = raw.map((r) => (typeof r === 'string' ? JSON.parse(r) : r));
  return NextResponse.json({ entries });
}
