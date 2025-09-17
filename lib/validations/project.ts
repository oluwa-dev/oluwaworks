/** @format */

import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .trim(),

  blurb: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters")
    .trim(),

  tags: z
    .array(z.string().trim())
    .default([])
    .refine((t) => t.length <= 10, "Maximum 10 technologies allowed"),

  href: z.string().url("Invalid live URL").optional().or(z.literal("")),

  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),

  featured: z.boolean().default(false),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

export const projectQuerySchema = z.object({
  featured: z
    .string()
    .optional()
    .transform((val) => val === "true"), // Convert string to boolean
  limit: z
    .string()
    .transform((val) => parseInt(val))
    .optional(),
  tags: z.string().optional(),
  search: z.string().optional(),
});
