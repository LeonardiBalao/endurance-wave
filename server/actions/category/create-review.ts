"use server";

import prisma from "@/server/db";

interface ReviewProps {
  userId: string;
  title: string;
  category: string;
  subcategory: string;
  keywords: string;
  tags: string;
  description: string;
  introduction: string;
  comparative: string;
  conclusion: string;
  base64: string[];
  rating: number;
}

export const createReview = async (review: ReviewProps) => {
  if (!review.userId) return { error: "No user ID" };
  if (!review.category || !review.subcategory)
    return { error: "No category and subcategory" };
  if (
    !review.comparative ||
    !review.introduction ||
    !review.conclusion ||
    !review.title
  )
    return { error: "No main text or title." };
  if (!review.keywords || !review.tags) return { error: "No keywords or tags" };
  if (!review.base64) return { error: "No images" };
  if (!review.rating) return { error: "Add rating" };

  const category = await prisma.category.findFirst({
    where: {
      name: review.category,
    },
  });

  if (!category) return { error: "No category" };

  const subcategory = await prisma.subcategory.findFirst({
    where: {
      categoryId: category.id,
      name: review.subcategory,
    },
  });

  if (!subcategory) return { error: "No subcategory" };

  await prisma.review.create({
    data: {
      userId: review.userId,
      title: review.title,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      description: review.description,
      introduction: review.introduction,
      comparative: review.comparative,
      conclusion: review.conclusion,
      rating: review.rating,
      base64Images: review.base64,
    },
  });

  return { success: `Review "${review.title}" created.` };
};
