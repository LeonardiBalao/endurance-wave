"use server";

import prisma from "@/server/db";
import { Product } from "@prisma/client";

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
  mainImageURL: string;
  mainImageALT: string;
  introductionImageURL: string;
  introductionImageALT: string;
  comparativeImageURL: string;
  comparativeImageALT: string;
  product: string;
  pArray: Product[];
}

export const createReview = async (review: ReviewProps) => {
  try {
    if (!review.pArray) return { error: "Missing Products" };
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
    if (
      !review.mainImageALT ||
      !review.mainImageURL ||
      !review.comparativeImageURL ||
      !review.comparativeImageALT ||
      !review.introductionImageURL ||
      !review.introductionImageALT
    )
      return { error: "Missing image property" };
    if (!review.keywords || !review.tags)
      return { error: "No keywords or tags" };

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
        comparativeImageALT: review.comparativeImageALT.replaceAll(" ", "-"),
        comparativeImageURL: review.comparativeImageURL,
        mainImageURL: review.mainImageURL,
        introductionImageALT: review.introductionImageALT.replaceAll(" ", "-"),
        introductionImageURL: review.introductionImageURL,
        mainImageALT: review.mainImageALT.replaceAll(" ", "-"),
        tags: review.tags.split(","),
        keywords: review.keywords.split(","),
        productsId: review.pArray.map((p) => p.id),
      },
    });
    return { success: `Review "${review.title}" created.` };
  } catch (err) {
    return { error: JSON.stringify(err) };
  }
};
