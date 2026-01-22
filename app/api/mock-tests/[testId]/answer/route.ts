import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/**
 * POST /api/mock-tests/[testId]/answer
 * Save answer for a question
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const user = await requireAuth();
    const { testId } = await params;
    const { questionId, selectedOption } = await req.json();

    // Get attempt
    const attempt = await prisma.attempt.findUnique({
      where: {
        userId_mockTestId: {
          userId: user.id,
          mockTestId: testId,
        },
      },
    });

    if (!attempt) {
      return NextResponse.json(
        { error: "No active attempt found" },
        { status: 404 }
      );
    }

    if (attempt.status !== "IN_PROGRESS") {
      return NextResponse.json(
        { error: "Test has already been submitted" },
        { status: 400 }
      );
    }

    // Upsert answer
    const answer = await prisma.attemptAnswer.upsert({
      where: {
        attemptId_questionId: {
          attemptId: attempt.id,
          questionId: questionId,
        },
      },
      update: {
        selectedOption: selectedOption,
      },
      create: {
        attemptId: attempt.id,
        questionId: questionId,
        selectedOption: selectedOption,
      },
    });

    // Calculate remaining time
    const mockTest = await prisma.mockTest.findUnique({
      where: { id: testId },
    });

    const elapsedMs = Date.now() - attempt.startedAt.getTime();
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    const totalSeconds = (mockTest?.duration || 0) * 60;
    const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);

    return NextResponse.json({
      answer,
      remainingSeconds,
    });
  } catch (error) {
    console.error("Error saving answer:", error);
    return NextResponse.json(
      { error: "Failed to save answer" },
      { status: 500 }
    );
  }
}
