/** @format */
"use client";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    if (formData.email.trim().length === 0) {
      toast({
        title: "",
        description: "",
      });
      return;
    }

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setIsLoading(false);
        toast({
          title: "Failed",
          description: res.error,
        });
      } else {
             router.push("/dashboard");
      }

 
    } catch (e: any) {
      setIsLoading(false);
      // console.log(e);
      toast({
        title: "Login Failed",
        description: e.message,
        
      });
    }
  };

  return (
    <section className="bg-brand-black text-white">
      <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-6 py-16">
        <form
          onSubmit={handleFormSubmit}
          // action={login}
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
        >
          <div className="text-center">
            <h1 className="text-2xl font-semibold">BuildWithAyo</h1>
            <p className="mt-1 text-sm text-slate-300">Sign in</p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm text-slate-300">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
                autoComplete="username"
                placeholder="you@example.com"
                className="mt-1 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm text-slate-300">
                Password
              </label>
              <Input
                id="password"
                name="password"
                onChange={handleChange}
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="mt-1 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="mt-2 cursor-pointer h-11 w-full rounded-xl bg-brand-blue font-medium text-white transition bg-brand-blue-deep hover:bg-brand-blue-light"
            >
              {isLoading ? "Loading..." : "Sign in"}
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              ← Back to site
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
