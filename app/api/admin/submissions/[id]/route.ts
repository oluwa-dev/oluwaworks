/** @format */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 
  const body = await req.json().catch(() => ({}));
  const { status, read } = body as {
    status?: "NEW" | "REPLIED" | "ARCHIVED";
    read?: boolean;
  };

  const data: any = {};
  if (status) data.status = status;

  if (typeof read === "boolean") data.readAt = read ? new Date() : null;

  await prisma.submission.update({ where: { id: Number(id) }, data });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Await the params Promise
    await prisma.submission.delete({ where: { id: Number(id) } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.log(e, "error");

    return NextResponse.json({
      status: 500,
      message: "Failed",
    });
  }
}
