import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const user = await requireAuth();

  const enrollment = await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: params.courseId,
      },
    },
    update: {},
    create: {
      userId: user.id,
      courseId: params.courseId,
    },
  });

  return NextResponse.json({ enrollment });
}
