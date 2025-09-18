/** @format */
"use client";

import * as React from "react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/ui/input";

export default function FeedbackPage() {
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const fd = new FormData(e.currentTarget);

    const name = String(fd.get("name") || "").trim();
    const role = String(fd.get("role") || "").trim();
    const businessName = String(fd.get("businessName") || "").trim();
    const feedback = String(fd.get("feedback") || "").trim();
    const website = String(fd.get("website") || ""); 

    fd.set("name", name);
    role ? fd.set("role", role) : fd.delete("role");
    businessName
      ? fd.set("businessName", businessName)
      : fd.delete("businessName");
    fd.set("feedback", feedback);
    fd.set("website", website);

    const file = fd.get("image") as File | null;
    if (file && file.size > 5 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Max 5MB." });
      setLoading(false);
      return;
    }

    if (file && file.size > 0) {
      if (file && !file.type.startsWith("image/")) {
        toast({
          title: "Invalid file",
          description: "Only image files are allowed.",
        });
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: fd,
      });

      const json = await res.json().catch(() => ({} as any));

      if (!res.ok) {
        const msg = Array.isArray(json?.message)
          ? json.message
              .map((m: any) => m.message || "")
              .filter(Boolean)
              .join("\n")
          : json?.message || "Failed to submit feedback";
        toast({ title: "Submission failed", description: msg });
        return;
      }

      toast({
        title: "Feedback received!",
        description: "Thank you — I appreciate it.",
      });
      (e.target as HTMLFormElement).reset();
    } catch {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-10 sm:py-14 text-slate-200 ">
      <h1 className="text-2xl font-semibold text-gray-100  md:text-3xl">
        Leave a feedback
      </h1>
      <p className="mt-3 text-[14px] text-slate-300 leading-relaxed">
        <span className="!text-shadow-brand-blue-light font-medium">
          Thanks for trusting me with your project!
        </span>{" "}
        Had a great time working together. Got a minute for a quick review? Your
        honest take helps me level up and helps future clients know what to
        expect.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="name"
            placeholder="Your name *"
            required
            className="h-11 rounded-xl border border-white/10 bg-white/5 px-3"
          />
          <Input
            name="businessName"
            placeholder="Business / Company (optional)"
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3"
          />
        </div>

        <Input
          name="role"
          type="text"
          placeholder="Your Role In the company (optional)"
          className="h-11 rounded-xl border border-white/10 bg-white/5 px-3"
        />

        <div className="space-y-2">
          <div>
            <label className="text-[14px] text-slate-300" htmlFor="avatar">
              Add a photo (optional) — a face to the name 🙂
            </label>
          </div>
          <Input
            name="image"
            type="file"
            accept="image/*"
            className="
    h-11 rounded-xl border border-white/10 bg-white/5 px-3 text-slate-200

    file:mr-3 file:rounded-lg file:border-0
    file:bg-main-blue file:px-3 
    file:text-white file:text-sm file:font-medium file:cursor-pointer
    hover:file:bg-brand-blue-deep
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50
  "
          />
        </div>
        <textarea
          name="feedback"
          required
          placeholder="Say a few words about working together *"
          rows={6}
          className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
        />

        <Input
          type="text"
          name="website"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="h-11 w-full bg-main-blue cursor-pointer rounded-lg bg-brand-blue px-5 font-medium text-white hover:bg-brand-blue-deep disabled:opacity-60"
        >
          {loading ? "Submitting.." : "Submit"}
        </button>
      </form>
    </section>
  );
}
