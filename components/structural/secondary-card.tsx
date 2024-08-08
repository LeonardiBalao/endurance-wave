import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ReactNode } from "react";

interface MainCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  titleClassSize?: string;
}

export default function SecondaryCard({
  title,
  children,
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
      </CardHeader>
      <CardContent className={cn("", className)}>{children}</CardContent>
    </Card>
  );
}
