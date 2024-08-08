"use server";

import prisma from "@/server/db";

export const getMenu = async () => {
  try {
    const fetchedCategories = await prisma.category.findMany({
      include: { subcategories: true },
    });
    return fetchedCategories;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
