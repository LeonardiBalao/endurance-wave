"use client";

import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Product } from "@prisma/client";
import { Separator } from "../ui/separator";
import Link from "next/link";

interface ProductElementProps {
  product: Product & { brand: string };
}

export default function ProductElement({ product }: ProductElementProps) {
  return (
    <Link href={`/${product.brand}/${product.name}`}>
      <Card
        key={product.id}
        className="max-w-screen-sm md:max-w-screen-lg posts bg-secondary"
      >
        <CardHeader>
          <Badge className="leading-5 font-serif text-sm rounded drop-shadow-2xl shadow md:w-[350px] border-b-gray-300 mb-4">
            {new Date().toLocaleTimeString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Badge>
          <CardTitle className="font-bold text-2xl md:text-4xl leading-snug my-4">
            {product.name}
          </CardTitle>
          <CardDescription className="flex flex-col gap-4 md:text-lg my-4 italic">
            <span className="text-md">{product.description}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <div className="flex gap-1 flex-wrap mt-2">
            {product.tags.map((t, i) => (
              <Badge
                variant={"secondary"}
                className="rounded-none leading-4 bg-secondary font-normal"
                key={i}
              >
                {t}
              </Badge>
            ))}
          </div>
          <div className="w-full mx-auto py-5">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={product.mainImageURL}
                alt={product.mainImageALT}
                className="object-cover rounded-[4px]"
                fill
                unoptimized
              />
            </AspectRatio>
          </div>

          <div
            className="my-2"
            dangerouslySetInnerHTML={{ __html: product.about }}
          />
          <div className="flex gap-2 flex-wrap mb-4 mt-2">
            {product.keywords.map((t, i) => (
              <Badge
                variant={"outline"}
                key={i}
                className="bg-white text-gray-700"
              >
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
