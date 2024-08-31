import ProductsCallout from "@/components/products/products-callout";
import ReviewsCallOut from "@/components/reviews/reviews-callout";
import Aside from "@/components/structural/aside/aside";
import Main from "@/components/structural/main";
import Nav from "@/components/structural/navigation/nav";
import { getLatestProducts } from "@/server/actions/product/get-latest-products";

export default async function NewsPage() {
  let products = await getLatestProducts();
  if (!products) return <div>alo</div>;
  return (
    <>
      <Nav />
      <div className="md:container flex md:my-10  gap-10">
        <Main className="w-full">
          <ProductsCallout products={products} />
        </Main>
        <Aside />
      </div>
    </>
  );
}
