import Main from "@/components/structural/main";
import Nav from "@/components/structural/navigation/nav";
import { auth } from "@/server/auth";
import { HomeCarousel } from "./(home)/HomeCarousel";
import { Footer } from "@/components/structural/footer";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Nav />
      <Main>
        <div className="flex flex-col mt-14 items-center">
          <h1 className="text-5xl font-bold flex justify-center text-center leading-normal text-primary">
            Find the best sports deal
          </h1>
          <HomeCarousel className="mt-14" />
        </div>
      </Main>
      <Footer />
    </>
  );
}
