import * as z from "zod";

export const reviewSchema = z.object({
  mainImageURL: z.string(),
  mainImageALT: z.string(),
  title: z.string().max(60),
  category: z.string(),
  subcategory: z.string(),
  keywords: z.string(),
  tags: z.string(),
  description: z.string().max(160),
  introduction: z.string().max(5000),
  introductionImageURL: z.string(),
  introductionImageALT: z.string(),
  comparative: z.string().max(5000),
  comparativeImageURL: z.string(),
  comparativeImageALT: z.string(),
  conclusion: z.string().max(5000),
});
