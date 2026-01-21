import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const courses = await prisma.course.findMany({
    where: { status: "ACTIVE" },
  });

  return NextResponse.json({ courses });
}
