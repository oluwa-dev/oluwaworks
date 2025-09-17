/** @format */

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Login",
  description:
    "I build fast, beautiful sites and apps: no-code, low-code, or custom — whatever ships results fastest.",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-dvh flex flex-col">{children}</div>;
}
