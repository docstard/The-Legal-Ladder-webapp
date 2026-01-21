import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncUser } from "@/lib/auth";

/**
 * GET /api/notes/[noteId]
 * Fetch a single note by ID
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ noteId: string }> }
) {
  try {
    const { noteId } = await params;

    const note = await prisma.note.findUnique({
      where: { id: noteId },
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

    if (!note) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      );
    }

    // If note is free, return it
    if (note.isFree) {
      return NextResponse.json({ note });
    }

    // If note is paid, check if user is enrolled in the course
    const user = await syncUser();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (note.courseId) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: note.courseId,
          },
        },
      });

      if (!enrollment) {
        return NextResponse.json(
          { error: "Enrollment required to access this note" },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({ note });
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    );
  }
}