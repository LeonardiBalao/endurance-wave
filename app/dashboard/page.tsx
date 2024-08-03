import SelectCategory from "./(categories)/categories";
import NewCategory from "./(categories)/new-category";
import { getCategories } from "@/server/actions/category/get-categories";

export default async function Dashboard() {
  const categories = await getCategories();

  return (
    <>
      <SelectCategory categories={categories} />
    </>
  );
}
