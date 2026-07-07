import { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";
import { COFFEE_COLORS } from "@/constants/theme";
import type { StatSummary } from "@/types";
import { formatNumber } from "@/utils/formatters";

const { Text, Title } = Typography;

const TREND_CONFIG = {
  up: { icon: <ArrowUpOutlined />, color: COFFEE_COLORS.sage },
  down: { icon: <ArrowDownOutlined />, color: COFFEE_COLORS.rust },
  flat: { icon: <MinusOutlined />, color: COFFEE_COLORS.muted },
};

interface StatCardProps {
  stat: StatSummary;
}

export default function StatCard({ stat }: StatCardProps) {
  const trend = TREND_CONFIG[stat.trend];

  return (
    <Card
      variant="borderless"
      style={{
        borderRadius: 14,
        boxShadow: "0 2px 10px rgba(43, 27, 18, 0.06)",
      }}
      styles={{ body: { padding: "18px 20px" } }}
    >
      <Text type="secondary" style={{ fontSize: 13 }}>
        {stat.title}
      </Text>
      <div style={{ marginTop: 6, marginBottom: 8 }}>
        <Title level={3} style={{ margin: 0, color: COFFEE_COLORS.ink }}>
          {stat.prefix ? `${stat.prefix} ` : ""}
          {formatNumber(stat.value)}
          {stat.suffix ? ` ${stat.suffix}` : ""}
        </Title>
      </div>
      <Text style={{ color: trend.color, fontSize: 13 }}>
        {trend.icon} {stat.trendValue}
      </Text>
      <Text type="secondary" style={{ fontSize: 13 }}>
        {" "}
        {stat.description}
      </Text>
    </Card>
  );
}
