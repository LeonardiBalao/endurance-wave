"use server";

import prisma from "@/server/db";

export const getSubcategories = async (category: string) => {
  const categoryExist = await prisma.category.findFirst({
    where: {
      name: category,
    },
  });
  if (!categoryExist) return [];
  const subcategories = await prisma.subcategory.findMany({
    where: {
      categoryId: categoryExist.id,
    },
  });
  return !subcategories
    ? []
    : subcategories.sort((a, b) => a.name.localeCompare(b.name));
};
