import * as z from "zod";

export const reviewSchema = z.object({
  userId: z.string(),
  category: z.string(),
  subcategory: z.string(),
  productsId: z.string().array().nonempty(),
  introduction: z.string(),
  title: z.string().max(60),
  description: z.string().max(300),
  conclusion: z.string().max(300),
  metaDescription: z.string().max(160),
  keywords: z.string(),
  comparative: z.string().max(400),
  rating: z.number().int().lte(5).gte(1),
  tags: z.string(),
  likes: z.number().int(),
});
