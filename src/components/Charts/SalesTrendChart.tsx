import ReactECharts from "echarts-for-react";
import { COFFEE_COLORS } from "@/constants/theme";
import type { SalesPoint } from "@/types";
import { formatCurrency } from "@/utils/formatters";

interface SalesTrendChartProps {
  data: SalesPoint[];
}

export default function SalesTrendChart({ data }: SalesTrendChartProps) {
  const option = {
    tooltip: {
      trigger: "axis",
      valueFormatter: undefined,
      backgroundColor: COFFEE_COLORS.espresso,
      borderWidth: 0,
      textStyle: { color: COFFEE_COLORS.cream },
    },
    grid: { left: 50, right: 20, top: 30, bottom: 30 },
    legend: {
      data: ["Pendapatan", "Cangkir Terjual"],
      top: 0,
      textStyle: { color: COFFEE_COLORS.ink },
    },
    xAxis: {
      type: "category",
      data: data.map((d) => d.date),
      axisLine: { lineStyle: { color: `${COFFEE_COLORS.latte}55` } },
      axisLabel: { color: COFFEE_COLORS.muted },
    },
    yAxis: [
      {
        type: "value",
        name: "Rp",
        axisLabel: {
          color: COFFEE_COLORS.muted,
          formatter: (val: number) => `${(val / 1000000).toFixed(1)}jt`,
        },
        splitLine: { lineStyle: { color: `${COFFEE_COLORS.latte}22` } },
      },
      {
        type: "value",
        name: "cup",
        axisLabel: { color: COFFEE_COLORS.muted },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: "Pendapatan",
        type: "line",
        smooth: true,
        yAxisIndex: 0,
        data: data.map((d) => d.revenue),
        itemStyle: { color: COFFEE_COLORS.crema },
        areaStyle: { color: `${COFFEE_COLORS.crema}22` },
        tooltip: {
          valueFormatter: (val: number) => formatCurrency(Number(val)),
        },
      },
      {
        name: "Cangkir Terjual",
        type: "line",
        smooth: true,
        yAxisIndex: 1,
        data: data.map((d) => d.cupsSold),
        itemStyle: { color: COFFEE_COLORS.coffeeBrown },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 320 }} />;
}
