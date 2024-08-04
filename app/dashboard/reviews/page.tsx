import { getCategories } from "@/server/actions/category/get-categories";
import Main from "@/components/structural/main";
import NewCategory from "./new-subcategory";
import MainCard from "@/components/structural/main-card";
import { Label } from "@/components/ui/label";
import ReviewForm from "./review-form";

export default async function Dashboard() {
  const categories = await getCategories();

  return (
    <>
      <Main>
        <ReviewForm categories={categories} />
      </Main>
    </>
  );
}
