import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  await requireAdmin()
  const { testId } = await params;

  const test = await prisma.mockTest.findUnique({
    where: { id: testId },
  })

  return NextResponse.json(test)
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  await requireAdmin()
  const { testId } = await params;
  const body = await req.json()

  const updated = await prisma.mockTest.update({
    where: { id: testId },
    data: body,
  })

  return NextResponse.json(updated)
}