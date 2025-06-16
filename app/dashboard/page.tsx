"use client";

import DashNav from "../components/dashnav";
import Sidebar from "../components/sidebar";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Plus,
  Gem,
  User,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
    href: "/dashboard",
  },
  {
    label: "Create project",
    icon: <PlusCircle className="w-4 h-4" />,
    href: "/create",
  },
  {
    label: "Manage projects",
    icon: <FileText className="w-4 h-4" />,
    href: "/manage",
  },
];

const otherItems = [
  { label: "Premium", icon: <Gem className="w-4 h-4" />, href: "/premium" },
  { label: "Account", icon: <User className="w-4 h-4" />, href: "/account" },
  { label: "Help", icon: <HelpCircle className="w-4 h-4" />, href: "/help" },
];

export default function dashboard() {
  return (
    <>
      <div className="absolute min-w-screen">
        <DashNav title="Dashboard" />
      </div>
      <Sidebar active="Dashboard" menuItems={menuItems} otherItems={otherItems} />
    </>
  );
}
