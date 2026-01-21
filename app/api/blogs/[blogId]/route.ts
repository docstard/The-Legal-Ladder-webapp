import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncUser } from "@/lib/auth";

/**
 * GET /api/blogs/[blogId]
 * Fetch a single blog by ID
 */
export async function GET(
  request: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { blogId } = params;

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    // If blog is free, return it
    if (blog.isFree) {
      return NextResponse.json({ blog });
    }

    // If blog is paid, check if user is enrolled in the course
    const user = await syncUser();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (blog.courseId) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: blog.courseId,
          },
        },
      });

      if (!enrollment) {
        return NextResponse.json(
          { error: "Enrollment required to access this blog" },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}