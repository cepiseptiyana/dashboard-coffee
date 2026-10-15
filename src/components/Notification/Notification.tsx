import { useState } from "react";
import { Badge, Button, Empty, Popover, Typography } from "antd";
import {
  BellOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { COFFEE_COLORS } from "@/constants/theme";

const { Text } = Typography;

type NotificationType = "order" | "stock" | "customer" | "system" | "product";

interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

// Data dummy, nanti diganti dari backend
const DUMMY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    type: "order",
    title: "Pesanan baru #1042",
    description: "Rangga Pratama memesan 3 item, total Rp 78.000.",
    time: "2 menit lalu",
    read: false,
  },
  {
    id: 2,
    type: "stock",
    title: "Stok menipis",
    description: "Biji kopi Arabika Gayo tersisa 4 kg.",
    time: "25 menit lalu",
    read: false,
  },
  {
    id: 3,
    type: "customer",
    title: "Pelanggan baru bergabung",
    description: "Nadia Salsabila mendaftar sebagai member.",
    time: "1 jam lalu",
    read: false,
  },
  {
    id: 4,
    type: "product",
    title: "Produk terlaris hari ini",
    description: "Kopi Susu Gula Aren terjual 86 cup.",
    time: "3 jam lalu",
    read: true,
  },
  {
    id: 5,
    type: "system",
    title: "Laporan harian siap",
    description: "Ringkasan penjualan kemarin sudah tersedia.",
    time: "Kemarin",
    read: true,
  },
];

const TYPE_ICON: Record<
  NotificationType,
  { icon: React.ReactNode; color: string }
> = {
  order: { icon: <ShoppingCartOutlined />, color: "#1677ff" },
  stock: { icon: <WarningOutlined />, color: "#d4380d" },
  customer: { icon: <UserAddOutlined />, color: "#389e0d" },
  product: { icon: <CoffeeOutlined />, color: COFFEE_COLORS.crema },
  system: { icon: <CheckCircleOutlined />, color: "#8c8c8c" },
};

export default function Notification() {
  const [items, setItems] = useState<NotificationItem[]>(DUMMY_NOTIFICATIONS);

  const unreadCount = items.filter((item) => !item.read).length;

  const markAsRead = (id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  };

  const markAllAsRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const content = (
    <div style={{ width: 340 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        <Text strong style={{ color: COFFEE_COLORS.espresso }}>
          Notifikasi
        </Text>
        <Button
          type="link"
          size="small"
          disabled={unreadCount === 0}
          onClick={markAllAsRead}
          style={{ padding: 0 }}
        >
          Tandai semua dibaca
        </Button>
      </div>

      <div style={{ maxHeight: 360, overflowY: "auto" }}>
        {items.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Belum ada notifikasi"
            style={{ padding: "24px 0" }}
          />
        ) : (
          items.map((item) => {
            const { icon, color } = TYPE_ICON[item.type];

            return (
              <div
                key={item.id}
                onClick={() => markAsRead(item.id)}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "12px 16px",
                  cursor: "pointer",
                  background: item.read
                    ? "transparent"
                    : COFFEE_COLORS.creamCard,
                  borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    color,
                    background: "rgba(0, 0, 0, 0.04)",
                  }}
                >
                  {icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <Text
                      strong={!item.read}
                      style={{ color: COFFEE_COLORS.espresso }}
                      ellipsis
                    >
                      {item.title}
                    </Text>
                    {!item.read && (
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          flexShrink: 0,
                          borderRadius: "50%",
                          background: "#ff4d4f",
                        }}
                      />
                    )}
                  </div>
                  <Text
                    type="secondary"
                    style={{ fontSize: 13, display: "block" }}
                  >
                    {item.description}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.time}
                  </Text>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottomRight"
      arrow={false}
      style={{ padding: 0, overflow: "hidden" }}
      //   styles={{ body: { padding: 0, overflow: "hidden" } }}
    >
      <Badge count={unreadCount} size="small">
        <Button
          type="text"
          shape="circle"
          aria-label="Notifikasi"
          icon={<BellOutlined style={{ fontSize: 18 }} />}
        />
      </Badge>
    </Popover>
  );
}
