import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Layout, Space, Typography, message } from "antd";
import { COFFEE_COLORS } from "@/constants/theme";
import { useEffect, useState } from "react";

import Notification from "@/components/Notification/Notification";
import { getDataUser } from "@/services/service";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  title: string;
}

export default function Header({ collapsed, onToggle, title }: HeaderProps) {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    async function loadDashboard() {
      await Promise.all([getDataApiUser()]);
    }
    loadDashboard();
  }, []);

  async function getDataApiUser() {
    try {
      const result = await getDataUser();

      if (!result.success) {
        message.error(result.message);
        return;
      }

      console.log("result DATA : ", result.data);
      setData(result.data);
    } catch (err) {}
  }

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
        <Notification />
        <Space size={8}>
          <Avatar style={{ backgroundColor: COFFEE_COLORS.crema }}>AB</Avatar>
          <div style={{ lineHeight: 1.2 }}>
            <Text strong style={{ display: "block", fontSize: 13 }}>
              {data?.name}
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
