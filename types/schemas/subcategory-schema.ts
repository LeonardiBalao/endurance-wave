import * as z from "zod";

export const subcategorySchema = z.object({
  category: z.string(),
  subcategory: z.string(),
  description: z.string().min(5).max(200),
});
