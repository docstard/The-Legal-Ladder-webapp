import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET(
  req: any,
  { params }: any
) {
  await requireAdmin()

  const test = await prisma.mockTest.findUnique({
    where: { id: params.testId },
  })

  return NextResponse.json(test)
}

export async function PUT(
  req: { json: () => any },
  { params }: any
) {
  await requireAdmin()

  const body = await req.json()

  const updated = await prisma.mockTest.update({
    where: { id: params.testId },
    data: body,
  })

  return NextResponse.json(updated)
}