import ProductElement from "@/components/products/product";
import { unhyfenize } from "@/lib/utils/utils";
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
  const product = await getSingleProduct(
    unhyfenize(params.brand),
    unhyfenize(params.name)
  );
  if (!product) return <div>deu merda</div>;
  return <ProductElement product={product} />;
}
