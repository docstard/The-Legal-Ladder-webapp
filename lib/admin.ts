import { prisma } from "@/lib/prisma";

export async function getAdminStats() {
  const [users, tests] = await Promise.all([
    prisma.user.count(),
    prisma.mockTest.count({ where: { status: "PUBLISHED" } }),
  ]);

  return {
    users,
    revenue: 845000, // connect Razorpay later
    tests,
    sessions: 24,
  };
}