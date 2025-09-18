/** @format */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const featured = searchParams.get("featured"); 
    const limitParam = searchParams.get("limit"); 
    const tags = searchParams.get("tags"); 
    const search = searchParams.get("search"); 
    const cursor = searchParams.get("cursor"); 

          const where: any = {};

    if (featured === "true") where.featured = true;
    else if (featured === "false") where.featured = false;

    if (tags) {
      where.tags = { has: tags };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { blurb: { contains: search, mode: "insensitive" } },
      ];
    }

    const limit = Math.min(
      Math.max(parseInt(limitParam || "20", 10) || 20, 1),
      50
    );

    const queryOptions: any = {
      where,
      // Use id DESC to make cursor by id deterministic
      orderBy: { id: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        blurb: true,
        href: true,
        imageUrl: true,
        tags: true,
        featured: true,
        createdAt: true,
        updatedAt: true,
      },
    };

    if (cursor) {
      const id = Number(cursor);
      if (!Number.isNaN(id)) {
        queryOptions.cursor = { id };
        queryOptions.skip = 1; // start AFTER the cursor row
      }
    }

    const items = await prisma.project.findMany(queryOptions);

    const nextCursor =
      items.length === limit ? String(items[items.length - 1].id) : null;

    // console.log(items);
    
    return NextResponse.json({
      success: true,
      data: items,
      count: items.length,
      nextCursor, 
    });
  } catch (e) {
    console.error("Error fetching projects:", e);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
