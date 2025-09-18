/** @format */
// app/api/admin/add-project/route.ts (CREATE)
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createProjectSchema } from "@/lib/validations/project";
import { v2 as cloudinary } from "cloudinary";
import { authHandler } from "@/lib/auth/authhandler";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

function coerceBoolean(v: FormDataEntryValue | null): boolean | undefined {
  if (v == null) return undefined;
  if (typeof v !== "string") return undefined;
  const s = v.toLowerCase();
  if (["true", "1", "on", "yes"].includes(s)) return true;
  if (["false", "0", "off", "no"].includes(s)) return false;
  return undefined;
}

function coerceTags(form: FormData): string[] | undefined {
  // If multiple inputs/selects named "tags"
  const multi = form
    .getAll("tags")
    .filter((x) => typeof x === "string") as string[];
  if (multi.length > 1) return multi.map((t) => t.trim()).filter(Boolean);

  // Otherwise accept CSV from a single input named "tags"
  const single = form.get("tags");
  if (typeof single === "string" && single.trim()) {
    return single
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return undefined; // absent
}

export async function POST(request: NextRequest) {

  const session = await getServerSession(authHandler)
  if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });


  }

  let imageUrl: string | undefined;

  const form = await request.formData();
  const title = String(form.get("title") || "").trim();
  const blurb = String(form.get("blurb") || "").trim();
  const href = String(form.get("href") || "").trim() || undefined;
  const featured = coerceBoolean(form.get("featured")); 
  const tags = coerceTags(form);

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
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploaded: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "projects",
              quality: "auto",
              fetch_format: "auto",
            },
            (error, result) => (error ? reject(error) : resolve(result))
          )
          .end(buffer);
      });

      imageUrl = uploaded?.secure_url || uploaded?.url;
      if (!imageUrl) {
        return NextResponse.json(
          { success: false, message: "Image upload failed: no URL returned" },
          { status: 502 }
        );
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return NextResponse.json(
        { success: false, message: "Image upload failed" },
        { status: 502 }
      );
    }
  }

  const parsed = createProjectSchema.safeParse({
    title,
    blurb,
    href,
    featured,
    tags,
    imageUrl,
  });

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({
      path: i.path.join("."),
      message: i.message,
    }));
    return NextResponse.json(
      { success: false, message: issues },
      { status: 400 }
    );
  }

   try {
    const created = await prisma.project.create({ data: parsed.data });
    return NextResponse.json(
      { success: true, id: created.id, message: "Project added successfully!" },
      { status: 201 }
    );
  } catch (e) {
    console.error("Prisma create project failed:", e);
    return NextResponse.json(
      { success: false, message: "Failed" },
      { status: 500 }
    );
  }
}
