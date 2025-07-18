"use client";

import DashNav from "../components/dashnav";
import Sidebar from "../components/sidebar";
import { Poppins } from "next/font/google";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Plus,
  Gem,
  User,
  HelpCircle,
} from "lucide-react";

const PoppinsFontBold = Poppins({ weight: "700", subsets: ["latin"] });
const PoppinsFontMedium = Poppins({ weight: "400", subsets: ["latin"] });
const PoppinsFontRegular = Poppins({ weight: "500", subsets: ["latin"] });

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
      <div className="flex flex-row">
        <Sidebar
          active="Dashboard"
          menuItems={menuItems}
          otherItems={otherItems}
        />
        <div className="flex flex-row gap-8">
          <div className="flex flex-col mt-40 ml-15">
            <div className={`h-25 w-45 bg-[#EFEFEF] flex items-center justify-center text-4xl rounded-xl text-[#5A67BA] ${PoppinsFontRegular.className}`}>
              23
            </div>
            <p className={`mt-10 text-md ${PoppinsFontMedium.className} text-[#132283]`}>Events Occurred <br /> Today</p>
          </div>
          <div className="flex flex-col mt-40">
            <div className={`h-25 w-45 bg-[#EFEFEF] flex items-center justify-center text-4xl rounded-xl text-[#5A67BA] ${PoppinsFontRegular.className}`}>
              223
            </div>
            <p className={`mt-10 text-md ${PoppinsFontMedium.className} text-[#132283]`}>Total events<br /> Occurred</p>
          </div>
          <div className="flex flex-col mt-40">
            <div className={`h-25 w-45 bg-[#EFEFEF] flex items-center justify-center text-4xl rounded-xl text-[#5A67BA] ${PoppinsFontRegular.className}`}>
              1
            </div>
            <p className={`mt-10 text-md ${PoppinsFontMedium.className} text-[#132283]`}>Total projects</p>
          </div>
          <div className="flex flex-col mt-40">
            <div className={`h-25 w-45 bg-[#EFEFEF] flex items-center justify-center text-4xl rounded-xl text-[#5A67BA] ${PoppinsFontRegular.className}`}>
              3
            </div>
            <p className={`mt-10 text-md ${PoppinsFontMedium.className} text-[#132283]`}>Total events</p>
          </div>
          <div className="flex flex-col mt-40">
            <div className={`h-25 w-45 bg-[#EFEFEF] flex items-center justify-center text-4xl rounded-xl text-[#5A67BA] ${PoppinsFontRegular.className} cursor-pointer`}>
              Doc
            </div>
            <p className={`mt-10 text-md ${PoppinsFontMedium.className} text-[#132283]`}>Search <br />Documentation</p>
          </div>
        </div>
      </div>
    </>
  );
}
