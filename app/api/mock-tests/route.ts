import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tests = await prisma.mockTest.findMany({
    where: { status: "PUBLISHED" },
    include: {
      examCategory: true,
      _count: { select: { questions: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ mockTests: tests });
}
