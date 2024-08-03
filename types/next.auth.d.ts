import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendUser = DefaultSession["user"] & {
  address: string;
  image: string;
  name: string;
  email: string;
  role: string;
  isOAuth: boolean;
  firstLogin: boolean;
  acceptsTerms: boolean;
  acceptsNotification: boolean;
  role: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendUser;
  }
}
