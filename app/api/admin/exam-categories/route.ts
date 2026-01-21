import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await requireAdmin();
  const categories = await prisma.examCategory.findMany();
  return NextResponse.json({ categories });
}

export async function POST(req: Request) {
  await requireAdmin();
  const body = await req.json();

  const category = await prisma.examCategory.create({
    data: {
      name: body.name,
      type: body.type,
      description: body.description,
    },
  });

  return NextResponse.json({ category }, { status: 201 });
}
