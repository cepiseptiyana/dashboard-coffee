import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { COFFEE_COLORS } from "@/constants/theme";
import type { Product, ProductStatus } from "@/types";
import { formatCurrency, formatNumber } from "@/utils/formatters";

const STATUS_COLOR: Record<ProductStatus, string> = {
  tersedia: "success",
  "stok menipis": "warning",
  habis: "error",
};

interface ProductsTableProps {
  data: Product[];
  loading?: boolean;
  pageSize?: number;
}

export default function ProductsTable({
  data,
  loading,
  pageSize = 8,
}: ProductsTableProps) {
  const columns: ColumnsType<Product> = [
    { title: "Produk", dataIndex: "name", key: "name" },
    { title: "Kategori", dataIndex: "category", key: "category" },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (val: number) => formatCurrency(val),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Terjual",
      dataIndex: "sold",
      key: "sold",
      align: "right",
      render: (val: number) => formatNumber(val),
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Stok",
      dataIndex: "stock",
      key: "stock",
      align: "right",
      render: (val: number) => formatNumber(val),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: ProductStatus) => (
        <Tag color={STATUS_COLOR[status]} style={{ textTransform: "capitalize" }}>
          {status}
        </Tag>
      ),
      filters: [
        { text: "Tersedia", value: "tersedia" },
        { text: "Stok Menipis", value: "stok menipis" },
        { text: "Habis", value: "habis" },
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
      style={{ background: COFFEE_COLORS.creamCard }}
    />
  );
}
