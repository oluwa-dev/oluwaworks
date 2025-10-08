/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutTeaser({
  photoSrc = "/me.jpg",
  name = "Ayokunumi Name",
}: {
  photoSrc?: string;
  name?: string;
}) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-12 text-white">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-16 mx-auto h-32 w-72 rounded-full border-[18px] border-brand-blue/60 opacity-30 blur-[70px]"
        />

        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/10 flex-shrink-0">
              <Image
                src={photoSrc}
                alt={`${name} headshot`}
                fill
                sizes="56px"
                className="object-cover object-top"
                style={{ objectPosition: "50% 30%" }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold leading-tight">
                I build websites and Mobile Applications
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              From <span className="text-blue-200">CMS websites</span> to{" "}
              <span className="text-blue-200">full-stack applications</span> - I
              handle the complete web development process.
            </p>

            <div className="pt-1">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-blue-deep px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-blue-deep w-full justify-center sm:w-auto"
              >
                About Me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop: Original horizontal layout */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative h-20 w-20 lg:h-24 lg:w-24 overflow-hidden rounded-full ring-1 ring-white/10 flex-shrink-0">
            <Image
              src={photoSrc}
              alt={`${name} headshot`}
              fill
              sizes="96px"
              className="object-cover object-top"
              style={{ objectPosition: "50% 30%" }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-xl lg:text-2xl font-semibold">
              Web developer who owns the outcome
            </h3>
            <p className="mt-2 text-sm lg:text-base text-slate-300">
              Whether you need a{" "}
              <span className="text-blue-200">CMS website</span>, an{" "}
              <span className="text-blue-200">e-commerce store</span>, or a{" "}
              <span className="text-blue-200">custom web application</span> -  I map your funnel, track the right events, and remove friction so more visitors become customers. The build is fast and scalable. The result is momentum.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl bg-main-blue px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-blue-deep"
            >
              Meet me
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
