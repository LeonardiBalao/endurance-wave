import { cn } from "@/lib/utils";

import { Link, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface MainCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footerText?: string;
  className?: string;
  titleClassSize?: string;
}

export default function MainCard({
  title,
  description,
  children,
  footerText,
  className,
  titleClassSize,
}: MainCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={cn(
            "text-primary flex justify-between items-center",
            titleClassSize ? titleClassSize : "text-2xl"
          )}
        >
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={cn("", className)}>{children}</CardContent>
      {footerText && (
        <CardFooter className="flex justify-end text-xs">
          {footerText}
        </CardFooter>
      )}
    </Card>
  );
}
