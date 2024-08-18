import ReviewElement from "@/components/reviews/review";
import Aside from "@/components/structural/aside/aside";
import Main from "@/components/structural/main";
import Nav from "@/components/structural/navigation/nav";
import { unhyfenize } from "@/lib/utils/utils";
import { getReview } from "@/server/actions/review/get-review";
import { redirect } from "next/navigation";

interface SingleReview {
  params: {
    subcategory: string;
    title: string;
  };
}

export default async function SingleReview({ params }: SingleReview) {
  if (!params) return redirect("/");
  const review = await getReview(
    unhyfenize(params.subcategory),
    unhyfenize(params.title)
  );
  if (!review) return <div>deu merda</div>;
  return (
    <>
      <Nav />
      <Main className="container flex gap-4 py-4">
        <ReviewElement review={review} />
        <Aside />
      </Main>
    </>
  );
}
