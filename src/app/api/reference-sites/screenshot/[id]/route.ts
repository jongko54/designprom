import { NextResponse } from "next/server";

import { getReferenceSiteScreenshot } from "@/lib/reference-sites";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const screenshot = await getReferenceSiteScreenshot(id);

    return new NextResponse(new Uint8Array(screenshot.body), {
      headers: {
        "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
        "Content-Type": screenshot.contentType
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to capture the reference site."
      },
      { status: 404 }
    );
  }
}
