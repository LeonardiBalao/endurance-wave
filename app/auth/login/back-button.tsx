"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
  message: string;
}

export default function BackButton({ href, label, message }: BackButtonProps) {
  return (
    <div className="flex items-center w-full justify-center">
      <span className="text-sm">{message}</span>
      <Button variant={"link"}>
        <Link
          aria-label={label}
          href={href}
          className="font-medium flex gap-4 items-center"
        >
          {label}
        </Link>
      </Button>
    </div>
  );
}
