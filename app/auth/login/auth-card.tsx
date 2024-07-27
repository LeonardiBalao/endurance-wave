"use client";
import { ReactNode } from "react";
import logo from "@/public/logo.svg";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Socials from "./socials";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/structural/navigation/logo";

interface CardProps {
  cardTitle: string;
  showSocials: boolean;
  description: string;
}

export default function AuthCard({
  cardTitle,
  showSocials,
  description,
}: CardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto my-auto">
      <CardHeader className="flex flex-col items-center gap-2">
        <Logo showSlogan className="" width={40} height={40} />
        <CardTitle className="text-2xl">{cardTitle}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Separator />
      </CardHeader>
      {showSocials && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
      <CardFooter>
        <span className="mx-auto text-xs font-extrabold">
          {new Date().getFullYear()}
        </span>
      </CardFooter>
    </Card>
  );
}
