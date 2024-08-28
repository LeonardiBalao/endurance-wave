"use server";

import { generateSlug } from "@/lib/utils/utils";
import prisma from "@/server/db";

interface CreateBrandProps {
  brand: string;
}

export const createBrand = async ({ brand }: CreateBrandProps) => {
  const brandExists = await prisma.brand.findFirst({
    where: {
      name: brand,
    },
  });

  if (brandExists) return { error: `brand "${brand}" already exists.` };

  await prisma.brand.create({
    data: {
      name: brand,
      slug: generateSlug(brand),
    },
  });

  return { success: `Brand "${brand}" created.` };
};
