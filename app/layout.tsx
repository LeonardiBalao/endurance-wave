import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Poppins as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  weight: ["100", "200", "300", "400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Endurance Wave",
  description: "Top reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-svh w-full flex-col bg-secondary",
          fontSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
