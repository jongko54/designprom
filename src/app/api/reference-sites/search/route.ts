import { NextRequest, NextResponse } from "next/server";

import { searchReferenceSites } from "@/lib/reference-sites";

export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 6;

type RateLimitEntry = {
  count: number;
  expiresAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __designpromReferenceRateLimit: Map<string, RateLimitEntry> | undefined;
}

function getRateLimitStore() {
  if (!globalThis.__designpromReferenceRateLimit) {
    globalThis.__designpromReferenceRateLimit = new Map();
  }

  return globalThis.__designpromReferenceRateLimit;
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
          error: "Reference search rate limit exceeded. Try again in a few minutes."
        },
        { status: 429 }
      );
    }

    const body = (await request.json()) as {
      prompt?: string;
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

    const result = await searchReferenceSites(prompt);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to search for reference websites."
      },
      { status: 500 }
    );
  }
}
