"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Pie, PieChart } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const cards: { title: string; number: string; spanTxt?: string }[] = [
  {
    title: "Total Emissions",
    number: "230,230",
  },
  {
    title: "Number of Employees",
    number: "2,230",
    spanTxt: "People",
  },
  {
    title: "Emissions Per Employee",
    number: "230,234",
  },
  {
    title: "Emission per USD",
    number: "223,230",
  },
];

const scopeCards = [
  {
    title: "Scope 1",
    number: "230,230",
    chartData: [
      { month: "January", value: 186 },
      { month: "February", value: 305 },
      { month: "March", value: 237 },
      { month: "April", value: 73 },
      { month: "May", value: 209 },
      { month: "June", value: 214 },
    ],
    chartColor: "#eab308",
  },
  {
    title: "Scope 2",
    number: "230,230",
    chartData: [
      { month: "January", value: 186 },
      { month: "February", value: 305 },
      { month: "March", value: 237 },
      { month: "April", value: 73 },
      { month: "May", value: 209 },
      { month: "June", value: 214 },
    ],
    chartColor: "#84cc16",
  },
  {
    title: "Scope 3",
    number: "230,230",
    chartData: [
      { month: "January", value: 186 },
      { month: "February", value: 305 },
      { month: "March", value: 237 },
      { month: "April", value: 73 },
      { month: "May", value: 209 },
      { month: "June", value: 214 },
    ],
    chartColor: "#0ea5e9",
  },
];

const donutChartData = [
  { scope: "scope-1", visitors: 1, fill: "#fff" },
  { scope: "scope-2", visitors: 10, fill: "#994" },
];

const donutChart2Data = [
  { scope: "Cars", visitors: 1, fill: "#fff" },
  { scope: "Trucks", visitors: 2, fill: "#64748b" },
  { scope: "Buildings Electricity", visitors: 4, fill: "#f59e0b" },
  { scope: "Air Travel", visitors: 3, fill: "#22c55e" },
];

