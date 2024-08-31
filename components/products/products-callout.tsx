"use client";

import { Product, Review } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import ShinyButton from "../magicui/shiny-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "../ui/carousel";
import Link from "next/link";

interface ProductsCallOutProps {
  products: Product[];
}

export default function ProductsCallout({ products }: ProductsCallOutProps) {
  return (
    <Card className="max-w-screen-xl border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl md:text-4xl">Products</CardTitle>
        <CardDescription className="text-lg md:text-xl">
          Our latest products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Card>
          <CardHeader className="m-0 pb-0">
            <Badge
              variant={"outline"}
              className="leading-5 bg-secondary font-serif text-sm rounded drop-shadow-2xl shadow md:w-[350px] border-b-gray-300 mb-4"
            >
              {products[0].createdAt.toLocaleTimeString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Badge>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-md md:text-3xl text-white bg-primary py-4 px-6 border-2 dark:border-white border-gray-200 rounded-t-[4px]">
              {products[0].name}
            </p>
            <div className="w-full mx-auto pb-5 relative z-0">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={products[0].mainImageURL}
                  alt={products[0].mainImageALT}
                  className="object-cover rounded-b-[4px] border-2 dark:border-white border-gray-200"
                  fill
                  unoptimized
                />
              </AspectRatio>
            </div>
            <div className="flex gap-2 flex-wrap mb-4 mt-2">
              {products[0].tags.map((t, i) => (
                <Badge
                  variant={"outline"}
                  key={i}
                  className="bg-white text-gray-700"
                >
                  {t}
                </Badge>
              ))}
            </div>
            <p className="">{products[0].description}</p>
            <div className="w-full flex justify-start my-4">
              <Link
                href={`products/${products[0].brandId}/${products[0].slug}`}
              >
                <ShinyButton
                  text="Read More"
                  className="hover:bg-primary/50 hover:text-white"
                />
              </Link>
            </div>
            <Separator />
          </CardContent>
          <CardFooter>
            <Carousel>
              <CarouselContent>
                {products.slice(1).map((r) => (
                  <CarouselItem key={r.id} className="md:basis-1/2">
                    <Card className="border-none shadow-none">
                      <CardHeader className="m-0 pb-0">
                        <Badge
                          variant={"outline"}
                          className="leading-2 bg-secondary font-serif text-sm rounded drop-shadow-2xl shadow border-b-gray-300 mb-4"
                        >
                          {r.createdAt.toLocaleTimeString("en-us", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </Badge>
                      </CardHeader>
                      <CardContent className="relative">
                        <p className="text-md text-white bg-primary py-2 px-3 border-2 dark:border-white border-gray-200 rounded-t-[4px]">
                          {r.name}
                        </p>
                        <div className="w-full mx-auto pb-5 relative z-0">
                          <AspectRatio ratio={16 / 9}>
                            <Image
                              src={r.mainImageURL}
                              alt={r.mainImageALT}
                              className="object-cover rounded-b-[4px] border-2 dark:border-white border-gray-200"
                              fill
                              unoptimized
                            />
                          </AspectRatio>
                        </div>
                        <div className="flex gap-2 flex-wrap mb-4 mt-2">
                          {r.tags.map((t, i) => (
                            <Badge
                              variant={"outline"}
                              key={i}
                              className="bg-white text-gray-700"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                        <p className="">{r.description}</p>
                        <div className="w-full flex justify-start my-4">
                          <Link href={`/${r.brandId}/${r.slug}`}>
                            <ShinyButton
                              text="Read More"
                              className="hover:bg-primary/50 hover:text-white"
                            />
                          </Link>
                        </div>
                        <Separator />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext />
            </Carousel>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}
