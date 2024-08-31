import ProductElement from "@/components/products/product";
import Aside from "@/components/structural/aside/aside";
import Main from "@/components/structural/main";
import Nav from "@/components/structural/navigation/nav";
import { getProduct } from "@/server/actions/product/get-product";
import { getReview } from "@/server/actions/review/get-review";
import { redirect } from "next/navigation";

interface SingleReview {
  params: {
    brand: string;
    name: string;
  };
}

export default async function SingleProduct({ params }: SingleReview) {
  if (!params) return redirect("/");
  const product = await getProduct(params.brand, params.name);
  if (!product) return <div>deu merda</div>;
  return (
    <>
      <Nav />
      <Main className="container flex gap-4 py-4">
        <ProductElement product={product} />
        <Aside />
      </Main>
    </>
  );
}
