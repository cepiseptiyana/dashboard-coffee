import ReactECharts from "echarts-for-react";
import { COFFEE_COLORS } from "@/constants/theme";
import type { HourlyTraffic } from "@/types";

interface HourlyTrafficChartProps {
  data: HourlyTraffic[];
}

export default function HourlyTrafficChart({ data }: HourlyTrafficChartProps) {
  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: COFFEE_COLORS.espresso,
      textStyle: { color: COFFEE_COLORS.cream },
      formatter: function (params: any) {
        const hour = params[0].name;
        const customers = params[0].value;

        return `<b>Jam: ${hour}</b><br/>Pelanggan: ${customers}`;
      },
    },
    grid: { left: 40, right: 20, top: 20, bottom: 30 },
    xAxis: {
      type: "category",
      data: data.map((d) => d.hour),
      axisLine: { lineStyle: { color: `${COFFEE_COLORS.latte}55` } },
      axisLabel: { color: COFFEE_COLORS.muted, fontSize: 11 },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: COFFEE_COLORS.muted },
      splitLine: { lineStyle: { color: `${COFFEE_COLORS.latte}22` } },
    },
    series: [
      {
        name: "Pelanggan",
        type: "bar",
        barWidth: "55%",
        data: data.map((d) => d.customers),
        itemStyle: {
          color: COFFEE_COLORS.crema,
          borderRadius: [6, 6, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: COFFEE_COLORS.espresso,
          },
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}
