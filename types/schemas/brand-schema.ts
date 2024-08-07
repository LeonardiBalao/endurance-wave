import * as z from "zod";

export const brandSchema = z.object({
  brand: z.string().max(24),
});
