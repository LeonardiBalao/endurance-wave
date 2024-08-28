import ProductElement from "@/components/products/product";
import { getSingleProduct } from "@/server/actions/product/get-single-product";
import prisma from "@/server/db";
import { redirect } from "next/navigation";

interface SingleProductProps {
  params: {
    brand: string;
    name: string;
  };
}

export default async function SingleProduct({ params }: SingleProductProps) {
  if (!params) return redirect("/");
  return <div>deu merda</div>;
}
