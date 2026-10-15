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
      align: "center",
      render: (status: ProductStatus) => (
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
