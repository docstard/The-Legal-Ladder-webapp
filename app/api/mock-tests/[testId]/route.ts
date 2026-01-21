import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser, hasMockTestAccess } from "@/lib/auth";
import { getAttemptStatus } from "@/lib/test-utils";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  const user = await getAuthenticatedUser();
  const { testId } = await params;

  const mockTest = await prisma.mockTest.findUnique({
    where: { id: testId },
    include: {
      examCategory: true,
      _count: { select: { questions: true } },
    },
  });

  if (!mockTest) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isUnlocked = user
    ? await hasMockTestAccess(user.id, testId)
    : mockTest.isFree;

  const attemptStatus = user
    ? await getAttemptStatus(user.id, testId)
    : "NOT_STARTED";

  return NextResponse.json({
    mockTest: {
      ...mockTest,
      isUnlocked,
      attemptStatus,
    },
  });
}
