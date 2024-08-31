"use server";

import prisma from "@/server/db";
import { Brand, Product } from "@prisma/client";

export const getProduct = async (brand: string, name: string) => {
  if (!brand || !name) return;

  const brandExist = await prisma.brand.findFirst({
    where: {
      slug: {
        equals: brand,
        mode: "insensitive",
      },
    },
  });

  console.log(brandExist);
  if (!brandExist) return;

  const product = await prisma.product.findFirst({
    where: {
      brandId: brandExist.id,
      slug: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (!product) return;
  return {
    ...product,
    brandId: brandExist.name,
    price: parseFloat(product.price.toString()).toFixed(2),
    rating: parseFloat(product.rating.toString()).toFixed(2),
  } as ProductWithPriceAsString;
};
