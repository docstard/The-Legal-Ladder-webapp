import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, hasMockTestAccess } from "@/lib/auth";
import { AttemptStatus } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  const user = await requireAuth();
  const { testId } = await params;

  if (!(await hasMockTestAccess(user.id, testId))) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const existing = await prisma.attempt.findUnique({
    where: { userId_mockTestId: { userId: user.id, mockTestId: testId } },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Attempt already exists" },
      { status: 400 }
    );
  }

  const attempt = await prisma.attempt.create({
    data: {
      userId: user.id,
      mockTestId: testId,
      status: AttemptStatus.IN_PROGRESS,
      startedAt: new Date(),
    },
  });

  return NextResponse.json({ attempt }, { status: 201 });
}
