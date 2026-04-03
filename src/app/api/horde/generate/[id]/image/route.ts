import { NextResponse } from "next/server";

import { getHordeRoughDraftStatus } from "@/lib/ai-horde";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const status = await getHordeRoughDraftStatus(id);
    const firstGeneration = status.generations?.[0];
    const imageUrl = firstGeneration?.img;

    if (!status.done || !imageUrl) {
      return NextResponse.json(
        {
          error: "Image is not ready yet."
        },
        { status: 404 }
      );
    }

    const imageResponse = await fetch(imageUrl, {
      cache: "no-store"
    });

    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch generated image: ${imageResponse.status}`);
    }

    const buffer = new Uint8Array(await imageResponse.arrayBuffer());
    const contentType = imageResponse.headers.get("content-type") ?? "image/png";
    const extension = contentType.includes("jpeg") ? "jpg" : "png";

    return new NextResponse(buffer, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition": `attachment; filename=\"designprom-${id}.${extension}\"`,
        "Content-Type": contentType
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to download the generated image."
      },
      { status: 500 }
    );
  }
}
