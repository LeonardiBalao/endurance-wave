"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Review } from "@prisma/client";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";

interface ReviewElementProps {
  review: Review;
  products: ProductWithPriceAsString[];
}

export default function ReviewElement({
  review,
  products,
}: ReviewElementProps) {
  return (
    <article>
      <Card className="max-w-screen-sm md:max-w-screen-lg posts">
        <CardHeader>
          <Badge className="leading-5 font-serif text-sm rounded drop-shadow-2xl shadow md:w-[350px] border-b-gray-300 mb-4">
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
          <CardTitle className="font-bold text-2xl md:text-4xl leading-snug my-4">
            {review.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full mx-auto py-5">
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
          <div className="flex gap-1 flex-wrap my-2">
            {review.tags.map((t, i) => (
              <Badge
                variant={"outline"}
                className="leading-4 font-normal"
                key={i}
              >
                {t}
              </Badge>
            ))}
          </div>
          <Separator />
          <div
            className="my-2"
            dangerouslySetInnerHTML={{ __html: review.introduction }}
          />
          <div className="w-full mx-auto py-5">
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
              <Badge
                variant={"outline"}
                key={i}
                className="bg-white text-gray-700"
              >
                {t}
              </Badge>
            ))}
          </div>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: review.comparative }}
          />
          {products.map((p, i) => (
            <div key={p.id} className="px-8 py-4 border-2 rounded-md mt-6">
              <h2 className="">
                {i + 1}. {p.name} -{" "}
                <Link
                  className="underline text-primary"
                  href={`https://${p.affiliateURL[0]}`}
                >
                  from {p.price} USD
                </Link>
              </h2>
              <div dangerouslySetInnerHTML={{ __html: p.about }} />
              <div className="w-full md:w-[50%] mx-auto py-5">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={p.mainImageURL}
                    alt={p.mainImageALT}
                    className="object-cover rounded-[4px]"
                    fill
                    unoptimized
                  />
                </AspectRatio>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <span className="font-semibold text-primary">Advantages</span>
                  {p.advantages.map((a, i) => (
                    <Badge key={i} className="">
                      {a}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <span className="font-semibold text-gray-600">
                    Disadvantages
                  </span>
                  {p.disadvantages.map((a, i) => (
                    <Badge key={i} className="" variant={"outline"}>
                      {a}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: review.conclusion }}
          />
          <div className="border-2 rounded-md mt-10 p-2">
            <Table>
              <TableHeader>
                <TableRow className="uppercase">
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">Advantages</TableHead>
                  <TableHead className="text-center">Disadvantages</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-semibold">{p.name}</TableCell>
                    <TableCell className="text-center">
                      <ul>
                        {p.advantages.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="text-center">
                      <ul>
                        {p.disadvantages.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {p.price} USD
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
