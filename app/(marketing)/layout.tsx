/** @format */

import Footer from "@/modules/layouts/marketing/footer";
import Navbar from "@/modules/layouts/marketing/nav.tsx/nav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-[60dvh]">{children}</main>
      <Footer brandWord="BuilwithAyo" />
    </>
  );
}
