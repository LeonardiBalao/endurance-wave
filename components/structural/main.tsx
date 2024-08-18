import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
  className?: string;
}
export default function Main({ children, className }: MainProps) {
  return <main className={cn("", className)}>{children}</main>;
}
