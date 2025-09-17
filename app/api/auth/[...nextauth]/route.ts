/** @format */

import NextAuth from "next-auth";
import { authHandler } from "@/lib/auth/authhandler";

const handler = NextAuth(authHandler);

export { handler as GET, handler as POST };
