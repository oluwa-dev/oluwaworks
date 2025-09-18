/** @format */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authHandler } from "@/lib/auth/authhandler";

export async function GET(req: Request) {

  const session = await getServerSession(authHandler)
    if (!session) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  
    }
  
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status") || undefined;
    const query = url.searchParams.get("query") || "";
    const limit = Math.min(Number(url.searchParams.get("limit") || 20), 50);
    const cursor = url.searchParams.get("cursor");

    const where: any = {};
    const conditions: any[] = [];

    if (status) {
      conditions.push({ status });
    }

    if (query) {
      conditions.push({
        OR: [
          { email: { contains: query, mode: "insensitive" } },
          { name: { contains: query, mode: "insensitive" } },
          { company: { contains: query, mode: "insensitive" } },
          { message: { contains: query, mode: "insensitive" } },
        ],
      });
    }

    // Only add AND if we have conditions
    if (conditions.length > 0) {
      where.AND = conditions;
    }

    const items = await prisma.submission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: Number(cursor) } } : {}),
      select: {
        id: true,
        email: true,
        name: true,
        company: true,
        message: true,
        status: true,
        createdAt: true,
        readAt: true,
      },
    });

    const nextCursor =
      items.length === limit ? String(items[items.length - 1].id) : null;

    return NextResponse.json({ items, nextCursor });
  } catch (e) {
    console.error("Error fetching submissions:", e);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch submissions",
      },
      {
        status: 500,
      }
    );
  }
}
