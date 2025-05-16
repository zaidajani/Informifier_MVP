"use client";

import DashNav from "../components/dashnav";
import Sidebar from "../components/sidebar";
import { LayoutDashboard, PlusCircle, FileText } from "lucide-react";

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

export default function dashboard() {
  return (
    <>
      <div className="absolute min-w-screen">
        <DashNav title="Dashboard" />
      </div>
      <Sidebar active="Dashboard" menuItems={menuItems} />
    </>
  );
}
