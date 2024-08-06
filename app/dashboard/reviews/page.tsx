import { getCategories } from "@/server/actions/category/get-categories";
import Main from "@/components/structural/main";
import ReviewForm from "./review-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  const categories = await getCategories();
  if (!session?.user.id) return redirect("/dashboard");

  return (
    <>
      <Main>
        <ReviewForm categories={categories} userId={session?.user.id} />
      </Main>
    </>
  );
}
