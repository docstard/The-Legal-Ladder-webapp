import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { UserRole } from "@prisma/client";


/**
 * Sync Clerk user → Prisma user
 * Safe to call multiple times
 */
export async function syncUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) return null;

  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
    },
    create: {
      clerkId: userId,
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      role: UserRole.STUDENT,
    },
  });

  return user;
}

export async function getAuthenticatedUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) return null;

  return prisma.user.upsert({
    where: { clerkId: userId },
    update: {
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
    },
    create: {
      clerkId: userId,
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      role: UserRole.STUDENT,
    },
  });
}

export async function requireAuth() {
  const user = await syncUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  return user;
}

export async function hasCourseAccess(userId: string, courseId: string) {
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) return false;
  if (course.isFree) return true;

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });

  return !!enrollment;
}

export async function hasMockTestAccess(userId: string, mockTestId: string) {
  const mockTest = await prisma.mockTest.findUnique({
    where: { id: mockTestId },
    include: { courses: true },
  });

  if (!mockTest) return false;
  if (mockTest.isFree) return true;

  for (const link of mockTest.courses) {
    if (await hasCourseAccess(userId, link.courseId)) {
      return true;
    }
  }

  return false;
}
