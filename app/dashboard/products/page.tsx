import { getCategories } from "@/server/actions/category/get-categories";
import Main from "@/components/structural/main";
import prisma from "@/server/db";
import MainCard from "@/components/structural/main-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

export default async function Dashboard() {
  const categories = await getCategories();

  const reviews = await prisma.review.findMany();

  return (
    <>
      <Main className="bg-secondary flex flex-col gap-10">
        {reviews.map((r, i) => (
          <Card key={r.id} className="max-w-screen-lg">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">{r.title}</CardTitle>
              <CardDescription className="flex flex-col gap-4">
                <span className="text-md">{r.description}</span>
              </CardDescription>
              <div className="flex gap-2">
                {r.tags.map((t, i) => (
                  <Badge variant={"secondary"} key={i}>
                    {t}
                  </Badge>
                ))}
              </div>
              <span>{r.createdAt.toLocaleDateString()}</span>
            </CardHeader>
            <CardContent>
              <div className="w-full py-10">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={r.mainImageURL}
                    alt={r.mainImageALT}
                    className="rounded-sm object-cover"
                    fill
                    unoptimized
                  />
                </AspectRatio>
              </div>
              <div className="flex gap-2">
                {r.keywords.map((t, i) => (
                  <Badge variant={"outline"} key={i}>
                    {t}
                  </Badge>
                ))}
              </div>
              <div
                className="posts"
                dangerouslySetInnerHTML={{ __html: r.introduction }}
              />
              <div className="w-full py-10">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={r.introductionImageURL}
                    alt={r.introductionImageALT}
                    className="rounded-sm object-cover"
                    fill
                    unoptimized
                  />
                </AspectRatio>
              </div>
              <div
                className="posts"
                dangerouslySetInnerHTML={{ __html: r.comparative }}
              />
              <div className="w-full py-10">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={r.comparativeImageURL}
                    alt={r.comparativeImageALT}
                    className="rounded-sm object-cover"
                    fill
                    unoptimized
                  />
                </AspectRatio>
              </div>
            </CardContent>
            <CardFooter>
              <div
                className="posts"
                dangerouslySetInnerHTML={{ __html: r.conclusion }}
              />
            </CardFooter>
          </Card>
        ))}
      </Main>
    </>
  );
}
