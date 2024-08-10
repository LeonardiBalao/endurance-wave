"use server";

import prisma from "@/server/db";

export const getBrands = async () => {
  const brands = await prisma.brand.findMany();
  return !brands ? [] : brands.sort((a, b) => a.name.localeCompare(b.name));
};
