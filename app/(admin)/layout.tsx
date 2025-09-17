/** @format */

import type { Metadata } from "next";
import SideBar from "@/modules/layouts/admin/layout/sidebar";
import Header from "@/modules/layouts/admin/layout/header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "BuildwithAyo",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />

      <div className="relative flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-screen-3xl py-4 px-4 md:py-10 md:px-14 2xl:py-14">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
