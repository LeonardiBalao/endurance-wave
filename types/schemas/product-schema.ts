import * as z from "zod";

export const productSchema = z.object({
  mainImageURL: z.string(),
  mainImageALT: z.string(),
  secondaryImageURL: z.string(),
  secondaryImageALT: z.string(),
  characteristics: z.string(),
  name: z.string().max(60),
  brand: z.string(),
  videoURL: z.string(),
  advantages: z.string(),
  disadvantages: z.string(),
  affiliateURL: z.string(),
  category: z.string(),
  price: z.number(),
  about: z.string().max(5000),
  subcategory: z.string(),
  gender: z.string(),
  keywords: z.string(),
  tags: z.string(),
  description: z.string().max(160),
});
