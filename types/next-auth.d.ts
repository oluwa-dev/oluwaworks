/** @format */

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; 
    } & DefaultSession["user"];
  }

    interface User {
        email: string
        name:string
    id: string; // what your authorize() returns
  }
}

declare module "next-auth/jwt" {
    interface JWT {
      email: string;
      name: string;
      id?: string; 
    }
}
