import { NextResponse } from "next/server";

import {
  checkHordeRoughDraft,
  getHordeRoughDraftStatus
} from "@/lib/ai-horde";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const check = await checkHordeRoughDraft(id);

    if (!check.done) {
      return NextResponse.json({
        done: false,
        faulted: check.faulted,
        imageUrl: null,
        isPossible: check.is_possible,
        processing: check.processing,
        queuePosition: check.queue_position,
        waitTime: check.wait_time
      });
    }

    const status = await getHordeRoughDraftStatus(id);
    const firstGeneration = status.generations?.[0];

    return NextResponse.json({
      done: status.done,
      faulted: status.faulted,
      imageUrl: firstGeneration?.img ?? null,
      isPossible: status.is_possible,
      model: firstGeneration?.model ?? null,
      queuePosition: status.queue_position,
      seed: firstGeneration?.seed ?? null,
      state: firstGeneration?.state ?? null,
      waitTime: status.wait_time
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to retrieve the AI Horde rough draft."
      },
      { status: 500 }
    );
  }
}
