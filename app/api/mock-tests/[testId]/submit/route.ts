import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { AttemptStatus } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  const user = await requireAuth();
  const { testId } = await params;

  const attempt = await prisma.attempt.findUnique({
    where: { userId_mockTestId: { userId: user.id, mockTestId: testId } },
    include: { answers: { include: { question: true } } },
  });

  if (!attempt) {
    return NextResponse.json({ error: "No attempt" }, { status: 400 });
  }

  let score = 0;
  for (const ans of attempt.answers) {
    if (ans.selectedOption === ans.question.correctOption) {
      score += Number(ans.question.marks);
    } else if (ans.selectedOption !== null) {
      score -= Number(ans.question.negativeMarks);
    }
  }

  await prisma.attempt.update({
    where: { id: attempt.id },
    data: {
      status: AttemptStatus.SUBMITTED,
      submittedAt: new Date(),
    },
  });

  return NextResponse.json({ score });
}
