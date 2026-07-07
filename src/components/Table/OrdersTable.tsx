import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Order, OrderChannel, OrderStatus } from "@/types";
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
    { title: "Pelanggan", dataIndex: "customer", key: "customer" },
    { title: "Item", dataIndex: "items", key: "items", ellipsis: true },
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: OrderStatus) => (
        <Tag color={STATUS_COLOR[status]} style={{ textTransform: "capitalize" }}>
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
    {
      title: "Waktu",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val: string) => formatDateTime(val),
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
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
