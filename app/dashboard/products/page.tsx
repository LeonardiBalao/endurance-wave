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

export default async function Dashboard() {
  const categories = await getCategories();

  const reviews = await prisma.review.findMany();

  return (
    <>
      <Main className="flex flex-col gap-10 bg-secondary">
        <MainCard
          title="Reviews"
          description="Bla bla bla"
          className="flex justify-center"
        >
          {reviews.map((r, i) => (
            <Card key={r.id} className="max-w-screen-lg border-none">
              <CardHeader>
                <CardTitle className="font-bold text-2xl">{r.title}</CardTitle>
                <CardDescription className="flex flex-col gap-4">
                  <span className="text-md">{r.description}</span>
                  <span>{r.createdAt.toLocaleDateString()}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="posts"
                  dangerouslySetInnerHTML={{ __html: r.introduction }}
                />
                <div className="w-full py-10">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={r.mainImageURL}
                      alt={r.mainImageALT}
                      className="rounded-sm object-cover"
                      fill
                    />
                  </AspectRatio>
                </div>
                <div
                  className="posts"
                  dangerouslySetInnerHTML={{ __html: r.comparative }}
                />
              </CardContent>
              <CardFooter>
                <div
                  className="posts"
                  dangerouslySetInnerHTML={{ __html: r.conclusion }}
                />
              </CardFooter>
            </Card>
          ))}
        </MainCard>
      </Main>
    </>
  );
}
