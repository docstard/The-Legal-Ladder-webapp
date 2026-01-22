import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/**
 * GET /api/mock-tests/[testId]/state
 * Get current test state with questions and attempt
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const user = await requireAuth();
    const { testId } = await params;

    // Get or create attempt
    let attempt = await prisma.attempt.findUnique({
      where: {
        userId_mockTestId: {
          userId: user.id,
          mockTestId: testId,
        },
      },
      include: {
        answers: true,
      },
    });

    // If no attempt exists, create one
    if (!attempt) {
      attempt = await prisma.attempt.create({
        data: {
          userId: user.id,
          mockTestId: testId,
          status: "IN_PROGRESS",
          startedAt: new Date(),
        },
        include: {
          answers: true,
        },
      });
    }

    // Get mock test details
    const mockTest = await prisma.mockTest.findUnique({
      where: { id: testId },
      include: {
        examCategory: true,
      },
    });

    if (!mockTest) {
      return NextResponse.json(
        { error: "Mock test not found" },
        { status: 404 }
      );
    }

    // Get questions
    const questions = await prisma.question.findMany({
      where: { mockTestId: testId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({
      attempt,
      mockTest,
      questions,
    });
  } catch (error) {
    console.error("Error getting test state:", error);
    return NextResponse.json(
      { error: "Failed to get test state" },
      { status: 500 }
    );
  }
}
