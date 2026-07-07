import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Layout, Space, Typography } from "antd";
import { COFFEE_COLORS } from "@/constants/theme";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  title: string;
}

export default function Header({ collapsed, onToggle, title }: HeaderProps) {
  return (
    <AntHeader
      style={{
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${COFFEE_COLORS.latte}22`,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Space size={16}>
        <span
          onClick={onToggle}
          style={{ fontSize: 18, cursor: "pointer", color: COFFEE_COLORS.ink }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
        <Text
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 600,
            color: COFFEE_COLORS.ink,
          }}
        >
          {title}
        </Text>
      </Space>
      <Space size={20}>
        <Badge count={3} size="small">
          <BellOutlined style={{ fontSize: 18, color: COFFEE_COLORS.ink }} />
        </Badge>
        <Space size={8}>
          <Avatar style={{ backgroundColor: COFFEE_COLORS.crema }}>AB</Avatar>
          <div style={{ lineHeight: 1.2 }}>
            <Text strong style={{ display: "block", fontSize: 13 }}>
              Andi Barista
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Store Manager
            </Text>
          </div>
        </Space>
      </Space>
    </AntHeader>
  );
}
