import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package2, Search } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";

export default function DashboardNav() {
  return (
    <header className="sticky top-0 flex h-28 items-center gap-4 border-b bg-background px-4 md:px-6 z-20">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="w-[100px]">
          <Logo
            showSlogan={false}
            width={100}
            height={100}
            className="flex justify-center"
          />
          <span className="sr-only">Endurance Wave</span>
        </div>
        <Link
          href="/dashboard"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/reviews"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Reviews
        </Link>
        <Link
          href="/dashboard/products"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Products
        </Link>
        <Link
          href="/dashboard/categories"
          className="text-muted-foreground hover:text-foreground"
        >
          Categories/Brand
        </Link>
        <Link
          href="/dashboard/analytics"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Analytics
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Endurance Wave</span>
            </Link>
            <Link href="#" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="/dashboard/reviews"
              className="text-muted-foreground hover:text-foreground"
            >
              Reviews
            </Link>
            <Link
              href="/dashboard/products"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </Link>
            <Link
              href="/dashboard/categories"
              className="text-muted-foreground hover:text-foreground"
            >
              Categories and Brands
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
