import * as z from "zod";

export const reviewSchema = z.object({
  userId: z.string(),
  category: z.string(),
  subcategory: z.string(),
  productsId: z.string().array().nonempty(),
  introduction: z.string(),
  title: z.string().max(60),
  description: z.string().max(500),
  metaDescription: z.string().max(160),
  keywords: z.string().array().nonempty(),
  comparative: z.string().max(500),
  rating: z.number().int().lte(5).gte(1),
  tags: z.string().array().nonempty(),
  likes: z.number().int(),
});
