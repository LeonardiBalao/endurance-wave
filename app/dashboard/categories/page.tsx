import MainCard from "@/components/structural/main-card";
import NewCategory from "../reviews/new-category";
import NewSubcategory from "../reviews/new-subcategory";
import NewBrand from "../products/new-brand";
import { getCategories } from "@/server/actions/category/get-categories";
import Main from "@/components/structural/main";

export default async function CategoriesAndBrand() {
  const categories = await getCategories();

  return (
    <Main>
      <MainCard
        title="Manage Categories and Brand"
        description="Add or remove categories"
        className="flex gap-4"
      >
        <div className="flex flex-col gap-4">
          <NewBrand />
          <NewCategory />
        </div>
        <NewSubcategory categories={categories} />
      </MainCard>
    </Main>
  );
}
