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
      name: category,
    },
  });
  if (!categoryExists) return;

  const subcategoryExists = await prisma.subcategory.findFirst({
    where: {
      name: subcategory,
    },
  });
  if (!subcategoryExists) return;

  const reviewExists = (await prisma.review.findFirst({
    where: {
      categoryId: categoryExists.id,
      subcategoryId: subcategoryExists.id,
      title: {
        equals: title,
        mode: "insensitive",
      },
    },
  })) as Review;

  if (!reviewExists) return;

  return reviewExists;
};
