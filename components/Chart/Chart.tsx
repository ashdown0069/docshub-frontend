"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  calStoragePercentage,
  convertFileSize,
  convertStorageSizeTextByPlan,
} from "@/lib/utils";

const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Used",
    color: "white",
  },
} satisfies ChartConfig;

export const Chart = ({
  used,
  maximum,
  plan,
}: {
  used: number;
  maximum: number;
  plan: "free" | "team" | "enterprise";
}) => {
  const percentage = calStoragePercentage(used, maximum);
  const chartData = [{ storage: "used", 10: used, fill: "white" }];
  return (
    <Card className="flex h-72 items-center rounded-2xl bg-brand-200 p-5 text-white md:flex-row">
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-[180px] text-white xl:w-[200px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0} // Start from the top
            endAngle={percentage * 3.6} // Convert percentage to degrees
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-white/20 last:fill-brand-200"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="storage"
              background
              cornerRadius={10}
              maxBarSize={30} // Limit the bar size to prevent overflow
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-3xl font-bold"
                        >
                          {percentage
                            ? percentage.toString().replace(/^0+/, "")
                            : "0"}
                          %
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white/70"
                        >
                          Space used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardHeader className="mt-2 flex-1 items-start px-3 py-0 sm:px-5 lg:p-3 xl:pr-5">
        <CardTitle className="font-bold md:text-center lg:text-left">
          Available Storage
        </CardTitle>
        <CardDescription className="mt-2 w-full text-left text-white/70">
          {used == 0 ? 0 : convertFileSize(used, 3)} /{" "}
          {convertStorageSizeTextByPlan(plan)}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
