import { Poppins } from "next/font/google";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ResponsiveContainer } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A simple area chart";

const chartData = [
  { month: "12 Jun", desktop: 7 },
  { month: "17 Jun", desktop: 9 },
  { month: "22 Jun", desktop: 5 },
  { month: "27 Jun", desktop: 6 },
  { month: "01 Jul", desktop: 9 },
  { month: "07 Jul", desktop: 11 },
  { month: "12 Jul", desktop: 5 },
];

const chartConfig = {
  desktop: {
    label: "Events",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const PoppinsFontBold = Poppins({ weight: "700", subsets: ["latin"] });
const PoppinsFontMedium = Poppins({ weight: "400", subsets: ["latin"] });
const PoppinsFontRegular = Poppins({ weight: "500", subsets: ["latin"] });

const ArrowSVG = (
  <svg
    width="25"
    height="27"
    viewBox="0 0 25 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.8333 11.1034L21.5541 11.7965L22.2205 11.1034L21.5541 10.4102L20.8333 11.1034ZM3.16659 19.77C3.16659 20.3223 3.6143 20.77 4.16659 20.77C4.71887 20.77 5.16659 20.3223 5.16659 19.77L3.16659 19.77ZM15.6249 16.52L16.3458 17.2131L21.5541 11.7965L20.8333 11.1034L20.1124 10.4102L14.9041 15.8269L15.6249 16.52ZM20.8333 11.1034L21.5541 10.4102L16.3458 4.99358L15.6249 5.68669L14.9041 6.3798L20.1124 11.7965L20.8333 11.1034ZM20.8333 11.1034L20.8333 10.1034L10.1666 10.1034L10.1666 11.1034L10.1666 12.1034L20.8333 12.1034L20.8333 11.1034ZM4.16659 17.1034L3.16659 17.1034L3.16659 19.77L4.16659 19.77L5.16659 19.77L5.16659 17.1034L4.16659 17.1034ZM10.1666 11.1034L10.1666 10.1034C6.3006 10.1034 3.16659 13.2374 3.16659 17.1034L4.16659 17.1034L5.16659 17.1034C5.16659 14.3419 7.40516 12.1034 10.1666 12.1034L10.1666 11.1034Z"
      fill="#5A67BA"
    />
  </svg>
);

const ManageDashboard = () => {
  return (
    <>
      <p
        className={`text-sm mt-15 text-[#1C297A] w-[30vw] ${PoppinsFontMedium.className}`}
      >
        Informifier is a tool meant for SaaS owners to instantly send them
        notifications via WhatsApp, Discord or Email.
      </p>

      <div className="w-full max-w-2xl mx-auto mt-16 text-center">
        <div className="flex justify-between mt-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-[10vw] h-[60px] bg-[#EFEFEF] rounded-md flex items-center justify-center text-2xl text-[#5A67BA]">
              56
            </div>
            <p className="text-[#5A67BA] text-sm leading-tight text-center">
              Events
              <br />
              Occurred
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-[10vw] h-[60px] bg-[#EFEFEF] rounded-md flex items-center justify-center text-2xl text-[#5A67BA]">
              3
            </div>
            <p className="text-[#5A67BA] text-sm leading-tight text-center">
              Total
              <br />
              Events
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 cursor-pointer">
            <div className="w-[10vw] h-[60px] bg-[#EFEFEF] rounded-md flex items-center justify-center">
              {ArrowSVG}
            </div>
            <p className="text-[#5A67BA] text-sm leading-tight text-center">
              Search
              <br />
              Docs
            </p>
          </div>
        </div>

        {/* Chart directly without Card */}
        <div className="mt-16">
          <p
            className={`text-sm mb-10 mt-10 text-[#1C297A] text-left ${PoppinsFontMedium.className}`}
          >
            Occurred events (Last 30 days)
          </p>

          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={0}
                angle={-25} // rotate labels slightly
                textAnchor="end"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="#C3C8EC" // ✅ Custom fill color
                fillOpacity={0.5}
                stroke="#5B6AC7" // ✅ Custom outline (stroke) color
                strokeWidth={2} // ✅ Optional: make the outline a bit bolder
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </>
  );
};

export default ManageDashboard;
