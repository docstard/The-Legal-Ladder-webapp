import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/notes
 * Fetch notes (free or all based on user enrollment)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isFreeParam = searchParams.get("isFree");

    const where: any = {};

    if (isFreeParam !== null) {
      where.isFree = isFreeParam === "true";
    }

    const notes = await prisma.note.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}