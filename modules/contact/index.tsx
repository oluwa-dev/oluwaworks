/** @format */

"use client";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/ui/input";
import * as React from "react";

export default function ContactClient() {
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);
    toast({
      title: "Message Received!",
      description: "Thank you for contacting me, I will get in Touch Shortly.",

      style: {
        backgroundColor: "",
      },
    });
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-10 sm:py-14 text-white">
      <h1 className="text-3xl   font-semibold md:text-4xl  ">Get In Touch</h1>
      <p className="mt-2 max-w-prose text-[14px] text-slate-300">
        Got a project or a quick question? Send me a message and I’ll reply in
        no time.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="name"
            placeholder="Your name"
            className="h-11 rounded-xl border border-white/10 bg-white/5 px-3"
          />
          <Input
            name="email"
            type="email"
            required
            placeholder="Email *"
            className="h-11 rounded-xl border border-white/10 bg-white/5 px-3"
          />
        </div>
        <Input
          name="company"
          placeholder="Company (Optional)"
          className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3"
        />

        <textarea
          name="message"
          required
          placeholder="Tell me about the project *"
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
          className="h-11 cursor-pointer transition rounded-lg w-full bg-main-blue px-5 font-medium text-white hover:bg-brand-blue-deep"
        >
          {loading ? "Sending…" : "Send message"}
        </button>
      </form>
    </section>
  );
}
