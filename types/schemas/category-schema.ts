import * as z from "zod";

export const categorySchema = z.object({
  category: z.string().max(24),
});