const donutChart3Data = [
  { scope: "Cars", visitors: 10, fill: "#fff" },
  { scope: "Trucks", visitors: 20, fill: "#64748b" },
  { scope: "Buildings Electricity", visitors: 30, fill: "#f59e0b" },
  { scope: "Air Travel", visitors: 40, fill: "#22c55e" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

const stackChartConfig = {
  scope1: {
    label: "Scope 1",
    color: "#10b981",
  },
  scope2: {
    label: "Scope 2",
    color: "#f59e0b",
  },
  scope3: {
    label: "Scope 3",
    color: "#ef4444",
  },
} satisfies ChartConfig;

const stackChartData = [
  { month: "January", scope1: 186, scope2: 80, scope3: 400 },
  { month: "February", scope1: 305, scope2: 200, scope3: 400 },
  { month: "March", scope1: 237, scope2: 120, scope3: 400 },
  { month: "April", scope1: 73, scope2: 190, scope3: 400 },
  { month: "May", scope1: 209, scope2: 130, scope3: 400 },
  { month: "June", scope1: 214, scope2: 140, scope3: 400 },
];

// dummy data
const topEmissionsByCategoryData = [
  {
    companyName: "Chevron Corp",
    avatar: "https://github.com/shadcn.png",
    country: "United States",
    Emission: "12098",
  },
  {
    companyName: "Chevron Corp 2",
    avatar: "https://github.com/shadcn.png",
    country: "UAE",
    Emission: "23876",
  },
  {
    companyName: "ExxonMobil",
    avatar: "https://github.com/exxonmobil.png",
    country: "United States",
    Emission: "18542",
  },
  {
    companyName: "Royal Dutch Shell",
    avatar: "https://github.com/shell.png",
    country: "Netherlands",
    Emission: "21000",
  },
  {
    companyName: "BP",
    avatar: "https://github.com/bp.png",
    country: "United Kingdom",
    Emission: "19500",
  },
  {
    companyName: "TotalEnergies",
    avatar: "https://github.com/totalenergies.png",
    country: "France",
    Emission: "18000",
  },
  {
    companyName: "Eni",
    avatar: "https://github.com/eni.png",
    country: "Italy",
    Emission: "16000",
  },
  {
    companyName: "Equinor",
    avatar: "https://github.com/equinor.png",
    country: "Norway",
    Emission: "14000",
  },
  {
    companyName: "ConocoPhillips",
    avatar: "https://github.com/conocophillips.png",
    country: "United States",
    Emission: "13000",
  },
  {
    companyName: "Occidental Petroleum",
    avatar: "https://github.com/oxy.png",
    country: "United States",
    Emission: "12000",
  },
];

const MeasurePage = ({ params }: { params: { id: string } }) => {
  function extractFirstLetters(data: string) {
    const words = data.split(" ");
    const firstLetters = words.map((word: any) => word.charAt(0));
    return firstLetters.join("");
  }

  return (
    <main className="px-16 py-4 w-full h-full space-y-6">
      {/* Top bar */}
      <>
        <div className="flex justify-between">
          <h1>Measure Emissions</h1>
          <Select>
            <SelectTrigger className="max-w-[250px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </>

      {/* Static 4 bars */}
      <>
        <div className="w-full grid grid-cols-4 gap-4">
          {cards.map((value, idx) => (
            <SingleCard key={idx} {...value} />
          ))}
        </div>
      </>

      {/* Dynamic Datas */}
      <>
        <div className="w-full grid grid-cols-2 gap-4">
          {/* Left: 4 charts (incl 1 donut), 1 stack chart */}
          <div className="w-full rounded-md">
            {/* Top 4 */}
            <>
              <div className="grid grid-cols-4 gap-4">
                {scopeCards.map((item, idx) => (
                  <ScopeCard item={item} key={idx} />
                ))}
                <div className="p-4 rounded-md bg-muted">
                  <p className="text-lg">Others</p>
                  <ChartContainer config={chartConfig} className="mx-auto">
                    <PieChart className="h-full w-full">
                      <Pie
                        data={donutChartData}
                        dataKey="visitors"
                        nameKey="scope"
                        innerRadius={20}
                        strokeWidth={0.5}
                      ></Pie>
                    </PieChart>
                  </ChartContainer>
                </div>
              </div>
            </>

            {/* Stack chart */}
            <div className="p-4 my-6 rounded-md bg-muted mt-6">
              <ChartContainer config={stackChartConfig}>
                <BarChart accessibilityLayer data={stackChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="scope1"
                    stackId="a"
                    fill="var(--color-scope1)"
                    radius={[0, 0, 4, 4]}
                  />
                  <Bar
                    dataKey="scope2"
                    stackId="a"
                    fill="var(--color-scope2)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="scope3"
                    stackId="a"
                    fill="var(--color-scope3)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          {/* Right: 2 donut charts, top emission by companies */}
          <div className="w-full">
            {/* 2 cards with donut charts */}
            <div className="grid grid-cols-2 gap-4">
              <ScrollArea className="p-4 rounded-md bg-muted h-[35vh]">
                <div className="flex flex-col items-center w-full">
                  <p className="text-lg">Total Emission by Category</p>
                  <div className="w-1/2">
                    <ChartContainer config={chartConfig} className="mx-auto">
                      <PieChart className="h-full w-full">
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={donutChart2Data}
                          dataKey="visitors"
                          nameKey="scope"
                          innerRadius={20}
                          strokeWidth={0.5}
                          height={10}
                          width={10}
                        ></Pie>
                      </PieChart>
                    </ChartContainer>
                  </div>
                </div>
                {/* Data Show */}
                <div className="w-full flex flex-col space-y-2">
                  {donutChart2Data.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-md bg-zinc-900 flex items-center justify-between p-4"
                    >
                      <div className="flex items-center">
                        <div
                          className={`p-4 rounded-md`}
                          style={{ backgroundColor: item.fill }}
                        ></div>
                        <p className="text-lg ml-2">{item.scope}</p>
                      </div>
                      <p className="text-lg">{item.visitors}</p>{" "}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <ScrollArea className="p-4 rounded-md bg-muted h-[35vh]">
                <div className="flex flex-col items-center w-full">
                  <p className="text-lg">Top Emissions By Type</p>
                  <div className="w-1/2">
                    <ChartContainer config={chartConfig} className="mx-auto">
                      <PieChart className="h-full w-full">
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={donutChart3Data}
                          dataKey="visitors"
                          nameKey="scope"
                          innerRadius={20}
                          strokeWidth={0.5}
                          height={10}
                          width={10}
                        ></Pie>
                      </PieChart>
                    </ChartContainer>
                  </div>
                </div>
                {/* Data Show */}
                <div className="w-full flex flex-col space-y-2">
                  {donutChart3Data.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-md bg-zinc-900 flex items-center justify-between p-4"
                    >
                      <div className="flex items-center">
                        <div
                          className={`p-4 rounded-md`}
                          style={{ backgroundColor: item.fill }}
                        ></div>
                        <p className="text-lg ml-2">{item.scope}</p>
                      </div>
                      <p className="text-lg">{item.visitors} %</p>{" "}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <ScrollArea className="p-4 rounded-md bg-muted h-[37.8vh] mt-6">
              <div className="flex flex-col w-full">
                <p className="text-2xl mb-2">Top Emissions by Category</p>
                {topEmissionsByCategoryData.map((item, idx) => (
                  <div className="w-full bg-zinc-900 mb-2 shadow-xl rounded-md p-4 grid grid-cols-5">
                    <div className="col-span-4 flex rounded-md items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={item.avatar} alt="@shadcn" />
                        <AvatarFallback>
                          {extractFirstLetters(item.companyName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-lg">{item.companyName}</p>
                        <p className="text-md text-muted-foreground">
                          {item.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-xl font-semibold items-center justify-end">
                      {item.Emission} kg
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </>

      {/*  */}
    </main>
  );
};

export default MeasurePage;

const SingleCard = ({
  title,
  number,
  spanTxt,
}: {
  title: string;
  number: string;
  spanTxt?: string;
}) => {
  return (
    <div className="w-full p-6 bg-muted rounded-md">
      <p className="text-lg">{title}</p>
      <p className="text-2xl">
        {number} <span className="text-lg">{spanTxt}</span>
      </p>
    </div>
  );
};

const ScopeCard = ({ item }: any) => {
  return (
    <div className="p-4 bg-muted rounded-md grid grid-cols-2 gap-2">
      <div className="flex flex-col items-center justify-between">
        <p className="text-lg">{item.title}</p>
      </div>
      <ChartContainer
        config={{
          value: {
            label: "value",
            color: item.chartColor,
          },
        }}
      >
        <LineChart data={item.chartData}>
          <CartesianGrid vertical={false} />
          <Line
            dataKey="value"
            type="linear"
            stroke={item.chartColor}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
      <p className="text-4xl col-span-2">{item.number}</p>
    </div>
  );
};
