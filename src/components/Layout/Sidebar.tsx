import {
  CoffeeOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import { MAIN_MENU } from "@/constants/menu";
import { COFFEE_COLORS } from "@/constants/theme";

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

  const items = MAIN_MENU.map((item) => ({
    key: item.key,
    icon: ICON_MAP[item.icon],
    label: item.label,
  }));

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
        items={items}
        onClick={({ key }) => router.push(key)}
      />
    </Sider>
  );
}
