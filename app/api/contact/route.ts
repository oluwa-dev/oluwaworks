/** @format */

import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);

    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payload",
        },
        {
          status: 400,
        }
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ sucess: true }, { status: 200 });
    }

    const c = await prisma.submission.create({
      data: parsed.data,
    });
    return NextResponse.json({
      success: true,
      id: c.id,
    });
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}
