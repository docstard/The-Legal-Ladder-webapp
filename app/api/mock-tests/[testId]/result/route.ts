import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/**
 * GET /api/mock-tests/[testId]/result
 * Get test results
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const user = await requireAuth();
    const { testId } = await params;

    // Get attempt with answers
    const attempt = await prisma.attempt.findUnique({
      where: {
        userId_mockTestId: {
          userId: user.id,
          mockTestId: testId,
        },
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
        mockTest: {
          include: {
            examCategory: true,
          },
        },
      },
    });

    if (!attempt) {
      return NextResponse.json(
        { error: "No attempt found" },
        { status: 404 }
      );
    }

    if (attempt.status !== "SUBMITTED") {
      return NextResponse.json(
        { error: "Test not yet submitted" },
        { status: 400 }
      );
    }

    // Get result
    let result = await prisma.result.findUnique({
      where: { attemptId: attempt.id },
    });

    // If result doesn't exist, calculate it
    if (!result) {
      const questions = await prisma.question.findMany({
        where: { mockTestId: testId },
      });

      let correct = 0;
      let incorrect = 0;
      let unattempted = 0;
      let marksObtained = 0;

      for (const question of questions) {
        const answer = attempt.answers.find(
          (a) => a.questionId === question.id
        );

        if (!answer || answer.selectedOption === null) {
          unattempted++;
        } else if (answer.selectedOption === question.correctOption) {
          correct++;
          marksObtained += Number(question.marks);
        } else {
          incorrect++;
          marksObtained -= Number(question.negativeMarks);
        }
      }

      const percentage = (marksObtained / Number(attempt.mockTest.totalMarks)) * 100;

      result = await prisma.result.create({
        data: {
          attemptId: attempt.id,
          userId: user.id,
          totalQuestions: questions.length,
          answered: correct + incorrect,
          correct,
          incorrect,
          unattempted,
          marksObtained,
          totalMarks: Number(attempt.mockTest.totalMarks),
          percentage,
          rank: 1, // TODO: Calculate actual rank
          percentile: 100, // TODO: Calculate actual percentile
        },
      });
    }

    // Get all questions with correct answers
    const questions = await prisma.question.findMany({
      where: { mockTestId: testId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({
      attempt,
      result,
      questions,
    });
  } catch (error) {
    console.error("Error getting result:", error);
    return NextResponse.json(
      { error: "Failed to get result" },
      { status: 500 }
    );
  }
}
