"use client";

import { useState, useEffect } from "react";
import DashNav from "@/app/components/dashnav";
import Sidebar from "@/app/components/sidebar";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Gem,
  User,
  HelpCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { Poppins } from "next/font/google";
import { useAuth, useUser } from "@clerk/nextjs";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const PoppinsFontBold = Poppins({ weight: "700", subsets: ["latin"] });
const PoppinsFontMedium = Poppins({ weight: "400", subsets: ["latin"] });

function formatDate(rawDate: string): string {
  const date = new Date(rawDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} @ ${hours}:${minutes}`;
}

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

const DiscordSvg = ({
  width = 100,
  height = 100,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 71 55"
    fill="none"
  >
    <path
      d="M60.104 4.552A58.935 58.935 0 0 0 46.852.2a41.505 41.505 0 0 0-1.968 4.053 56.261 56.261 0 0 0-16.777 0 41.462 41.462 0 0 0-1.981-4.053A58.958 58.958 0 0 0 10.9 4.552C1.714 19.237-.943 33.623.293 47.865A59.733 59.733 0 0 0 19.114 54.8a43.24 43.24 0 0 0 3.693-6.07 37.366 37.366 0 0 1-5.842-2.822c.492-.36.973-.735 1.441-1.122a40.985 40.985 0 0 0 35.288 0c.48.405.964.786 1.451 1.152a37.294 37.294 0 0 1-5.85 2.793 43.22 43.22 0 0 0 3.692 6.07 59.693 59.693 0 0 0 18.823-6.936c1.252-14.816-2.37-29.153-11.454-43.248Z"
      fill="#5865F2"
    />
    <path
      d="M26.203 37.077c-3.373 0-6.112-3.105-6.112-6.924 0-3.82 2.718-6.924 6.112-6.924 3.405 0 6.143 3.125 6.111 6.924 0 3.819-2.718 6.924-6.111 6.924Zm18.58 0c-3.373 0-6.112-3.105-6.112-6.924 0-3.82 2.719-6.924 6.112-6.924 3.406 0 6.144 3.125 6.111 6.924 0 3.819-2.719 6.924-6.111 6.924Z"
      fill="#fff"
    />
  </svg>
);

interface NotificationCardProps {
  title: string;
  description: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  description,
}) => (
  <div className="w-[25vw] h-[100px] bg-[#F6F6FB] mt-5 rounded-md flex flex-col p-4">
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

const ManageEvent = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const eventId = params.EventId as string;

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");
  const [events, setEvents] = useState<NotificationCardProps[]>([]);
  const [eventData, setEventData] = useState<any>({});
  const { getToken } = useAuth();

  // Load localStorage values
  useEffect(() => {
    if (!eventId) return;
    const savedUsername = localStorage.getItem(`event_${eventId}_username`) || "";
    const savedMessage = localStorage.getItem(`event_${eventId}_message`) || "";
    const savedService = localStorage.getItem(`event_${eventId}_service`) || "";
    const validServices = ["discord"]; // only allowed service
    setUsername(savedUsername);
    setMessage(savedMessage);
    setService(validServices.includes(savedService) ? savedService : "");
  }, [eventId]);

  // Fetch event occurrences
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = await getToken();
        const res = await fetch(
          `http://localhost:3000/api/alerts?projectId=${projectId}&eventId=${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        console.log(data);
        if (Array.isArray(data.eventOccurred)) {
          setEventData(data.event);
          setEvents(
            data.eventOccurred.map((e: any) => ({
              title: e.message || "Event occurred",
              description: formatDate(e.timestamp) || "No time info",
            }))
          );
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    fetchEvents();
  }, [projectId, eventId]);

  const codeSnippet = `await fetch("http://localhost:3000/api/v1/newEvent", {
  method: "POST",
  body: JSON.stringify({
    "apikey": "<YOUR_API_KEY>",
    "projectId": "${projectId}",
    "eventId": "${eventId}",
    "discordUserId": "${username}",
    "message": "${message}"
  }),
});`;

  return (
    <>
      <div className="absolute z-2 min-w-screen">
        <DashNav title="Manage event" />
      </div>
      <div className="flex flex-row">
        <Sidebar
          active="Manage projects"
          menuItems={menuItems}
          otherItems={otherItems}
        />
        <div className="min-h-screen border-r-[0.5px] border-[#C8CBD9] w-[310px] p-8">
          <div className="max-h-[80vh] mt-20 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <h2 className={`text-sm text-[#5A67BA] mt-8 ${PoppinsFontBold.className}`}>
              Event info
            </h2>
            <h2 className={`text-sm text-[#5A67BA] mt-8 ${PoppinsFontBold.className}`}>
              {eventData.name}
            </h2>
            <h2 className={`text-sm text-[#5A67BA] mt-5 ${PoppinsFontMedium.className}`}>
              {eventData.description}
            </h2>
            <h2 className={`text-sm text-[#5A67BA] mt-7 ${PoppinsFontMedium.className}`}>
              Change event type
            </h2>
            <select
              className="mt-5 h-[40px] w-full px-3 py-2 rounded-md bg-gray-100 text-gray-700 text-sm focus:outline-none"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">-- Choose service --</option>
              <option value="discord">Discord</option>
              <option value="whatsapp" disabled>WhatsApp</option>
              <option value="email" disabled>Email</option>
            </select>
            <div className="mt-7">
              <DiscordSvg width={58} height={58} />
            </div>
            <h2 className={`text-sm text-[#5A67BA] mt-5 ${PoppinsFontMedium.className}`}>
              Event service: <span className={`${PoppinsFontBold.className}`}>Discord</span>
            </h2>
            <h2 className={`text-sm text-[#818181] mt-7 ${PoppinsFontMedium.className}`}>
              Enter username
            </h2>
            <input
              type="text"
              placeholder="@username"
              className="mt-5 w-full px-3 py-2 rounded-md bg-gray-100 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <h2 className={`text-sm text-[#818181] mt-7 ${PoppinsFontMedium.className}`}>
              Message to be sent
            </h2>
            <textarea
              placeholder="Message"
              className="mt-5 h-30 w-full px-3 py-2 rounded-md bg-gray-100 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div
              className={`h-10 w-full bg-[#D5E4FF] flex items-center justify-center rounded-md text-[#818181] text-sm ${PoppinsFontMedium.className} cursor-pointer mt-5`}
              onClick={() => {
                localStorage.setItem(`event_${eventId}_username`, username);
                localStorage.setItem(`event_${eventId}_message`, message);
                localStorage.setItem(`event_${eventId}_service`, service);
                alert("Event info saved!");
              }}
            >
              Apply changes
            </div>
          </div>
        </div>

        {/* Right Panel for Events */}
        <div className="w-[30vw] min-h-screen border-r-[0.5px] border-[#C8CBD9] p-8">
          <div className="max-h-[80vh] mt-20 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <h2 className={`text-sm text-[#5A67BA] mt-8 ${PoppinsFontBold.className}`}>
              Occurred events (total {events.length})
            </h2>
            <div className="mt-10">
              {events.map((event, idx) => (
                <NotificationCard
                  key={idx}
                  title={event.title}
                  description={event.description}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Code Panel */}
        <div className="w-[30vw]">
          <div className="mt-25 p-10">
            <div className="flex justify-end">
              <div className="w-full bg-[#101827] rounded-[22px]">
                <div className="header h-12 bg-[#161F2D] border rounded-tl-[22px] rounded-tr-[22px]"></div>
                <div className="code overflow-x-auto rounded-b-[22px] custom-scrollbar">
                  <SyntaxHighlighter
                    language="typescript"
                    style={{
                      ...oneDark,
                      'pre[class*="language-"]': {
                        ...oneDark['pre[class*="language-"]'],
                        background: "transparent",
                      },
                      'code[class*="language-"]': {
                        ...oneDark['code[class*="language-"]'],
                        background: "transparent",
                      },
                    }}
                    customStyle={{
                      fontSize: "14px",
                      lineHeight: "1.4",
                      margin: 0,
                      padding: "1rem",
                      minWidth: "100%",
                    }}
                  >
                    {codeSnippet}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageEvent;
