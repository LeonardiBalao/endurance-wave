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

interface ReviewElementProps {
  product: ProductWithPriceAsString;
}

export default function ProductElement({ product }: ReviewElementProps) {
  return (
    <article>
      <Card className="max-w-screen-sm md:max-w-screen-lg posts bg-secondary">
        <CardHeader>
          <Badge className="leading-5 font-serif text-sm rounded drop-shadow-2xl shadow md:w-[350px] border-b-gray-300 mb-4">
            {product.createdAt.toLocaleTimeString("en-us", {
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
          <div className="flex flex-col gap-4 flex-wrap">
            <div className="flex gap-4">
              <span className="font-semibold text-primary">Advantages</span>
              <div className="flex flex-wrap gap-2">
                {product.advantages.map((a, i) => (
                  <Badge key={i} className="">
                    {a}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              <span className="font-semibold text-gray-600">Disadvantages</span>
              {product.disadvantages.map((a, i) => (
                <Badge key={i} className="" variant={"outline"}>
                  {a}
                </Badge>
              ))}
            </div>
            <h2 className="">Price: {product.price} USD</h2>
            <span>Affiliate link: {product.affiliateURL[0]}</span>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
