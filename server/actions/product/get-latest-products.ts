"use server";

import prisma from "@/server/db";

export const getLatestProducts = async () => {
  let formattedProducts = [];
  const products = await prisma.product.findMany({ take: 5 });

  if (!products) return [];

  for (let r of products) {
    const brand = await prisma.brand.findFirst({ where: { id: r.brandId } });
    if (!brand) return;
    formattedProducts.push({
      ...r,
      brandId: brand.slug,
    });
  }

  return formattedProducts;
};
