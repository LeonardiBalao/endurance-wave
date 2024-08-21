import Main from "@/components/structural/main";
import Link from "next/link";
import ProductForm from "./product-form";
import { getCategories } from "@/server/actions/category/get-categories";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { getBrands } from "@/server/actions/category/get-brands";
import SecondaryCard from "@/components/structural/secondary-card";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user.id) return redirect("/");

  const categories = await getCategories();
  const brands = await getBrands();
  return (
    <>
      <Main className="container py-4">
        <SecondaryCard title="Add Product">
          <ProductForm
            userId={session.user.id}
            categories={categories}
            brands={brands}
          />
        </SecondaryCard>
      </Main>
    </>
  );
}
