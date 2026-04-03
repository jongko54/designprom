import { NextRequest, NextResponse } from "next/server";

import { generateHordeRoughDraft } from "@/lib/ai-horde";

export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

type RateLimitEntry = {
  count: number;
  expiresAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __designpromHordeRateLimit: Map<string, RateLimitEntry> | undefined;
}

function getRateLimitStore() {
  if (!globalThis.__designpromHordeRateLimit) {
    globalThis.__designpromHordeRateLimit = new Map();
  }

  return globalThis.__designpromHordeRateLimit;
}

function getRequestIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function hitRateLimit(ip: string) {
  const store = getRateLimitStore();
  const now = Date.now();
  const existing = store.get(ip);

  if (!existing || existing.expiresAt < now) {
    store.set(ip, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS
    });

    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  store.set(ip, {
    ...existing,
    count: existing.count + 1
  });

  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getRequestIp(request);

    if (hitRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Try again in a few minutes."
        },
        { status: 429 }
      );
    }

    const body = (await request.json()) as {
      height?: number;
      model?: string;
      prompt?: string;
      width?: number;
    };

    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json(
        {
          error: "Prompt is required."
        },
        { status: 400 }
      );
    }

    const result = await generateHordeRoughDraft(prompt, {
      height: body.height,
      model: body.model,
      width: body.width
    });

    return NextResponse.json({
      id: result.id,
      kudos: result.kudos,
      message: result.message,
      mode: "best-effort",
      provider: "AI Horde"
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to request an AI Horde rough draft."
      },
      { status: 500 }
    );
  }
}
