/** @format */

import z from "zod";

export const contactSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(80).optional(),
  company: z.string().max(120).optional(),
  service: z.string().max(40).optional(),
  message: z.string().min(10).max(4000),
  website: z.string().max(0).optional(),
});
