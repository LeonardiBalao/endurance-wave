import LoginForm from "./login-form";
import Main from "@/components/structural/main";
import Nav from "@/components/structural/navigation/nav";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  return (
    <>
      <Nav />
      <Main className="flex flex-col justify-center items-center h-min-screen">
        <LoginForm />
      </Main>
    </>
  );
}
