/** @format */

import { getServerSession } from "next-auth";
import { authHandler } from "@/lib/auth/authhandler";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authHandler);
  if (!session) redirect("/login");

  const name = session.user?.name || "there";

  return (
    <main className="bg-brand-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <h1 className="text-xl font-semibold md:text-3xl">Hello, {name} 👋</h1>
        <p className="mt-2 text-slate-300">
          Nothing here yet — I’ll add more soon.
        </p>
      </div>
    </main>
  );
}
