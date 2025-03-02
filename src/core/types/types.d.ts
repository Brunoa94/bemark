import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      environment: string;
    } & DefaultSession["user"];
  }
  interface DefaultUser {
    environment: string;
  }
}