import {
  CoffeeOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Tooltip, Modal } from "antd";
import { useRouter } from "next/router";

import { ROUTES } from "@/routes/route";
import { MAIN_MENU } from "@/constants/menu";
import { COFFEE_COLORS } from "@/constants/theme";
import { removeToken } from "@/utils/auth";

const { Sider } = Layout;

const ICON_MAP: Record<string, React.ReactNode> = {
  DashboardOutlined: <DashboardOutlined />,
  CoffeeOutlined: <CoffeeOutlined />,
  ShoppingCartOutlined: <ShoppingCartOutlined />,
  TeamOutlined: <TeamOutlined />,
};

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const router = useRouter();
  const MainMenuItems = [];

  for (const menu of MAIN_MENU) {
    MainMenuItems.push({
      key: menu.key,
      icon: ICON_MAP[menu.icon],
      label: menu.label,
    });
  }

  function logoutUser() {
    Modal.confirm({
      title: "Apakah Anda yakin?",
      content: "Tindakan ini tidak dapat dibatalkan.",
      okText: "Ya",
      cancelText: "Batal",
      onOk() {
        console.log("User klik Ya");
        removeToken();
        router.push(ROUTES.LOGIN);
      },
      onCancel() {
        console.log("User klik Batal");
      },
    });
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      width={230}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          height: 56,
          margin: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: 10,
          paddingLeft: collapsed ? 0 : 8,
          color: COFFEE_COLORS.cream,
        }}
      >
        <CoffeeOutlined style={{ fontSize: 26, color: COFFEE_COLORS.crema }} />
        {!collapsed && (
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 0.3,
              whiteSpace: "nowrap",
            }}
          >
            Kopi Nusantara
          </span>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[router.pathname]}
        items={MainMenuItems}
        onClick={({ key }) => router.push(key)}
      />

      <div
        style={{
          padding: 12,
          borderTop: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <Tooltip title={collapsed ? "Keluar" : ""} placement="right">
          <Button
            type="text"
            block
            onClick={logoutUser}
            icon={<LogoutOutlined />}
            style={{
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: 10,
              paddingInline: collapsed ? 0 : 16,
              color: COFFEE_COLORS.cream,
              fontWeight: 500,
              borderRadius: 10,
            }}
          >
            {!collapsed && "Keluar"}
          </Button>
        </Tooltip>
      </div>
    </Sider>
  );
}
