/** @format */
// components/Loader.tsx
"use client";

import * as React from "react";
import { motion } from "motion/react";
import clsx from "clsx";

type LoaderVariant = "spinner" | "dots" | "bar";
type Size = "sm" | "md" | "lg";

export function Loader({
  variant = "spinner",
  size = "md",
  label = "Loading…",
  fullScreen = false,
  overlay = false,
  className,
}: {
  variant?: LoaderVariant;
  size?: Size;
  label?: string;
  /** Covers the whole viewport */
  fullScreen?: boolean;
  /** Covers the parent with a blur overlay (set parent to relative) */
  overlay?: boolean;
  className?: string;
}) {
  const content =
    variant === "dots" ? (
      <Dots size={size} />
    ) : variant === "bar" ? (
      <Bar />
    ) : (
      <Spinner size={size} />
    );

  const wrapper = (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "inline-flex flex-col items-center justify-center gap-2 text-blue-100/80",
        className
      )}
    >
      {content}
      {label ? <span className="text-xs">{label}</span> : null}
      <span className="sr-only">{label}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[80] grid place-items-center bg-brand-black">
        {/* soft glow */}
        <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_60%_at_50%_40%,rgba(96,165,250,.18),transparent_60%)]" />
        {wrapper}
      </div>
    );
  }

 if (overlay) {
   return (
     <div className="fixed inset-0 z-[80] grid place-items-center bg-black/40 backdrop-blur-sm">
       <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_60%_at_50%_40%,rgba(96,165,250,.18),transparent_60%)]" />
       {wrapper}
     </div>
   );
 }


  return wrapper;
}


function Spinner({ size }: { size: Size }) {
  const map = {
    sm: "h-5 w-5",
    md: "h-7 w-7",
    lg: "h-10 w-10",
  } as const;

  return (
    <div className="relative">
      <div
        className={clsx(
          "rounded-full border-2 border-white/10",
          map[size],
          "shadow-[0_0_40px_rgba(96,165,250,0.25)]"
        )}
      />
      <div
        className={clsx(
          "absolute inset-0 rounded-full border-2 border-transparent border-t-brand-blue",
          map[size],
          "animate-spin"
        )}
        style={{ animationDuration: "900ms" }}
      />
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        initial={{ scale: 0.95, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        style={{
          boxShadow: "0 0 40px rgba(96,165,250,0.25) inset",
        }}
      />
    </div>
  );
}

function Dots({ size }: { size: Size }) {
  const dot = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  } as const;

  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={clsx(
            "rounded-full bg-brand-blue-light/80",
            dot[size],
            "shadow-[0_0_20px_rgba(96,165,250,0.35)]"
          )}
          initial={{ y: 0, opacity: 0.6 }}
          animate={{ y: [-2, 0, -2], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 0.9,
            delay: i * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Bar() {
  return (
    <div className="relative h-2 w-48 overflow-hidden rounded-full border border-white/10 bg-white/5">
      <motion.div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-brand-blue/40 to-brand-blue"
        initial={{ x: "-40%" }}
        animate={{ x: ["-40%", "110%"] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ---------------- SKELETONS ---------------- */

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-md bg-white/5",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        className
      )}
    />
  );
}
