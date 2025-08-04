"use client";

import DashNav from "../components/dashnav";
import Sidebar from "../components/sidebar";
import * as React from "react";
import { Poppins } from "next/font/google";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Gem,
  User,
  HelpCircle,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const pieChartData = [
  { events: "Doc Open", eventsOccurred: 275, fill: "#5967BA" },
  { events: "Signup", eventsOccurred: 200, fill: "rgba(38, 169, 149, 1)" },
  { events: "Payment", eventsOccurred: 187, fill: "#a7aed5ff" },
];

const pieChartData2 = [
  { events: "Register", eventsOccurred: 220, fill: "#ffd82bff" },
  { events: "Login", eventsOccurred: 180, fill: "#ff7f50" },
  { events: "Logout", eventsOccurred: 120, fill: "#87cefa" },
  { events: "Error", eventsOccurred: 75, fill: "#da70d6" },
];

// Sample chart data
const chartData = [
  { date: "2024-04-01", desktop: 222 },
  { date: "2024-04-01", desktop: 222 },
  { date: "2024-04-01", desktop: 222 },
  { date: "2024-04-02", desktop: 97 },
  { date: "2024-04-02", desktop: 97 },
  { date: "2024-04-02", desktop: 97 },
  { date: "2024-04-03", desktop: 167 },
  { date: "2024-04-03", desktop: 167 },
  { date: "2024-04-03", desktop: 167 },
  { date: "2024-04-04", desktop: 242 },
  { date: "2024-04-04", desktop: 242 },
  { date: "2024-04-04", desktop: 242 },
  { date: "2024-04-05", desktop: 373 },
  { date: "2024-04-05", desktop: 373 },
  { date: "2024-04-05", desktop: 373 },
  { date: "2024-04-06", desktop: 301 },
  { date: "2024-04-06", desktop: 301 },
  { date: "2024-04-06", desktop: 301 },
  { date: "2024-04-07", desktop: 245 },
  { date: "2024-04-07", desktop: 245 },
  { date: "2024-04-07", desktop: 245 },
  { date: "2024-04-08", desktop: 409 },
  { date: "2024-04-08", desktop: 409 },
  { date: "2024-04-08", desktop: 409 },
  { date: "2024-04-09", desktop: 59 },
  { date: "2024-04-09", desktop: 59 },
  { date: "2024-04-09", desktop: 59 },
  { date: "2024-04-10", desktop: 261 },
  { date: "2024-04-10", desktop: 261 },
  { date: "2024-04-10", desktop: 261 },
  { date: "2024-04-01", desktop: 222 },
  { date: "2024-04-01", desktop: 222 },
  { date: "2024-04-01", desktop: 222 },
  { date: "2024-04-02", desktop: 97 },
  { date: "2024-04-02", desktop: 97 },
  { date: "2024-04-02", desktop: 97 },
  { date: "2024-04-03", desktop: 167 },
  { date: "2024-04-03", desktop: 167 },
  { date: "2024-04-03", desktop: 167 },
  { date: "2024-04-04", desktop: 242 },
  { date: "2024-04-04", desktop: 242 },
  { date: "2024-04-04", desktop: 242 },
  { date: "2024-04-05", desktop: 373 },
  { date: "2024-04-05", desktop: 373 },
  { date: "2024-04-05", desktop: 373 },
  { date: "2024-04-06", desktop: 301 },
  { date: "2024-04-06", desktop: 301 },
  { date: "2024-04-06", desktop: 301 },
  { date: "2024-04-07", desktop: 245 },
  { date: "2024-04-07", desktop: 245 },
  { date: "2024-04-07", desktop: 245 },
  { date: "2024-04-08", desktop: 409 },
  { date: "2024-04-08", desktop: 409 },
  { date: "2024-04-08", desktop: 409 },
  { date: "2024-04-09", desktop: 59 },
  { date: "2024-04-09", desktop: 59 },
  { date: "2024-04-09", desktop: 59 },
  { date: "2024-04-10", desktop: 261 },
  { date: "2024-04-10", desktop: 261 },
  { date: "2024-04-10", desktop: 261 },
  { date: "2024-04-01", desktop: 222 },
  { date: "2024-04-01", desktop: 222 },
  { date: "2024-04-01", desktop: 222 },
  { date: "2024-04-02", desktop: 97 },
  { date: "2024-04-02", desktop: 97 },
  { date: "2024-04-02", desktop: 97 },
  { date: "2024-04-03", desktop: 167 },
  { date: "2024-04-03", desktop: 167 },
  { date: "2024-04-03", desktop: 167 },
  { date: "2024-04-04", desktop: 242 },
  { date: "2024-04-04", desktop: 242 },
  { date: "2024-04-04", desktop: 242 },
  { date: "2024-04-05", desktop: 373 },
  { date: "2024-04-05", desktop: 373 },
  { date: "2024-04-05", desktop: 373 },
  { date: "2024-04-06", desktop: 301 },
  { date: "2024-04-06", desktop: 301 },
  { date: "2024-04-06", desktop: 301 },
  { date: "2024-04-07", desktop: 245 },
  { date: "2024-04-07", desktop: 245 },
  { date: "2024-04-07", desktop: 245 },
  { date: "2024-04-08", desktop: 409 },
  { date: "2024-04-08", desktop: 409 },
  { date: "2024-04-08", desktop: 409 },
  { date: "2024-04-09", desktop: 59 },
  { date: "2024-04-09", desktop: 59 },
  { date: "2024-04-09", desktop: 59 },
  { date: "2024-04-10", desktop: 261 },
  { date: "2024-04-10", desktop: 261 },
  { date: "2024-04-10", desktop: 261 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#5967BA",
  },
} satisfies ChartConfig;

