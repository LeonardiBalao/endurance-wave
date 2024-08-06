"use client";

import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Review } from "@prisma/client";
import { Separator } from "../ui/separator";

interface ReviewElementProps {
  review: Review;
}

export default function ReviewElement({ review }: ReviewElementProps) {
  return (
    <Card key={review.id} className="max-w-screen-sm md:max-w-screen-lg">
      <CardHeader>
        <Badge
          variant={"secondary"}
          className="leading-5 font-serif text-sm rounded drop-shadow-2xl shadow md:w-[350px] border-b-gray-300 mb-4"
        >
          {review.createdAt.toLocaleTimeString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Badge>
        <CardTitle className="font-bold text-4xl leading-snug my-4">
          {review.title}
        </CardTitle>
        <CardDescription className="flex flex-col gap-4 text-lg my-4 italic">
          <span className="text-md">{review.description}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <div className="flex gap-1 flex-wrap mt-2">
          {review.tags.map((t, i) => (
            <Badge
              variant={"secondary"}
              className="rounded-none leading-4 bg-secondary font-normal"
              key={i}
            >
              {t}
            </Badge>
          ))}
        </div>
        <div className="w-full py-5">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={review.mainImageURL}
              alt={review.mainImageALT}
              className="object-cover rounded-[4px]"
              fill
              unoptimized
            />
          </AspectRatio>
        </div>

        <div
          className="posts my-2"
          dangerouslySetInnerHTML={{ __html: review.introduction }}
        />
        <div className="w-full py-5">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={review.introductionImageURL}
              alt={review.introductionImageALT}
              className="object-cover rounded-[4px]"
              fill
              unoptimized
            />
          </AspectRatio>
        </div>
        <div className="flex gap-2 flex-wrap mb-4 mt-2">
          {review.keywords.map((t, i) => (
            <Badge variant={"outline"} key={i}>
              {t}
            </Badge>
          ))}
        </div>
        <div
          className="posts"
          dangerouslySetInnerHTML={{ __html: review.comparative }}
        />
        <div className="w-full py-5">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={review.comparativeImageURL}
              alt={review.comparativeImageALT}
              className="rounded-[4px] object-cover"
              fill
              unoptimized
            />
          </AspectRatio>
        </div>
        <div
          className="posts"
          dangerouslySetInnerHTML={{ __html: review.conclusion }}
        />
      </CardContent>
    </Card>
  );
}
