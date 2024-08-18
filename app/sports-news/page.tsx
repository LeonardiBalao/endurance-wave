import ReviewsCallOut from "@/components/reviews/reviews-callout";
import Aside from "@/components/structural/aside/aside";
import Main from "@/components/structural/main";
import Nav from "@/components/structural/navigation/nav";
import { getLatestReviews } from "@/server/actions/review/get-latest-reviews";
import prisma from "@/server/db";

export default async function NewsPage() {
  let reviews = await getLatestReviews();
  if (!reviews) return <div>alo</div>;
  return (
    <>
      <Nav />
      <div className="md:container flex md:my-10  gap-10">
        <Main className="w-full">
          <ReviewsCallOut reviews={reviews} />
        </Main>
        <Aside />
      </div>
    </>
  );
}
