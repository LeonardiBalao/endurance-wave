import Main from "@/components/structural/main";
import Nav from "@/components/structural/navigation/nav";
import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Nav />
      <Main>
        <div>
          <pre>{JSON.stringify(session)}</pre>
        </div>
      </Main>
    </>
  );
}
