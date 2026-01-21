import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/exam-categories
 * Public endpoint to fetch all active exam categories
 */
export async function GET() {
  try {
    const categories = await prisma.examCategory.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { mockTests: true }
        }
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching exam categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch exam categories" },
      { status: 500 }
    );
  }
}