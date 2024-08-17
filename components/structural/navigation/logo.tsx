/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import HyperText from "@/components/magicui/hyper-text";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showSlogan?: boolean;
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

  return (
    <Link href="/" className={cn("", className)}>
      <Image
        src={srcImage}
        width={width}
        height={height}
        alt="logo"
        className="mx-auto"
        unoptimized
      />
      {showSlogan && (
        <>
          <span className="mx-auto font-extrabold text-primary">
            Endurance Wave
          </span>
          <span className="sr-only">Endurance Wave</span>
        </>
      )}
    </Link>
  );
}
