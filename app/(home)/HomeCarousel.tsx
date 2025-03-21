"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import runningShoes from "@/public/slider-images/running-shoes.jpg";
import walkingShoes from "@/public/slider-images/walking-shoes.jpg";
import waterBottle from "@/public/slider-images/water-bottle.jpg";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HomeCarousel {
  className: string;
}

const slides = [
  {
    title: "Running shoes",
    imagePath: runningShoes,
    link: "#",
  },
  {
    title: "Walking shoes",
    imagePath: walkingShoes,
    link: "#",
  },
  {
    title: "Acessories",
    imagePath: waterBottle,
    link: "#",
  },
];

export function HomeCarousel({ className }: HomeCarousel) {
  return (
    <Carousel
      className={cn("w-full max-w-xs md:max-w-screen-sm", className)}
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {slides.map((s, index) => (
          <CarouselItem key={index} className="md:basis-1/2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex aspect-square items-center justify-center">
                <div className="w-[450px]">
                  <AspectRatio>
                    <Image
                      src={s.imagePath}
                      alt="Image"
                      className="rounded-sm object-cover"
                      fill
                      unoptimized
                    />
                  </AspectRatio>
                </div>
              </CardContent>
              <CardFooter>
                <Link className="w-full" href={s.link}>
                  <Button className="w-full">Check all items</Button>
                </Link>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
