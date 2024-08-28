import * as z from "zod";

export const productSchema = z.object({
  mainImageURL: z.string(),
  mainImageALT: z.string(),
  name: z.string().max(60),
  brand: z.string(),
  advantages: z.string().array(),
  disadvantages: z.string().array(),
  affiliateURL: z.string().array(),
  price: z.string(),
  about: z.string().max(5000),
  gender: z.string(),
  keywords: z.string(),
  tags: z.string(),
  description: z.string().max(160),
});
