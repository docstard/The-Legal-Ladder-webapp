import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/blogs
 * Fetch blogs (free or all based on user enrollment)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isFreeParam = searchParams.get("isFree");

    const where: any = { status: "PUBLISHED" };

    if (isFreeParam !== null) {
      where.isFree = isFreeParam === "true";
    }

    const blogs = await prisma.blog.findMany({
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

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}