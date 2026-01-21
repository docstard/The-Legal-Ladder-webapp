import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const user = await requireAuth();
  const { courseId } = await params;

  const enrollment = await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: courseId,
      },
    },
    update: {},
    create: {
      userId: user.id,
      courseId: courseId,
    },
  });

  return NextResponse.json({ enrollment });
}
