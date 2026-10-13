import { Layout } from "antd";
import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { COFFEE_COLORS } from "@/constants/theme";

import Header from "./Header";
import Sidebar from "./Sidebar";

const { Content } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed || isMobile} />
      <Layout>
        <Header
          collapsed={collapsed || isMobile}
          onToggle={() => setCollapsed((prev) => !prev)}
          title={title}
        />
        <Content
          style={{
            margin: 20,
            minHeight: 280,
            background: COFFEE_COLORS.cream,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
