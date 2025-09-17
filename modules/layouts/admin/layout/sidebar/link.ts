/** @format */

import {
  LucideIcon,
  LayoutDashboard,
  User,
  Users,
  Headphones,
  BookOpen, 
  FileText,
  Megaphone,
  FileQuestion,
  LifeBuoy,
} from "lucide-react";
import Link from "next/link";

interface MenuProps {
  label: string;
  href: string;
  Icon: LucideIcon;
  badgeLabel?: string | undefined;
}

const Links: MenuProps[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    Icon: LayoutDashboard,
  },
  {
    label: "Contacts",

    href: "/dashboard/submissions",
    Icon: Users,
  },

  {
    label: "Projects",

    href: "/dashboard/projects",
    Icon: Users,
  },

  {
    label: "Profile",
    href: "#",
    Icon: User,
    badgeLabel: "soon",
  },
];

export default Links;
