"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function ThemeButtons({ className }: { className: string }) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    theme === "dark" || (resolvedTheme === "dark" && theme === "system")
      ? setChecked(true)
      : setChecked(false);
  }, [resolvedTheme, theme]);

  return (
    <>
      <div
        className={cn(
          "flex gap-2 items-center group justify-center text-sm px-2 py-1 rounded-full border scale-75",
          className
        )}
      >
        <Sun size={22} className="dark:hidden text-yellow-500" />

        <Switch
          checked={checked}
          onCheckedChange={(e) => {
            setChecked((prev) => !prev);
            e ? setTheme("dark") : setTheme("light");
          }}
          className="scale-90"
        />

        <Moon
          fill="blue"
          size={22}
          className="text-blue-700 hidden dark:block"
        />
      </div>
    </>
  );
}
