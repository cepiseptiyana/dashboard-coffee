type OrderStatus = "selesai" | "diproses" | "dibatalkan";
type OrderChannel = "dine-in" | "take-away" | "online";
interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  channel: OrderChannel;
  status: OrderStatus;
  createdAt: string; // ISO datetime
}

import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatCurrency, formatDateTime } from "@/utils/formatters";

const STATUS_COLOR: Record<OrderStatus, string> = {
  selesai: "success",
  diproses: "processing",
  dibatalkan: "error",
};

const CHANNEL_LABEL: Record<OrderChannel, string> = {
  "dine-in": "Dine-in",
  "take-away": "Take Away",
  online: "Online",
};

interface OrdersTableProps {
  data: Order[];
  loading?: boolean;
  pageSize?: number;
}

export default function OrdersTable({
  data,
  loading,
  pageSize = 8,
}: OrdersTableProps) {
  const columns: ColumnsType<Order> = [
    { title: "ID Pesanan", dataIndex: "id", key: "id" },
    {
      title: "Pelanggan",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => {
        if (customer == null) return "Pelanggan Umum";

        return customer.name;
      },
    },
    {
      title: "Item",
      dataIndex: "products",
      key: "products",
      ellipsis: true,
      render: (products: any[]) => {
        return products.map((prod) => prod.name).join(", ");
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "right",
      render: (val: number) => formatCurrency(val),
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Kanal",
      dataIndex: "channel",
      key: "channel",
      render: (channel: OrderChannel) => CHANNEL_LABEL[channel],
      filters: [
        { text: "Dine-in", value: "dine-in" },
        { text: "Take Away", value: "take-away" },
        { text: "Online", value: "online" },
      ],
      onFilter: (value, record) => record.channel === value,
    },

    {
      title: "Waktu",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val: string) => formatDateTime(val),
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: OrderStatus) => (
        <Tag
          style={{
            width: 120,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "capitalize",
            fontWeight: 600,
            margin: "auto",
          }}
          key={status}
          color={STATUS_COLOR[status]}
          variant={"solid"}
        >
          {status}
        </Tag>
      ),
      filters: [
        { text: "Selesai", value: "selesai" },
        { text: "Diproses", value: "diproses" },
        { text: "Dibatalkan", value: "dibatalkan" },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize }}
    />
  );
}
