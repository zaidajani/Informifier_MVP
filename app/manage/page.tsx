"use client";

import DashNav from "../components/dashnav";
import Sidebar from "../components/sidebar";
import { useAuth, useUser } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { HexColorPicker } from "react-colorful";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, Fragment, useRef, useMemo } from "react";
import { useRouter } from "next/navigation"; // ✅ NEW
import ManageDashboard from "../components/manageDashboard";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Plus,
  Gem,
  User,
  HelpCircle,
  FileBox,
  ArrowBigLeft,
} from "lucide-react";

const PoppinsFontBold = Poppins({ weight: "700", subsets: ["latin"] });
const PoppinsFontMedium = Poppins({ weight: "400", subsets: ["latin"] });
const PoppinsFontRegular = Poppins({ weight: "500", subsets: ["latin"] });

import { ChartConfig } from "@/components/ui/chart";

const dashboardMetrics = [
  { label: "Events\nOccurred", value: 56 },
  { label: "Total\nEvents", value: 3 },
  { label: "Search\nDocs", value: "" }, // Last metric is the icon
];

const dashboardChartData = [
  { month: "12 Jun", desktop: 7 },
  { month: "17 Jun", desktop: 9 },
  { month: "22 Jun", desktop: 5 },
  { month: "27 Jun", desktop: 6 },
  { month: "01 Jul", desktop: 9 },
  { month: "07 Jul", desktop: 11 },
  { month: "12 Jul", desktop: 5 },
];

const dashboardChartConfig: ChartConfig = {
  desktop: {
    label: "Events",
    color: "var(--chart-1)",
  },
};

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

