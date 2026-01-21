import { prisma } from "./prisma";

export async function getAttemptStatus(userId: string, testId: string) {
  const attempt = await prisma.attempt.findUnique({
    where: {
      userId_mockTestId: {
        userId,
        mockTestId: testId,
      },
    },
  });

  return attempt?.status ?? "NOT_STARTED";
}
