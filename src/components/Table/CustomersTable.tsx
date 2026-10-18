interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  memberSince: string;
  tier: "Reguler" | "Silver" | "Gold";
}

interface CustomersTableProps {
  data: Customer[];
  loading?: boolean;
  pageSize?: number;
}

import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatCurrency, formatNumber } from "@/utils/formatters";

const TIER_COLOR: Record<Customer["tier"], string> = {
  Gold: "gold",
  Silver: "default",
  Reguler: "blue",
};

export default function CustomersTable({
  data,
  loading,
  pageSize = 8,
}: CustomersTableProps) {
  const columns: ColumnsType<Customer> = [
    { title: "Nama", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Total Pesanan",
      dataIndex: "totalOrders",
      key: "totalOrders",
      align: "right",
      render: (val: number) => formatNumber(val),
      sorter: (a, b) => a.totalOrders - b.totalOrders,
    },
    {
      title: "Total Belanja",
      dataIndex: "totalSpent",
      key: "totalSpent",
      align: "right",
      render: (val: number) => formatCurrency(val),
      sorter: (a, b) => a.totalSpent - b.totalSpent,
    },
    { title: "Member Sejak", dataIndex: "memberSince", key: "memberSince" },
    {
      title: "Tier",
      dataIndex: "tier",
      key: "tier",
      align: "center",
      render: (tier: Customer["tier"]) => (
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
          key={tier}
          color={TIER_COLOR[tier]}
          variant={"solid"}
        >
          {tier}
        </Tag>

        // <Tag color={TIER_COLOR[tier]}>{tier}</Tag>
      ),
      filters: [
        { text: "Gold", value: "Gold" },
        { text: "Silver", value: "Silver" },
        { text: "Reguler", value: "Reguler" },
      ],
      onFilter: (value, record) => record.tier === value,
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
