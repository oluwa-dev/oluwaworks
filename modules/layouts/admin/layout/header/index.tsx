/** @format */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Menu, Bell } from "lucide-react";
import { toast } from "sonner";
import { useLayoutContx } from "@/context/layoutcontext";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const { sidebarOpen, setSidebarOpen } = useLayoutContx();
  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      const t = target as Node;
      if (
        !dropdownOpen ||
        dropdown.current.contains(t) ||
        trigger.current?.contains(t)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close on ESC
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!dropdownOpen || key !== "Escape") return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  const getUserInitials = () => {
    if (!session?.user?.name) return "U";
    return session.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await signOut({ redirect: false });
      toast.success("Signed out");
      setDropdownOpen(false);
      router.push("/login");
    } catch (e: any) {
      toast.error(e?.message || "Failed to sign out");
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-off-black px-4 backdrop-blur supports-[backdrop-filter]:bg-brand-black/60 md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={()=> setSidebarOpen(!sidebarOpen)}
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-blue-100/90 transition hover:border-brand-blue/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <span className="text-base font-semibold text-white/90 md:text-lg">
          Dashboard
        </span>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button
          className="relative rounded-lg border border-white/10 bg-white/5 p-2 text-blue-100/90 transition hover:border-brand-blue/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand-blue" />
        </button>

        <div className="relative">
          <button
            ref={trigger}
            onClick={() => setDropdownOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={dropdownOpen}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-0.5 pr-2 text-left transition hover:border-brand-blue/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
          >
            <Avatar className="h-9 w-9 ring-1 ring-white/10">
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback className="bg-brand-blue/20 text-brand-blue-light">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm text-blue-100/90 sm:block">
              {session?.user?.name || "User"}
            </span>
          </button>

          {dropdownOpen && (
            <div
              ref={dropdown}
              role="menu"
              className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-brand-black/95 shadow-2xl backdrop-blur"
            >
              <div className="px-4 py-3">
                <p className="truncate text-sm font-medium text-white/90">
                  {session?.user?.name || "User"}
                </p>
                <p className="truncate text-xs text-blue-100/80">
                  {session?.user?.email || ""}
                </p>
              </div>
              <div className="border-t border-white/10" />
              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="w-full cursor-pointer px-4 py-2.5 text-left text-sm text-rose-200 transition hover:bg-rose-500/10 disabled:opacity-60"
              >
                {logoutLoading ? "Signing out…" : "Sign out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