function Dashboard() {
  const router = useRouter(); // ✅ NEW
  const { user } = useUser();
  const { getToken } = useAuth();
  const [arrayData, setArrayData] = useState<{ name: string; _id: string }[]>(
    []
  );
  const [selected, setSelected] = useState<{
    name: string;
    _id: string;
  } | null>(null);
  const [eventsArray, setEventsArray] = useState<
    { name: string; _id: string; color: string }[]
  >([]);
  const [newSelect, setNewSelect] = useState(false);
  const [eventName, setEventName] = useState("");
  const [dashboardData, setDashboardData] = useState<{
    eventOccurred: any[];
  } | null>(null);
  const [description, setDescription] = useState("");
  const [service, setService] = useState("");
  const [color, setColor] = useState("#6071D4");
  type Metric = {
    label: string;
    value: string | number;
  };

  const [metricState, setMetricState] = useState<Metric[]>([
    { label: "Events\nOccurred", value: 0 },
    { label: "Total\nProjects", value: 0 },
    { label: "Search\nDocs", value: "" },
  ]);

  const firstRender = useRef(true);

  useEffect(() => {
    if (user) {
      const fetchInfo = async () => {
        const token = await getToken();
        const res = await fetch(`/api/projects/${user?.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setArrayData(data.projects);
          setSelected(data.projects[0] ?? null);
        } else {
          console.log("error");
        }
      };

      fetchInfo();
    }
  }, [user, getToken]);

  const fetchEventData = async (projectId: string) => {
    try {
      const token = await getToken();
      console.log(token);
      const res = await fetch(`/api/projects/events/${projectId}/${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setEventsArray(data.events);
      } else {
        console.error("Failed to fetch events data");
      }
    } catch (error) {
      console.error("Error fetching events data:", error);
    }
  };

  useEffect(() => {
    const fetchAllEvents = async () => {
      if (!selected?._id || !user?.id) return;

      try {
        const token = await getToken();

        const dashRes = await fetch(
          `/api/projects/events/${selected._id}/${user.id}/getAllEvents`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dashData = await dashRes.json();
        setDashboardData(dashData);

        setMetricState([
          {
            label: "Events\nOccurred",
            value: dashData?.eventOccurred?.length ?? 0,
          },
          {
            label: "Total\nProjects",
            value: arrayData?.length ?? 0,
          },
          {
            label: "Search\nDocs",
            value: "", // placeholder
          },
        ]);

        if (!dashRes.ok) {
          console.error("Failed to get all events:", dashRes.status, dashData);
        }
      } catch (error) {
        console.error("Error fetching all events:", error);
      }
    };

    fetchAllEvents();
  }, [selected, user, getToken, arrayData]);

  useEffect(() => {
    if (selected?._id) {
      fetchEventData(selected._id);
    }
  }, [selected, user, getToken]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  const submit = async () => {
    try {
      if (!selected?._id || !user?.id) {
        console.error("Missing selected project ID or user ID.");
        return;
      }

      const token = await getToken();

      const response = await fetch(
        `/api/projects/events/${selected._id}/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: eventName,
            description,
            service,
            color,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create event:", response.status, errorData);
        return;
      }

      // Reset form and switch back
      setEventName("");
      setDescription("");
      setService("");
      setColor("#6071D4");
      setNewSelect(false);

      // Fetch updated events
      await fetchEventData(selected._id);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleSubmit = () => {
    if (!eventName || !description || !service || !color) {
      console.warn("All fields must be filled before submitting.");
      return;
    }

    submit();
  };

  return (
    <>
      <div className="absolute z-2 min-w-screen">
        <DashNav title="Manage Projects" />
      </div>
      <div className="flex flex-row">
        <Sidebar
          active="Manage projects"
          menuItems={menuItems}
          otherItems={otherItems}
        />
        <div className="min-h-screen border-r-[0.5px] border-[#C8CBD9] w-[260px] p-8">
          <div className="flex flex-col mt-20">
            <h2
              className={`text-[#5A67BA] text-s font-semibold ${PoppinsFontMedium.className}`}
            >
              Created projects
            </h2>
            <div className="mt-10">
              {arrayData.map((pro, index) => (
                <Fragment key={index}>
                  <div
                    className={`
                      h-15 w-[200px] text-[14px] mt-5 flex flex-row p-3 items-center 
                      rounded-md cursor-pointer gap-3 
                      ${PoppinsFontRegular.className}
                      ${
                        selected?.name === pro?.name
                          ? "bg-[#E4E7F4] text-[#5B6AC7] hover:bg-[#EFEFEF]"
                          : "bg-[#EFEFEF] text-[#5B6AC7] hover:bg-[#E4E7F4]"
                      }
                    `}
                    onClick={() => setSelected(pro)}
                  >
                    <FileBox />
                    {pro?.name}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row h-[87vh] overflow-y-auto mt-auto  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="w-[43vw] px-10 mt-4">
            <h2
              className={`text-[#5A67BA] text-s font-semibold ${PoppinsFontMedium.className}`}
            >
              Project dashboard for{" "}
              <span className={`${PoppinsFontBold.className}`}>
                {selected?.name}
              </span>
            </h2>
            {dashboardData && selected && (
              <ManageDashboard
                key={selected._id} // ✅ Force re-render on project change
                description={(selected as any)?.description ?? ""}
                metrics={metricState}
                chartTitle="Occurred events (lifetime)"
                chartData={Object.entries(
                  dashboardData.eventOccurred.reduce(
                    (
                      acc: Record<string, { count: number; rawDate: string }>,
                      curr: any
                    ) => {
                      const date = new Date(curr.timestamp);
                      const day = String(date.getDate()).padStart(2, "0");
                      const month = date.toLocaleString("en-US", {
                        month: "short",
                      });
                      const key = `${day} ${month}`;
                      const rawDate = date.toISOString(); // for sorting
                      acc[key] = acc[key] || { count: 0, rawDate };
                      acc[key].count += 1;
                      return acc;
                    },
                    {}
                  )
                )
                  .map(([month, { count, rawDate }]) => ({
                    month,
                    desktop: count,
                    rawDate,
                  }))
                  .sort(
                    (a, b) =>
                      new Date(a.rawDate).getTime() -
                      new Date(b.rawDate).getTime()
                  ) // ✅ oldest first
                  .map(({ rawDate, ...rest }) => rest)}
                chartConfig={dashboardChartConfig}
              />
            )}
            <div className="h-30"></div>
          </div>
        </div>
        <div className="border-r-[0.5px] border-[#C8CBD9] h-[100vh]" />
        <div className="relative flex overflow-hidden">
          <AnimatePresence mode="wait">
            {newSelect ? (
              <motion.div
                key="create-form"
                initial={
                  firstRender.current ? undefined : { x: "100px", opacity: 0 }
                }
                animate={{ x: "0px", opacity: 1 }}
                exit={
                  firstRender.current ? undefined : { x: "100px", opacity: 0 }
                }
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-[20vw] p-10 relative overflow-hidden"
              >
                <h2
                  className={`text-[#5A67BA] text-s font-semibold mt-20 mb-10 ${PoppinsFontMedium.className}`}
                >
                  Create a new event.
                </h2>

                <div className="max-h-[70vh] overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  <button
                    className={`flex items-center justify-center gap-5 h-[40px] w-full bg-[#F1F2FC] text-[#6071D4] rounded-md px-3 py-2 mt-5 ${PoppinsFontMedium.className} text-sm cursor-pointer`}
                    onClick={() => setNewSelect(false)}
                  >
                    <ArrowBigLeft />
                    <span>Go back</span>
                  </button>

                  <input
                    type="text"
                    placeholder="Name of the event"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full mt-5 px-3 py-2 h-[40px] rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-0 focus:border-transparent"
                  />

                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-5 h-[120px] w-full px-3 py-2 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-0 focus:border-transparent"
                  />

                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="mt-5 h-[40px] w-full px-3 py-2 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-0 focus:border-transparent"
                  >
                    <option value="">-- Choose service --</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="discord">Discord</option>
                    <option value="email">Email</option>
                  </select>

                  <div className="w-full">
                    <div className="w-full h-[40px] bg-[#F6F6FB] mt-5 rounded-md text-[#012E60] px-3 py-2 flex flex-row items-center justify-between">
                      {color}
                      <div
                        className="w-[40px] h-[30px] rounded"
                        style={{ backgroundColor: color }}
                      ></div>
                    </div>
                    <HexColorPicker
                      color={color}
                      onChange={setColor}
                      className="mt-5"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className={`flex items-center justify-center gap-5 h-[40px] w-full bg-[#F1F2FC] text-[#6071D4] rounded-md px-3 py-2 mt-5 ${PoppinsFontMedium.className} text-sm cursor-pointer`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create event</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="event-types"
                initial={
                  firstRender.current ? undefined : { x: "-100px", opacity: 0 }
                }
                animate={{ x: "0px", opacity: 1 }}
                exit={
                  firstRender.current ? undefined : { x: "-100px", opacity: 0 }
                }
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col mt-10"
              >
                <h2
                  className={`text-[#5A67BA] text-s font-semibold mt-18 mb-20 ml-15 ${PoppinsFontMedium.className}`}
                >
                  Event types
                </h2>
                <div className="flex flex-col w-[20vw] max-h-[70vh] items-center gap-5 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {eventsArray.map((event, index) => (
                    <div
                      key={index}
                      className="w-[12vw] h-[200px] flex-none rounded-3xl text-white p-5 cursor-pointer"
                      style={{ backgroundColor: event.color }}
                      onClick={() =>
                        router.push(`/manage/${selected?._id}/${event._id}`)
                      } // ✅ NEW
                    >
                      <h2
                        className={`text-white text-base font-semibold ${PoppinsFontRegular.className}`}
                      >
                        {event.name}
                      </h2>
                    </div>
                  ))}
                  <div
                    className="w-[12vw] h-[200px] flex-none bg-[#E4E4E4] rounded-3xl text-white p-5 cursor-pointer"
                    onClick={() => setNewSelect(true)}
                  >
                    <h2
                      className={`text-[black] text-base font-semibold ${PoppinsFontRegular.className}`}
                    >
                      Create a new event.
                    </h2>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
