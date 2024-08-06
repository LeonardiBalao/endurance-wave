import Main from "@/components/structural/main";
import Link from "next/link";

export default async function Dashboard() {
  return (
    <>
      <Main className="bg-secondary flex flex-col gap-10">
        <Link href={"/"}>Want to see the posts? Click here</Link>
      </Main>
    </>
  );
}
