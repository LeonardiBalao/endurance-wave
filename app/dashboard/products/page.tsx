import Main from "@/components/structural/main";
import Link from "next/link";
import ProductForm from "./product-form";
import { getCategories } from "@/server/actions/category/get-categories";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { getBrands } from "@/server/actions/category/get-brands";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user.id) return redirect("/");

  const categories = await getCategories();
  const brands = await getBrands();
  return (
    <>
      <Main className="bg-secondary flex flex-col gap-10">
        <ProductForm
          userId={session.user.id}
          categories={categories}
          brands={brands}
        />
      </Main>
    </>
  );
}
