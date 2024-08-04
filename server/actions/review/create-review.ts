"use server";

import { Prisma } from "@prisma/client";

interface CreateReviewProps {
  review: Prisma.ReviewUncheckedCreateInput;
}

export const createReview = async ({ review }: CreateReviewProps) => {
  try {
  } catch (err) {}
};