const chartConfigPie = {
  eventsOccurred: {
    label: "Events Occurred",
  },
  "Doc Open": {
    label: "Doc Open",
    color: "hsl(var(--chart-1))",
  },
  Signup: {
    label: "Signup",
    color: "hsl(var(--chart-2))",
  },
  Payment: {
    label: "Payment",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

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
  const activeChart: keyof typeof chartConfig = "desktop";

  const total = {
    desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
  };

  return (
    <>
      <div className="absolute w-full">
        <DashNav title="Dashboard" />
      </div>
      <div className="flex flex-row">
        <Sidebar
          active="Dashboard"
          menuItems={menuItems}
          otherItems={otherItems}
        />
        <div className="flex flex-col">
          <div className="flex flex-row gap-8">
            <div className="flex flex-col mt-40 ml-15">
              <div
                className={`h-25 w-45 bg-[#EFEFEF] flex items-center justify-center text-4xl rounded-xl text-[#5A67BA] ${PoppinsFontRegular.className}`}
              >
                23
              </div>
              <p
                className={`mt-10 text-md ${PoppinsFontMedium.className} text-[#132283]`}
              >
                Events Occurred <br /> Today
              </p>
            </div>
            <div className="flex flex-col mt-40">
              <div
                className={`h-25 w-45 bg-[#EFEFEF] flex items-center justify-center text-4xl rounded-xl text-[#5A67BA] ${PoppinsFontRegular.className}`}
              >
                223
              </div>
              <p
                className={`mt-10 text-md ${PoppinsFontMedium.className} text-[#132283]`}
              >
                Total events
                <br /> Occurred
              </p>
            </div>
            <div className="flex flex-col mt-40">
              <div
                className={`h-25 w-45 bg-[#EFEFEF] flex items-center justify-center text-4xl rounded-xl text-[#5A67BA] ${PoppinsFontRegular.className}`}
              >
                1
              </div>
              <p
                className={`mt-10 text-md ${PoppinsFontMedium.className} text-[#132283]`}
              >
                Total projects
              </p>
            </div>
            <div className="flex flex-col mt-40">
              <div
                className={`h-25 w-45 bg-[#EFEFEF] flex items-center justify-center text-4xl rounded-xl text-[#5A67BA] ${PoppinsFontRegular.className}`}
              >
                3
              </div>
              <p
                className={`mt-10 text-md ${PoppinsFontMedium.className} text-[#132283]`}
              >
                Total events
              </p>
            </div>
            <div className="flex flex-col mt-40">
              <div
                className={`h-25 w-45 bg-[#EFEFEF] flex items-center justify-center text-4xl rounded-xl text-[#5A67BA] ${PoppinsFontRegular.className} cursor-pointer`}
              >
                Doc
              </div>
              <p
                className={`mt-10 text-md ${PoppinsFontMedium.className} text-[#132283]`}
              >
                Search <br />
                Documentation
              </p>
            </div>
          </div>
          <div className="mt-20 ml-15">
            <Card>
              <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                  <CardTitle>Events Occurred</CardTitle>
                  <CardDescription>
                    No of events occurred every day (last 30 days)
                  </CardDescription>
                </div>
                <div className="flex">
                  <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                    <span className="text-xs text-muted-foreground">
                      Events (30 days)
                    </span>
                    <span className="text-lg font-bold leading-none sm:text-3xl">
                      {total.desktop.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-2 sm:p-6">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[150px]"
                          nameKey="views"
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            });
                          }}
                        />
                      }
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={0}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          <div>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
