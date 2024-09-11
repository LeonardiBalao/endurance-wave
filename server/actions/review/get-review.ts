"use server";

import prisma from "@/server/db";
import { Review } from "@prisma/client";

export const getReview = async (
  category: string,
  subcategory: string,
  title: string
) => {
  if (!category || !subcategory || !title) return;
  const categoryExists = await prisma.category.findFirst({
    where: {
      slug: category,
    },
  });
  if (!categoryExists) return;
  const subcategoryExists = await prisma.subcategory.findFirst({
    where: {
      slug: subcategory,
    },
  });
  if (!subcategoryExists) return;

  const reviewExists = (await prisma.review.findFirst({
    where: {
      categoryId: categoryExists.id,
      subcategoryId: subcategoryExists.id,
      slug: title,
    },
  })) as Review;

  if (!reviewExists) return;

  return reviewExists;
};
