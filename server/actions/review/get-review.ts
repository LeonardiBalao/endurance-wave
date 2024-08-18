"use server";

import prisma from "@/server/db";
import { Review } from "@prisma/client";

export const getReview = async (subcategory: string, title: string) => {
  if (!subcategory || !title) return;

  const subcategoryExists = await prisma.subcategory.findFirst({
    where: {
      name: {
        contains: subcategory,
        mode: "insensitive",
      },
    },
  });
  if (!subcategoryExists) return;

  const reviewExists = (await prisma.review.findFirst({
    where: {
      subcategoryId: subcategoryExists.id,
      title: {
        contains: title.split(" ").slice(0, 1).join(),
        mode: "insensitive",
      },
    },
  })) as Review;

  if (!reviewExists) return;

  return reviewExists;
};
