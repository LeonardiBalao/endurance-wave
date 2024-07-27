import PropertyFilter from "@/app/painel/imoveis/property-filter";
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
  buttonHref: string;
  buttonText: string;
  description: string;
  children: ReactNode;
  showFooter?: boolean;
  footerText?: string;
  className?: string;
}

export default function MainCard({
  title,
  buttonHref,
  buttonText,
  description,
  children,
  showFooter,
  footerText,
  className,
}: MainCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex justify-between items-center">
          {title}
          {buttonText && buttonHref && (
            <Button
              asChild
              size="sm"
              className="ml-auto gap-1"
              variant={"link"}
            >
              <Link href={buttonHref}>
                {buttonText}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={cn("", className)}>{children}</CardContent>
      {showFooter && (
        <CardFooter className="flex justify-end text-xs">
          <span className="font-bold mx-1 font-sm">Rodapé</span>
          imóveis.
        </CardFooter>
      )}
    </Card>
  );
}
