/** @format */
"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, Download, Rocket, Wand2, Code2 } from "lucide-react";
import Faq from "@/ui/custom/faq";

type AboutProps = {
  photoSrc?: string;
  name?: string;
  title?: string;
  resumeHref?: string;
};

export default function AboutClient({
  photoSrc = "/me.jpg",
  name = "Ayo",
  title = "Full-stack developer · No-code & Custom",
  resumeHref = "/Faseesin_Ayokunumi_Resume.docx",
}: AboutProps) {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-brand-black text-white"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(60%_60%_at_75%_20%,rgba(96,165,250,.18),transparent_60%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-15 [background-size:32px_32px] [background-image:linear-gradient(to_right,rgba(96,165,250,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,0.15)_1px,transparent_1px)]"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-12">
          {/* Portrait + orbit badge column */}
          <div className="relative md:col-span-5">
            {/* orbit ring */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-b from-brand-blue/20 to-transparent blur-2xl"
            />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0D131A] p-2 shadow-2xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src={photoSrc}
                  alt={`${name} portrait`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <motion.div
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: -6, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute -right-2 top-6 hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs backdrop-blur md:block"
            >
              <div className="flex items-center gap-2 text-blue-100/90">
                <Sparkles size={14} />
                <span>No-code → Custom</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: -8, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeInOut" }}
              className="absolute -left-3 bottom-6 hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs backdrop-blur md:block"
            >
              <div className="flex items-center gap-2 text-blue-100/90">
                <Rocket size={14} />
                <span>5+ Years Experience</span>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-7">
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Hey, I'm <span className="text-brand-blue-light">{name}</span>
            </h2>
            <p className="mt-6 max-w-2xl text-slate-300">
              I'm a full-stack developer who works across the entire spectrum -
              from <strong className="text-blue-200">custom code</strong> to{" "}
              <strong className="text-blue-200">
                no-code/low-code solutions
              </strong>
              . I build websites, online stores, and web applications that
              actually work. I also handle{" "}
              <strong className="text-blue-200">SEO</strong> to help you get
              found on Google. Recently, I've been working a lot with{" "}
              <strong className="text-blue-200">AI integrations</strong> -
              building wrappers, connecting to third-party models, and creating
              AI agents. Whether you're a local business in Nigeria or a tech
              startup anywhere, I'll build what you need. When I'm not coding, I
              just rest!
            </p>

            <div className="mt-8 space-y-6">
              <h3 className="text-xl font-semibold text-white">
                Experience & Approach
              </h3>

              <div className="space-y-4 text-slate-300">
                <p>
                  I've been building{" "}
                  <strong className="text-blue-200">web applications</strong>{" "}
                  and <strong className="text-blue-200">mobile apps</strong> for
                  over 5 years. During this time, I've worked across many
                  different industries and learned that every project has its
                  own challenges.
                </p>

                <p>
                  What sets me apart is how I handle communication. When issues
                  come up (and they always do), I address them quickly and
                  honestly. I believe in keeping relationships strong because
                  that's how great work gets done. No drama, just solutions.
                </p>

                <p>
                  On the SEO side, I handle both{" "}
                  <strong className="text-blue-200">on-page</strong> and{" "}
                  <strong className="text-blue-200">
                    off-page optimization
                  </strong>
                  . I've helped clients in healthcare, e-commerce, finance, real
                  estate, and more get found on Google. Each niche has its
                  tricks, and I've learned them through real client work.
                </p>

                <p>
                  I'm currently open to{" "}
                  <strong className="text-blue-200">freelance gigs</strong> and{" "}
                  <strong className="text-blue-200">
                    full-time opportunities
                  </strong>
                  . Whether you need someone for a quick project or want to add
                  me to your team permanently, let's talk.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-brand-blue-deep px-5 py-3 font-medium text-white transition hover:bg-brand-blue-deep focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
              >
                Let's work together
              </Link>
              <Link
                href={resumeHref}
                download
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white/90 transition hover:border-brand-blue/40 hover:text-white"
              >
                <Download className="h-4 w-4" />
                Download résumé
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <Faq />
        </div>
      </div>
    </section>
  );
}
