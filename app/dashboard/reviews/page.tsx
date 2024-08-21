import { getCategories } from "@/server/actions/category/get-categories";
import Main from "@/components/structural/main";
import ReviewForm from "./review-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import prisma from "@/server/db";

export default async function Dashboard() {
  const session = await auth();
  const categories = await getCategories();
  const products = await prisma.product.findMany();
  if (!session?.user.id) return redirect("/dashboard");

  return (
    <ReviewForm
      categories={categories}
      userId={session?.user.id}
      products={products}
    />
  );
}
