"use server";

import prisma from "@/server/db";

interface CreateSubcategoryProps {
  category: string;
  subcategory: string;
}

export const createsubCategory = async ({
  category,
  subcategory,
}: CreateSubcategoryProps) => {
  const categoryExists = await prisma.category.findFirst({
    where: {
      name: category,
    },
  });

  if (!categoryExists) return { error: `Category does not exists.` };
  const subcategoryExists = await prisma.subcategory.findFirst({
    where: {
      categoryId: categoryExists.id,
      name: subcategory,
    },
  });

  if (subcategoryExists)
    return { error: `Subcategory "${subcategory}" already exists.` };

  await prisma.subcategory.create({
    data: {
      categoryId: categoryExists.id,
      name: subcategory,
    },
  });

  return { success: `Subcategory "${subcategory}" created.` };
};
