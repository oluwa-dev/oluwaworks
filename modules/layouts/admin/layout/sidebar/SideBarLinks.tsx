/** @format */
// SidebarLink.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { Badge } from "@/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import * as React from "react";

type SidebarLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  setSidebarOpen: (value: React.SetStateAction<boolean>) => void;
  badgeLabel?: string; 
};

const SidebarLink = ({
  href,
  label,
  icon: Icon,
  setSidebarOpen,
  badgeLabel,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  
 const isActive =
   href === "/dashboard"
     ? pathname === "/dashboard"
     : pathname === href || pathname.startsWith(href + "/");

  const disabled = href === "#";


  const closeMenu = () => {
    setSidebarOpen(false)
  }
  const base =
    "relative my-1 mx-3 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium " +
    "transition border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40";
  const state = disabled
    ? "opacity-60 pointer-events-none"
    : isActive
    ? "bg-brand-blue/10 border-brand-blue/50"
    : "hover:bg-white/5 hover:border-brand-blue/30";
  const text = isActive ? "text-white" : "text-blue-100/85";

  const iconColor = isActive ? "text-brand-blue-light" : "text-blue-200/80";

  const content = (
    <>
      {isActive && (
        <span
          aria-hidden
          className="absolute -left-6 h-8 w-1.5 rounded-r-full bg-brand-blue-light"
        />
      )}

      <Icon size={20} strokeWidth={2} className={iconColor} />

      <span className={`flex items-center text-[14px] ${text}`}>{label}</span>

      {badgeLabel === "soon" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="ml-auto cursor-default">
              <Badge className="rounded-full bg-brand-blue/20 px-2 py-0 text-[10px] text-brand-blue-light">
                soon
              </Badge>
            </TooltipTrigger>
            <TooltipContent className="z-[1000] border-white/10 bg-brand-black/95 text-blue-100/90">
              <p>{label} is coming soon!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );

  return disabled ? (
    <div
      className={`${base} ${state}`}
      aria-disabled="true"
      role="link"
      tabIndex={-1}
    >
      {content}
    </div>
  ) : (
    <Link
      onClick={closeMenu}
      href={href}
      className={`${base} ${state}`}
      aria-current={isActive ? "page" : undefined}
    >
      {content}
    </Link>
  );
};

export default SidebarLink;
