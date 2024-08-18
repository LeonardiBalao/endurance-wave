"use server";

import prisma from "@/server/db";
import { Review } from "@prisma/client";

export const getLatestReviews = async () => {
  let formattedReviews = [];
  const reviews = await prisma.review.findMany({ take: 5 });

  if (!reviews) return [];

  for (let r of reviews) {
    const category = await prisma.category.findFirst({
      where: { id: r.categoryId },
    });
    if (!category) return;
    const subcategory = await prisma.subcategory.findFirst({
      where: { categoryId: r.categoryId, id: r.subcategoryId },
    });
    if (!subcategory) return;
    formattedReviews.push({
      ...r,
      categoryId: category.name,
      subcategoryId: subcategory.name,
    });
  }

  return formattedReviews;
};
