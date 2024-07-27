"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";

export default function Socials() {
  return (
    <Button
      variant={"outline"}
      className="w-full flex gap-4"
      onClick={() =>
        signIn("google", { redirect: true, callbackUrl: "/painel" })
      }
    >
      <Chrome size={20} />
      Entrar com Google
    </Button>
  );
}
