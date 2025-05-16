"use client";

import DashNav from "../components/dashnav";
import Sidebar from "../components/sidebar";
import { useAuth, useUser } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { LayoutDashboard, PlusCircle, FileText, Plus } from "lucide-react";

const PoppinsFontBold = Poppins({ weight: "700", subsets: ["latin"] });
const PoppinsFontMedium = Poppins({ weight: "400", subsets: ["latin"] });

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
        <DashNav title="Manage Projects" />
      </div>
      <div className="flex flex-row">
        <Sidebar active="Manage projects" menuItems={menuItems} />
      </div>
    </>
  );
}
