import * as z from "zod";

export const productSchema = z.object({
  category: z.string(),
  subcategory: z.string(),
  name: z.string().array().nonempty(),
  description: z.string().max(160),
  keywords: z.string(),
  characteristics: z.string(),
  brand: z.string(),
  videoURL: z.string(),
  advantages: z.string(),
  disadvantages: z.string(),
  affiliateURL: z.string(),
  rating: z.number().int().lte(5).gte(1),
  tags: z.string(),
  price: z.number(),
  gender: z.string(),
});
