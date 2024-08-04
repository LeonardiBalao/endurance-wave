import Link from "next/link";
import { getCategories } from "@/server/actions/category/get-categories";
import Main from "@/components/structural/main";

export default async function Dashboard() {
  return (
    <>
      <Main>
        <Link href={"/dashboard/reviews"}>Reviews</Link>
      </Main>
    </>
  );
}
