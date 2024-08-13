import Main from "@/components/structural/main";
import prisma from "@/server/db";
import ReviewElement from "@/components/posts/review";
import Nav from "@/components/structural/navigation/nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, BriefcaseBusiness, Upload } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { hyfenize } from "@/lib/utils/utils";

export default async function Dashboard() {
  const reviews = await prisma.review.findMany();
  const products = await prisma.product.findMany();

  return (
    <>
      <Nav />
      <Main className="flex gap-4">
        <div className="flex flex-col gap-4">
          {reviews.map((r, i) => (
            <ReviewElement key={i} review={r} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Card className="hidden md:flex md:flex-col overflow-hidden max-w-[400px] leading-8 bg-primary/75 shadow-sm cursor-pointer hover:bg-primary">
            <CardHeader>
              <CardTitle className="text-lg text-white font-serif tracking-wide	">
                We’re passionate about sports and committed to transforming the
                way enthusiasts search for gear.
              </CardTitle>
              <CardDescription className="text-sm text-white flex justify-end gap-2 items-center">
                About us <ArrowRight />
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hidden md:flex md:flex-col overflow-hidden max-w-[400px] leading-8 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                Related Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel>
                <CarouselContent>
                  {reviews.map((r) => (
                    <CarouselItem
                      key={r.id}
                      className="md:basis-1/2 cursor-pointer "
                    >
                      <Card className="hover:bg-primary/15">
                        <CardHeader>
                          <CardTitle className="leading-5">{r.title}</CardTitle>
                          <ArrowRight className="ml-auto text-primary" />
                        </CardHeader>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
          <Card className="hidden md:flex md:flex-col max-w-[400px] leading-8 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                Related Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel>
                <CarouselContent>
                  {products.map((p) => (
                    <CarouselItem
                      key={p.id}
                      className="md:basis-1/2 cursor-pointer "
                    >
                      <Link href={`/products/${"adidas"}/${hyfenize(p.name)}`}>
                        <Card className="hover:bg-primary/15">
                          <CardHeader>
                            <CardTitle className="leading-5">
                              {p.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-2">
                            <div className="w-full">
                              <AspectRatio ratio={16 / 9}>
                                <Image
                                  src={p.mainImageURL}
                                  alt={p.mainImageALT}
                                  fill
                                  className="border-2 border-black rounded-sm  shadow-lg object-cover"
                                  unoptimized
                                />
                              </AspectRatio>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  );
}
