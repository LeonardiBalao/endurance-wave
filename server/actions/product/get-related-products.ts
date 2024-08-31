"use server";

import prisma from "@/server/db";

export const getRelatedProducts = async (productsIds: string[]) => {
  const products = await prisma.product.findMany({
    where: { id: { in: productsIds } },
  });

  if (!products) return;

  const formattedProducts = products.map((p) => {
    return {
      ...p,
      price: parseFloat(p.price.toString()).toFixed(2),
      rating: parseFloat(p.rating.toString()).toFixed(1),
    } as ProductWithPriceAsString;
  });

  return formattedProducts;
};
