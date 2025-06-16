"use client";

import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Gem,
  User,
  HelpCircle,
} from "lucide-react";
import { Poppins } from "next/font/google";
import DashNav from "../components/dashnav";
import Sidebar from "../components/sidebar";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

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

const EventPage = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const { getToken } = useAuth();
  const { user } = useUser();

  // Get key if exists
  useEffect(() => {
    if (!user?.id) return;

    const fetchApiKey = async () => {
      try {
        const token = await getToken();

        const res = await fetch(`/api/projects/${user.id}/keygen`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok && data.apiKey) {
          setApiKey(data.apiKey);
        } else {
          setApiKey(null);
        }
      } catch (err) {
        console.error("GET Error:", err);
        setApiKey(null);
      }
    };

    fetchApiKey();
  }, [user?.id]);

  // Generate if not already exists
  const handleGenerate = async () => {
    if (!user?.id) return;

    try {
      const token = await getToken();

      const res = await fetch(`/api/projects/${user.id}/keygen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.apiKey) {
        setApiKey(data.apiKey);
      } else if (res.status === 409) {
        alert("API key already exists. Please refresh.");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  return (
    <>
      <div className="absolute min-w-screen">
        <DashNav title="Manage Account" />
      </div>
      <div className="flex flex-row">
        <Sidebar
          active="Account"
          menuItems={menuItems}
          otherItems={otherItems}
        />
        <div className="min-h-screen border-r-[0.5px] border-[#C8CBD9] w-[260px] p-8">
          <h2 className={`text-sm text-[#5A67BA] mt-27 ${PoppinsFontBold.className}`}>
            Account info
          </h2>
        </div>
        <div className="min-h-screen border-r-[0.5px] border-[#C8CBD9] w-[360px] p-8">
          <h2 className={`text-sm text-[#5A67BA] mt-27 ${PoppinsFontBold.className}`}>
            API key
          </h2>

          {apiKey ? (
            <div className="h-10 mt-10 w-full rounded-md bg-[#F6F6FB] text-[#505050] text-sm flex items-center justify-center">
              {apiKey}
            </div>
          ) : (
            <div
              className="h-10 mt-10 w-[100px] cursor-pointer rounded-md bg-[#FF4B4B] text-[white] text-sm flex items-center justify-center"
              onClick={handleGenerate}
            >
              Generate
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventPage;
