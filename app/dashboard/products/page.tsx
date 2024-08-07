import Main from "@/components/structural/main";
import Link from "next/link";
import ProductForm from "./product-form";
import { getCategories } from "@/server/actions/category/get-categories";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  const categories = await getCategories();
  if (!session?.user.id) return redirect("/");
  return (
    <>
      <Main className="bg-secondary flex flex-col gap-10">
        {session.user.id}
        <ProductForm userId={session.user.id} categories={categories} />
      </Main>
    </>
  );
}
