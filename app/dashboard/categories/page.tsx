import NewCategory from "../reviews/new-category";
import NewSubcategory from "../reviews/new-subcategory";
import NewBrand from "../products/new-brand";
import { getCategories } from "@/server/actions/category/get-categories";
import Main from "@/components/structural/main";

export default async function CategoriesAndBrand() {
  const categories = await getCategories();

  return (
    <Main className="container py-4 flex flex-col gap-4">
      <NewBrand />
      <NewCategory />
      <NewSubcategory categories={categories} />
    </Main>
  );
}
