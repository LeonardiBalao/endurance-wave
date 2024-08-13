"use server";

import prisma from "@/server/db";
import { Brand, Product } from "@prisma/client";

export const getSingleProduct = async (brand: string, name: string) => {
  if (!brand || !name) return;

  const brandExist = (await prisma.brand.findFirst({
    where: {
      name: {
        equals: brand,
        mode: "insensitive",
      },
    },
  })) as Brand;

  console.log(brandExist);
  if (!brandExist) return;

  const product = (await prisma.product.findFirst({
    where: {
      brandId: brandExist.id,
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  })) as Product;

  if (!product) return;
  return { ...product, brand: brand };
};
