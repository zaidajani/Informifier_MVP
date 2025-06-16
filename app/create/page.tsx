"use client";

import DashNav from "../components/dashnav";
import Sidebar from "../components/sidebar";
import { useAuth, useUser } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
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
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(""); 
  const { user } = useUser();
  const { getToken } = useAuth();

  const handleCreateProject = async () => {
    if (!user) return;

    const token = await getToken();

    const res = await fetch(`/api/projects/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ projectName, description }),
    });

    // const data = await res.json();

    if (res.ok) {
      setProjectName('');
      setDescription('');
      setMessage(`✅ Project created`);
    } else {
      setProjectName('');
      setDescription('');
      setMessage(`❌ Error`);
    }
  };

  return (
    <>
      <div className="absolute min-w-screen">
        <DashNav title="Create a new project" />
      </div>
      <div className="flex flex-row">
        <Sidebar active="Create project" menuItems={menuItems} otherItems={otherItems} />
        <div className="p-8 mt-30">
          <h2
            className={`text-[#5A67BA] text-xs font-semibold ${PoppinsFontBold.className}`}
          >
            Create project
          </h2>

          <div
            className={`max-w-md space-y-3 mt-12 ${PoppinsFontMedium.className}`}
          >
            <p className="">{message}</p>
            <input
              type="text"
              placeholder="Name of the project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-5 w-full px-3 py-2 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Create Button */}
            <button className="flex items-center space-x-1.5 px-4 py-2 rounded-md bg-indigo-100 text-indigo-600 hover:bg-indigo-200 text-sm transition cursor-pointer mt-5" onClick={handleCreateProject}>
              <Plus className="w-4 h-4" />
              <span>Create project</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
