/** @format */
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/ui/input";

export default function AddProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [featured, setFeatured] = React.useState(false);
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState("");
  const [preview, setPreview] = React.useState<string | null>(null);
  const fileRef = React.useRef<HTMLInputElement | null>(null);

  function addTagFromInput() {
    const raw = tagInput.trim();
    if (!raw) return;
    const newOnes = raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (newOnes.length) {
      setTags((prev) => Array.from(new Set([...prev, ...newOnes])));
      setTagInput("");
    }
  }

  function removeTag(t: string) {
    setTags((prev) => prev.filter((x) => x !== t));
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) {
      setPreview(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Only image files are allowed.",
      });
      e.target.value = "";
      setPreview(null);
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Max 5MB." });
      e.target.value = "";
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(f);
    setPreview(url);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const fd = new FormData(e.currentTarget);

    const title = String(fd.get("title") || "").trim();
    const blurb = String(fd.get("blurb") || "").trim();
    const href = String(fd.get("href") || "").trim();
    if (!title || !blurb) {
      toast({
        title: "Missing fields",
        description: "Title and blurb are required.",
      });
      setLoading(false);
      return;
    }

    fd.set("featured", featured ? "true" : "false");

    // tags: send one FormData entry per tag (server reads getAll("tags"))
    fd.delete("tags");
    tags.forEach((t) => fd.append("tags", t));


    try {
      const res = await fetch("/api/admin/add-project", {
        method: "POST",
        body: fd,
      });

      const json = await res.json().catch(() => ({} as any));
      if (!res.ok) {
        const msg = Array.isArray(json?.message)
          ? json.message
              .map((i: any) => i.message || "")
              .filter(Boolean)
              .join("\n")
          : json?.message || "Failed to create project";
        toast({ title: "Create failed", description: msg });
        setLoading(false);
        return;
      }

      toast({
        title: "Project created",
        description: "Your project was added successfully!",
      });
      router.push("/dashboard/projects");
      router.refresh();
    } catch {
      toast({ title: "Network error", description: "Please try again." });
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-3 py-5 text-white">
      <h1 className="text-2xl font-semibold md:text-3xl">Add new project</h1>
      <p className="mt-1 text-slate-300">
        Upload a cover image, add copy, tags, and mark as featured.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-blue-100/80">
              Title *
            </label>
            <Input
              name="title"
              required
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white placeholder:text-blue-100/60 focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
              placeholder="e.g., Gaming Convention Portal"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-blue-100/80">
              Project link
            </label>
            <Input
              name="href"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-white placeholder:text-blue-100/60 focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
              placeholder="https://example.com/case-study"
            />
          </div>
        </div>

        {/* Blurb */}
        <div>
          <label className="mb-1 block text-sm text-blue-100/80">Blurb *</label>
          <textarea
            name="blurb"
            required
            rows={5}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-blue-100/60 focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
            placeholder="Short description (stack, outcome, highlights)…"
          />
        </div>

        {/* Image uploader + preview */}
        <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
          <div>
            <label className="mb-1 block text-sm text-blue-100/80">
              Cover image
            </label>
            <input
              ref={fileRef}
              name="image"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="block w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-brand-blue file:px-3 file:py-2 file:text-white  hover:file:bg-brand-blue-deep"
            />
            <p className="mt-1 text-xs text-blue-100/60">
              JPG/PNG/WebP up to 5MB.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-2">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-black/30">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full place-items-center text-xs text-blue-100/70">
                  Preview
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-blue-100/80">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs capitalize text-blue-100/85"
              >
                {t}
                <button
                  type="button"
                  onClick={() => removeTag(t)}
                  className="rounded p-0.5 text-blue-100/70 hover:text-white"
                  aria-label={`Remove ${t}`}
                  title="Remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="mt-2 flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addTagFromInput();
                }
              }}
              placeholder="Type a tag and press Enter (e.g., custom, shopify)"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-blue-100/60 focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
            />
            <button
              type="button"
              onClick={addTagFromInput}
              className="h-11 shrink-0 bg-brand-blue-deep rounded-xl bg-brand-blue px-4 text-sm font-medium text-white hover:bg-brand-blue-deep"
            >
              Add
            </button>
          </div>
          <p className="mt-1 text-xs text-blue-100/60">
           Eg: ustom, shopify, nocode, wordpress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="featured"
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-white/10 text-brand-blue focus:ring-brand-blue/40"
          />
          <label htmlFor="featured" className="text-sm text-blue-100/90">
            Mark as featured
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full bg-brand-blue-deep cursor-pointer rounded-xl bg-brand-blue px-5 font-medium text-white hover:bg-brand-blue-deep disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create project"}
          </button>
        </div>
      </form>
    </section>
  );
}
