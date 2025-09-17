-- CreateTable
CREATE TABLE "public"."testimonial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "feedback" TEXT NOT NULL,
    "businessName" TEXT,

    CONSTRAINT "testimonial_pkey" PRIMARY KEY ("id")
);
