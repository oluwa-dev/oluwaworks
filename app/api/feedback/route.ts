/** @format */
import { prisma } from "@/lib/prisma";
import { feedbackSchema } from "@/lib/validations/feedbacks";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs"; 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});


// To add a feedback
export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json(
      { success: false, message: "Invalid form data" },
      { status: 400 }
    );
  }

  const name = String(form.get("name") || "").trim();
  const businessName =
    String(form.get("businessName") || "").trim() || undefined;
  const role = String(form.get("role") || "").trim() || undefined;
  const feedback = String(form.get("feedback") || "").trim();
  const website = String(form.get("website") || "");

  if (website) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  let imageUrl: string | undefined;
  const file = form.get("image") as File | null;

  if (file && file.size > 0) {
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Only image files are allowed" },
        { status: 400 }
      );
    }
    
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Image too large (max 5MB)" },
        { status: 400 }
      );
    }

    try {
      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResponse = (await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "testimonials", // Optional: organize uploads in folders
              quality: "auto", // Automatic quality optimization
              fetch_format: "auto", // Automatic format optimization
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      })) as any;

      imageUrl = uploadResponse.secure_url;

      // console.log(imageUrl);
      
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return NextResponse.json(
        { success: false, message: "Image upload failed" },
        { status: 502 }
      );
    }
  }



  const parsed = feedbackSchema.safeParse({
    name,
    businessName,
    role,
    feedback,
    imageUrl,
    website,
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 }
    );
  }

  const fb = await prisma.testimonial.create({ data: parsed.data });

  return NextResponse.json(
    {
      success: true,
      createdAt: fb.createdAt,
      message: "Thank you for leaving a feedback!",
    },
    { status: 201 }
  );
}

// GET /api/feedback?limit=20&cursor=123&search=foo
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || "20", 10) || 20, 1),
      50
    );
    const cursor = searchParams.get("cursor"); // string id of last seen row
    const search = searchParams.get("search") || "";

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { businessName: { contains: search, mode: "insensitive" } },
        { feedback: { contains: search, mode: "insensitive" } },
        { role: { contains: search, mode: "insensitive" } },
      ].filter(Boolean);
    }

    const query: any = {
      where,
      orderBy: { id: "desc" },
      take: limit,
      select: {
        id: true,
        name: true,
        businessName: true,
        role: true,
        feedback: true,
        createdAt: true,
        imageUrl: true,
      },
    };

    if (cursor) {
      const id = Number(cursor);
      if (!Number.isNaN(id)) {
        query.cursor = { id };
        query.skip = 1; // start AFTER the cursor row
      }
    }

    const feedbacks = await prisma.testimonial.findMany(query);
    const nextCursor =
      feedbacks.length === limit
        ? String(feedbacks[feedbacks.length - 1].id)
        : null;

    return NextResponse.json({
      success: true,
      data: feedbacks,
      count: feedbacks.length,
      nextCursor,
    });
  } catch (e) {
    console.error("Fetch testimonials failed:", e);
    return NextResponse.json(
      { success: false, message: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
