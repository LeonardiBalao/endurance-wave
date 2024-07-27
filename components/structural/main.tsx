import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
  className?: string;
}
export default function Main({ children, className }: MainProps) {
  return (
    <div className={cn("container py-4 md:py-10", className)}>{children}</div>
  );
}
