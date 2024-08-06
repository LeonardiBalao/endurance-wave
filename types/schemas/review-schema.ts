import * as z from "zod";

export const reviewSchema = z.object({
  title: z.string().max(60),
  category: z.string(),
  subcategory: z.string(),
  keywords: z.string(),
  tags: z.string(),
  description: z.string().max(160),
  introduction: z.string().max(1000),
  comparative: z.string().max(1000),
  conclusion: z.string().max(1000),
});
