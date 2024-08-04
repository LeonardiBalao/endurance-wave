"use server";

import prisma from "@/server/db";

export const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return !categories
    ? []
    : categories.sort((a, b) => a.name.localeCompare(b.name));
};
