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
import Image from "next/image";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function Dashboard() {
  const reviews = await prisma.review.findMany();

  return (
    <>
      <Nav />
      <Main className="bg-secondary flex gap-4">
        <div>
          {reviews.map((r, i) => (
            <ReviewElement key={i} review={r} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Card className="hidden md:flex md:flex-col overflow-hidden max-w-[400px] leading-8">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                About Endurance Wave
              </CardTitle>
              <CardDescription className="text-md">
                Empowering Sports Enthusiasts At Endurance Wave, we’re
                passionate about sports and committed to transforming the way
                enthusiasts shop for gear.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hidden md:flex md:flex-col overflow-hidden max-w-[400px] leading-8">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                Related Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel>
                <CarouselContent>
                  {reviews.map((r) => (
                    <CarouselItem key={r.id} className="md:basis-1/2">
                      <div className="p-1">
                        <Card>
                          <CardHeader>
                            <CardTitle>{r.title.slice(0, 16)}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex aspect-square items-center justify-center text-xs">
                            {r.description + "..."}
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  );
}
