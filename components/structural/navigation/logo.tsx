/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import logoWhite from "@/public/logo-white.png";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showSlogan: boolean;
}

export default function Logo({
  className,
  width,
  height,
  showSlogan,
}: LogoProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  let srcImage = logo;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  switch (resolvedTheme) {
    case "light":
      srcImage = logo;
      break;
    case "dark":
      srcImage = logoWhite;
      break;
  }

  return (
    <Link href="/" className={cn("", className)}>
      <div className="flex gap-4">
        <Image
          src={srcImage}
          width={width}
          height={height}
          alt="logo"
          className="mx-auto"
          unoptimized
        />
      </div>
      {showSlogan && (
        <>
          <span className="mx-auto font-extrabold text-primary">
            LEILÕES.site
          </span>
          <span className="sr-only">leiloes.site</span>
        </>
      )}
    </Link>
  );
}
