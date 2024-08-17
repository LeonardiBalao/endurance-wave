import ProductElement from "@/components/products/product";
import ReviewElement from "@/components/reviews/review";
import { unhyfenize } from "@/lib/utils/utils";
import { getSingleProduct } from "@/server/actions/product/get-single-product";
import { getReview } from "@/server/actions/review/get-review";
import prisma from "@/server/db";
import { redirect } from "next/navigation";

interface SingleProductProps {
  params: {
    category: string;
    subcategory: string;
    title: string;
  };
}

export default async function SingleReview({ params }: SingleProductProps) {
  const review = await getReview(
    unhyfenize(params.category),
    unhyfenize(params.subcategory),
    unhyfenize(params.title)
  );
  if (!review) return <div>deu merda</div>;
  return <ReviewElement review={review} />;
}
