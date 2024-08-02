import * as z from "zod";

export const categorySchema = z.object({
  category: z.string().min(3).max(24),
});
