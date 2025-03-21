/* eslint-disable @next/next/no-img-element */
import Main from "@/components/structural/main";
import Nav from "@/components/structural/navigation/nav";

import { ArrowRight } from "lucide-react";

import Link from "next/link";
import Ripple from "@/components/magicui/ripple";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import TypingAnimation from "@/components/magicui/typing-animation";
import PulsatingButton from "@/components/ui/pulsating-button";

const slugs = [
  "nike",
  "adidas",
  "thenorthface",
  "reebok",
  "puma",
  "newbalance",
  "underarmour",
  "jordan",
  "amazon",
  "nhl",
  "redbull",
  "garmin",
  "mlb",
  "nba",
  "burton",
  "huawei",
];

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export default async function Dashboard() {
  return (
    <>
      <Nav />
      <div className="relative flex h-[500px] flex-col items-center justify-center bg-background w-full">
        <p className="z-10 text-center text-5xl font-medium tracking-tighter text-primary">
          Endurance Wave
        </p>
        <Ripple />
      </div>
      <Main className="flex flex-col items-center">
        <div className="w-full flex flex-col justify-center gap-10 items-center">
          <TypingAnimation
            className="text-xl text-primary/50 dark:text-white"
            text="We simplify choices and boost informed purchases."
            duration={40}
          />
          <Link href={"/sports-news"}>
            <PulsatingButton className="flex">
              News and Reviews <ArrowRight />
            </PulsatingButton>
          </Link>
        </div>
      </Main>
      <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden bg-background mt-10">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </>
  );
}
