import { cn } from "@/lib/utils";
import { auth } from "@/server/auth";
import { Milestone } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import DashboardNav from "../../components/structural/navigation/dashboard-nav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();
  if (!session?.user) return redirect("/");
  const userLinks = [
    {
      label: "Reviews",
      path: "/dashboard/reviews",
      icon: <Milestone />,
    },
    {
      label: "Products",
      path: "/dashboard/products",
      icon: <Milestone />,
    },
    {
      label: "Profile",
      path: "/dashboard/profile",
      icon: <Milestone />,
    },
  ] as const;

  const adminLinks =
    session.user.role === "admin"
      ? ([
          {
            label: "Analytics",
            path: "/dashboard/analytics",
            icon: <Milestone />,
          },
          {
            label: "Manage Reviews",
            path: "/dashboard/reviews",
            icon: <Milestone />,
          },
          {
            label: "Manage Products",
            path: "/dashboard/products",
            icon: <Milestone />,
          },
          {
            label: "Manage Categories",
            path: "/dashboard/categories",
            icon: <Milestone />,
          },
        ] as const)
      : [];

  const allLinks = [...userLinks, ...adminLinks];

  return (
    <div className={cn("flex min-h-svh w-full flex-col bg-secondary", "")}>
      <DashboardNav />
      {children}
    </div>
  );
}
