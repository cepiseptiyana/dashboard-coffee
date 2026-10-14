import ReactECharts from "echarts-for-react";
import { CHART_PALETTE, COFFEE_COLORS } from "@/constants/theme";
import type { ProductCategorySales } from "@/types";

interface ProductPieChartProps {
  data: ProductCategorySales[];
}

export default function ProductPieChart({ data }: ProductPieChartProps) {
  const option = {
    color: CHART_PALETTE,
    tooltip: {
      trigger: "item",
      backgroundColor: COFFEE_COLORS.espresso,
      textStyle: { color: COFFEE_COLORS.cream },
    },
    legend: {
      orient: "horizontal",
      right: 4,
      bottom: 0,
      // top: "middle",
      textStyle: { color: COFFEE_COLORS.ink, fontSize: 12 },
    },
    series: [
      {
        name: "Kategori Produk",
        type: "pie",
        radius: ["39%", "72%"],
        center: ["50%", "40%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: COFFEE_COLORS.creamCard,
          borderWidth: 2,
        },
        label: { show: false },
        data: data.map((d) => ({ name: d.category, value: d.value })),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}
