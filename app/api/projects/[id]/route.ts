/** @format */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const selectProject = {
  id: true,
  title: true,
  blurb: true,
  imageUrl: true,
  tags: true,
  featured: true,
  createdAt: true,
  updatedAt: true,
} as const;

const PatchSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  blurb: z.string().min(1).max(4000).optional(),
  imageUrl: z.string().url().or(z.literal("")).optional(),
  tags: z.array(z.string().min(1).max(40)).max(20).optional(),
  featured: z.boolean().optional(),
});

function bad(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return bad("Invalid id");

  const data = await prisma.project.findUnique({
    where: { id },
    select: selectProject,
  });

  if (!data) return bad("Project not found", 404);

  return NextResponse.json({ success: true, data });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return bad("Invalid id");

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return bad("Invalid JSON body");
  }

  const parsed = PatchSchema.safeParse(json);
  if (!parsed.success) {
    return bad(
      "Invalid fields: " +
        parsed.error.issues.map((i) => i.path.join(".")).join(", ")
    );
  }

  const body = parsed.data;

  const data: any = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.blurb !== undefined) data.blurb = body.blurb;
  if (body.featured !== undefined) data.featured = body.featured;
  if (body.tags !== undefined) data.tags = body.tags;
  if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl || null;

  try {
    const updated = await prisma.project.update({
      where: { id },
      data,
      select: selectProject,
    });

    // Optionally: revalidate public pages if you use ISR with tags

    return NextResponse.json({ success: true, data: updated });
  } catch (e: any) {
    if (e?.code === "P2025") return bad("Project not found", 404);
    console.error("PATCH /projects/:id error", e);
    return bad("Failed to update project", 500);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return bad("Invalid id");

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e?.code === "P2025") return bad("Project not found", 404);
    console.error("DELETE /projects/:id error", e);
    return bad("Failed to delete project", 500);
  }
}
