"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Aside() {
  return (
    <aside className="hidden md:flex max-w-screen-sm">
      <div>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Latest Products</CardTitle>
            <CardDescription>
              Find gear that will help you achieve a better performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="300"
                src="/placeholder.svg"
                width="300"
              />
              <div className="grid grid-cols-2 gap-2">
                <button>
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="84"
                    src="/placeholder.svg"
                    width="84"
                  />
                </button>
                <button>
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="84"
                    src="/placeholder.svg"
                    width="84"
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
