/** @format */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json().catch(() => ({}));
  const { status, read } = body as {
    status?: "NEW" | "REPLIED" | "ARCHIVED";
    read?: boolean;
  };

  const data: any = {};
    if (status) data.status = status;
    
  if (typeof read === "boolean") data.readAt = read ? new Date() : null;

  await prisma.submission.update({ where: { id: Number(params.id) }, data });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request, 
  { params }: { params: { id: string } }
) {
  try {
    await prisma.submission.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ ok: true });
  } catch (e) {

    console.log(e, "error");
    

    return NextResponse.json({
      status: 500,
      message: "Failed"
    })
  }
}
