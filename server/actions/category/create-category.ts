"use server";

import { generateSlug } from "@/lib/utils/utils";
import prisma from "@/server/db";

interface CreateCategoryProps {
  category: string;
}

export const createCategory = async ({ category }: CreateCategoryProps) => {
  const categoryExists = await prisma.category.findFirst({
    where: {
      name: category,
    },
  });

  if (categoryExists)
    return { error: `Category "${category}" already exists.` };

  await prisma.category.create({
    data: {
      name: category,
      slug: generateSlug(category),
    },
  });

  return { success: `Category "${category}" created.` };
};
