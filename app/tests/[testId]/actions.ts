"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function startMockTest(testId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return prisma.attempt.create({
    data: {
      userId,
      mockTestId: testId,
      status: "IN_PROGRESS",
      startedAt: new Date(),
    },
  });
}
