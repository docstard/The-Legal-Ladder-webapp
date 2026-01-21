"use server";

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { AttemptStatus } from "@prisma/client";

export async function startMockTest(testId: string) {
  const { userId } = auth();
  console.log("USER ID IN ACTION:", userId);
  if (!userId) throw new Error("Unauthorized");

  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");

  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: {
      clerkId: userId,
      email: clerkUser.emailAddresses[0].emailAddress,
    },
  });

  const mockTest = await prisma.mockTest.findUnique({
    where: { id: testId },
  });

  if (!mockTest) throw new Error("Test not found");

  return prisma.attempt.create({
    data: {
      userId: user.id,
      mockTestId: testId,
      status: AttemptStatus.IN_PROGRESS,
      startedAt: new Date(),
    },
  });
}
