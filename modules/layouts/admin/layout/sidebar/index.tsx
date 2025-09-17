/** @format */
"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import logo from "../../../../../public/logo/10.png";
import Image from "next/image";
import { useLayoutContx } from "@/context/layoutcontext";
import React from "react";
import { signOut } from "next-auth/react"; // Import signOut function

import Links from "./link";
import { LucideProps, type LucideIcon } from "lucide-react";
import SidebarLink from "./SideBarLinks";

export default function SideBar() {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const { sidebarOpen, setSidebarOpen } = useLayoutContx();
  // console.log(sidebarOpen);
  
  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

 

  return (
    <div>
      <aside
        className={`fixed md:relative bg-off-black border-r border-r-white/10  top-0 sm:top-0 left-0 h-full pb-4 md:pb-0 w-60 z-50 transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between gap-1 px-8 py-5 lg:py-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              className="block lg:hidden"
            >
              <svg
                className="fill-current"
                width="17"
                height="18"
                viewBox="0 0 20 18"
                fill="#ffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                  fill="#ffff"
                />
              </svg>
            </button>
          </div>

          <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            <nav className="mt-5 px-2 py-4 lg:mt-9 lg:px-3">
              <div>
                <h3 className="mb-4 ml-4 text-sm text-gray-300 font-semibold">
                  MENU
                </h3>
                <div className="mb-6 flex flex-col gap-1">
                  {Links.map(({ href, label, Icon, badgeLabel }, i) => (
                    <SidebarLink
                      key={i}
                      href={href}
                      setSidebarOpen={setSidebarOpen}
                      label={label}
                      icon={Icon}
                      badgeLabel={badgeLabel}
                    />
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </aside>
    </div>
  );
}
