/** @format */

import { z } from "zod";

export const feedbackSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(80, "Name too long"),
    businessName: z.string().trim().max(120).optional(),
    role: z.string().trim().max(100),
    imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")), 
    feedback: z
      .string()
      .trim()
      .min(1, "Please write a few words")
      .max(2000, "Feedback is too long"),
    website: z.string().max(0).optional(),
  })
  .strict(); 

export type FeedbackInput = z.infer<typeof feedbackSchema>;
