"use client";

import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Gem,
  User,
  HelpCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Poppins } from "next/font/google";
import DashNav from "../components/dashnav";
import Sidebar from "../components/sidebar";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const PoppinsFontBold = Poppins({ weight: "700", subsets: ["latin"] });
const PoppinsFontMedium = Poppins({ weight: "400", subsets: ["latin"] });

interface NotificationCardProps {
  title: string;
  description: string;
}

const AccouncementCard: React.FC<NotificationCardProps> = ({
  title,
  description,
}) => (
  <div className="w-[22vw] h-[130px] bg-[#F6F6FB] mt-5 rounded-md flex flex-col p-4">
    <h2 className={`text-sm text-[#5A67BA] ${PoppinsFontBold.className}`}>
      {title}
    </h2>
    <h2
      className={`text-sm text-[#5A67BA] mt-5 ${PoppinsFontMedium.className}`}
    >
      {description}
    </h2>
  </div>
);

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
  const [showKey, setShowKey] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        <div className="min-h-screen border-r-[0.5px] border-[#C8CBD9] w-[350px] p-8">
          <div className="max-h-[80vh] mt-20 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <h2
              className={`text-sm text-[#5A67BA] mt-8 ${PoppinsFontBold.className}`}
            >
              Account info
            </h2>
            <h2
              className={`text-sm text-[#5A67BA] mt-20 ${PoppinsFontBold.className}`}
            >
              Name:
              <span className={`ml-2 ${PoppinsFontMedium.className}`}>
                Zaid Ajani
              </span>
            </h2>
            <h2
              className={`text-sm text-[#5A67BA] mt-4 ${PoppinsFontBold.className}`}
            >
              Email:
              <span className={`ml-2 ${PoppinsFontMedium.className}`}>
                zaid.metal.ajani@gmail.com
              </span>
            </h2>
            <h2
              className={`text-sm text-[#5A67BA] mt-4 ${PoppinsFontBold.className}`}
            >
              Plan:
              <span className={`ml-2 ${PoppinsFontMedium.className}`}>
                Ping tier
              </span>
            </h2>
            <button
              className="relative mt-20 w-[160px] cursor-pointer px-4 py-1.5 rounded-full text-white font-medium text-base
             bg-gradient-to-b from-[#f18a9b] to-[#d8425e]
             border border-[#b9314a]
             transition-all duration-150 active:translate-y-[1px]
             overflow-hidden"
            >
              {/* Gloss arc on top half */}
              <div
                className="absolute inset-x-0 top-0 h-[60%]
               bg-white opacity-25 rounded-t-full
               [mask-image:linear-gradient(to_bottom,white,transparent)]
               pointer-events-none"
              />

              {/* Inner bevel ring */}
              <div
                className="absolute inset-0 rounded-full 
               ring-inset ring-1 ring-white/20
               pointer-events-none"
              />

              {/* Specular highlight dot */}
              <div
                className="absolute top-1 left-2 w-3 h-3
               bg-white rounded-full opacity-70 blur-sm pointer-events-none"
              />

              <span className="relative z-10">Logout</span>
            </button>

            <button
              className="relative mt-2 w-[160px] cursor-pointer px-4 py-1.5 rounded-full text-white font-medium text-base
             bg-gradient-to-b from-[#f18a9b] to-[#d8425e]
             border border-[#b9314a]
             transition-all duration-150 active:translate-y-[1px]
             overflow-hidden"
            >
              {/* Gloss arc on top half */}
              <div
                className="absolute inset-x-0 top-0 h-[60%]
               bg-white opacity-25 rounded-t-full
               [mask-image:linear-gradient(to_bottom,white,transparent)]
               pointer-events-none"
              />

              {/* Inner bevel ring */}
              <div
                className="absolute inset-0 rounded-full 
               ring-inset ring-1 ring-white/20
               pointer-events-none"
              />

              {/* Specular highlight dot */}
              <div
                className="absolute top-1 left-2 w-3 h-3
               bg-white rounded-full opacity-70 blur-sm pointer-events-none"
              />

              <span className="relative z-10">Delete Account</span>
            </button>
          </div>
        </div>
        <div className="min-h-screen border-r-[0.5px] border-[#C8CBD9] w-[30vw] p-8">
          <h2
            className={`text-sm text-[#5A67BA] mt-27 ${PoppinsFontBold.className}`}
          >
            API key
          </h2>

          {apiKey ? (
            <div className="h-10 mt-10 w-full rounded-md bg-[#F6F6FB] text-[#505050] text-sm flex items-center justify-between px-4">
              <span>{showKey ? apiKey : "•".repeat(apiKey.length)}</span>
              <span
                onClick={() => setShowKey(!showKey)}
                className="cursor-pointer"
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </span>
            </div>
          ) : (
            <div
              className="h-10 mt-10 w-[100px] cursor-pointer rounded-md bg-[#FF4B4B] text-[white] text-sm flex items-center justify-center"
              onClick={handleGenerate}
            >
              Generate
            </div>
          )}
          <h2
            className={`text-sm text-[#5A67BA] mt-5 ${PoppinsFontBold.className}`}
          >
            New Password
          </h2>
          <div className="h-10 mt-4 w-full rounded-md bg-[#F6F6FB] text-[#505050] text-sm flex items-center justify-between px-4">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="cursor-pointer ml-2"
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </span>
          </div>

          <h2
            className={`text-sm text-[#5A67BA] mt-6 ${PoppinsFontBold.className}`}
          >
            Confirm Password
          </h2>
          <div className="h-10 mt-4 w-full rounded-md bg-[#F6F6FB] text-[#505050] text-sm flex items-center justify-between px-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="cursor-pointer ml-2"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </span>
          </div>
          <button
            className="relative mt-8 w-[160px] cursor-pointer px-4 py-1.5 rounded-full text-white font-medium text-base
             bg-gradient-to-b from-[#91f3b5] to-[#37c477]
             transition-all duration-150 active:translate-y-[1px] overflow-hidden"
          >
            <div
              className="absolute inset-x-0 top-0 h-[60%]
                 bg-white opacity-25 rounded-t-full
                 [mask-image:linear-gradient(to_bottom,white,transparent)]
                 pointer-events-none"
            />
            <div
              className="absolute inset-0 rounded-full 
                 ring-inset ring-1 ring-white/20
                 pointer-events-none"
            />
            <div
              className="absolute top-1 left-2 w-3 h-3
                 bg-white rounded-full opacity-70 blur-sm pointer-events-none"
            />
            <span className="relative z-10 text-black">Update</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default EventPage;
