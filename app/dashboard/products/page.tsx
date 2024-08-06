import { getCategories } from "@/server/actions/category/get-categories";
import Main from "@/components/structural/main";
import prisma from "@/server/db";
import MainCard from "@/components/structural/main-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default async function Dashboard() {
  const categories = await getCategories();

  const reviews = await prisma.review.findMany();

  return (
    <>
      <Main>
        <MainCard title="Reviews" description="Bla bla bla">
          {reviews.map((r, i) => (
            <Card key={r.id}>
              <CardHeader>
                <CardTitle>{r.title}</CardTitle>
                <CardDescription>{r.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span>{r.introduction}</span>
                <Image
                  src={r.base64Images[0]}
                  alt="dadasda"
                  width={500}
                  height={500}
                />
                <div>{r.comparative}</div>
              </CardContent>
            </Card>
          ))}
        </MainCard>
      </Main>
    </>
  );
}
