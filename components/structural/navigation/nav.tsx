import { auth } from "@/server/auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu, LogOut, PanelTop, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemeButtons from "./theme-buttons";
import Logo from "./logo";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import LoginForm from "@/app/auth/login/login-form";

export default async function Nav() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between gap-2 px-4 md:px-6 bg-background border-b">
      <nav className="text-lg font-medium md:flex md:flex-row md:items-center md:justify-between md:gap-5 md:text-sm lg:gap-6">
        <Logo
          className="flex items-center gap-2 text-lg font-semibold justify-center"
          height={70}
          width={70}
        />
      </nav>
      <div className="md:flex gap-4 hidden">
        <Link href={"/sports-news"}>
          <Button>Sports News</Button>
        </Link>
        <Link href={"/products"}>
          <Button>Products</Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ThemeButtons className="my-2" />
        {session?.user ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="size-5" />
                <span className="sr-only">Abrir menu de navegação</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-4 text-lg font-medium mb-4">
                <Logo
                  showSlogan
                  className="flex items-center gap-2 text-lg font-semibold flex-col justify-center"
                  height={200}
                  width={200}
                />
                <Separator />
                <SheetClose asChild>
                  <Link
                    href="/dashboard"
                    className="hover:text-foreground group"
                  >
                    <Button
                      variant={"secondary"}
                      className="w-full flex gap-3 items-center justify-start"
                    >
                      <PanelTop
                        size={13}
                        color="gray"
                        className="group-hover:translate-x-1 transition-all"
                      />
                      Dashboard
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/products"
                    className="hover:text-foreground group"
                  >
                    <Button
                      variant={"secondary"}
                      className="w-full flex gap-3 items-center justify-start"
                    >
                      <PanelTop
                        size={13}
                        color="gray"
                        className="group-hover:translate-x-1 transition-all"
                      />
                      View Products
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/sports-news"
                    className="hover:text-foreground group"
                  >
                    <Button
                      variant={"secondary"}
                      className="w-full flex gap-3 items-center justify-start"
                    >
                      <PanelTop
                        size={13}
                        color="gray"
                        className="group-hover:translate-x-1 transition-all"
                      />
                      View Sports News
                    </Button>
                  </Link>
                </SheetClose>

                <Link
                  href="/dashboard/profile"
                  className="hover:text-foreground group"
                >
                  <Button
                    variant={"secondary"}
                    className="w-full flex gap-3 items-center justify-start"
                  >
                    <User
                      size={13}
                      color="gray"
                      className="group-hover:translate-x-1 transition-all"
                    />
                    Profile
                  </Button>
                </Link>
              </nav>

              <Separator />
              <div className="flex flex-col justify-center items-center w-full mt-4 mx-auto">
                <div className="flex gap-2 items-center justify-center w-full">
                  <Avatar>
                    <Image
                      src={session?.user.image}
                      width={45}
                      height={45}
                      alt={session?.user.name}
                      unoptimized
                    />
                    {!session?.user.image && (
                      <AvatarFallback>USER</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-primary">
                      {session?.user.name}
                    </span>
                    <span className="text-xs">{session?.user.email}</span>
                  </div>
                  <SheetClose asChild>
                    <Link
                      href="/auth/logout"
                      className="hover:text-foreground fixed bottom-2"
                    >
                      <Button variant={"outline"} className="w-full flex gap-2">
                        <LogOut />
                        <span className="text-xs">Logout</span>
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <Drawer>
            <DrawerTrigger>Login</DrawerTrigger>
            <DrawerContent>
              <LoginForm />
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </header>
  );
}
