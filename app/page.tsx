import Main from "@/components/structural/main";
import prisma from "@/server/db";
import ReviewElement from "@/components/posts/review";
import Nav from "@/components/structural/navigation/nav";
import NavMenu from "@/components/structural/navigation/nav-menu";

export default async function Dashboard() {
  const reviews = await prisma.review.findMany();

  return (
    <>
      <Nav />
      <Main className="bg-secondary flex flex-col gap-10">
        {reviews.map((r, i) => (
          <ReviewElement key={i} review={r} />
        ))}
      </Main>
    </>
  );
}
