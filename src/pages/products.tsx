type ProductStatus = "tersedia" | "stok menipis" | "habis";
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  stock: number;
  status: ProductStatus;
}

import { Card, Input, message } from "antd";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ProductsTable from "@/components/Table/ProductsTable";

import { getProducts } from "@/services/service";

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      await Promise.all([getDataProducts()]);
      setLoading(false);
    }
    loadDashboard();
  }, []);

  async function getDataProducts() {
    try {
      const result = await getProducts();

      if (!result.success) {
        message.error(result.message);
        return;
      }

      setData(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  const filter_data = useMemo(() => {
    const value_search = search.trim().toLowerCase();
    if (!value_search) return data;
    return data.filter(
      (data_product_by) =>
        data_product_by.name.toLowerCase().includes(value_search) ||
        data_product_by.category.toLowerCase().includes(value_search),
    );
  }, [data, search]);

  return (
    <>
      <Head>
        <title>Produk | Kopi Nusantara Dashboard</title>
      </Head>
      <DashboardLayout title="Manajemen Produk">
        <Card
          variant="borderless"
          style={{ borderRadius: 14 }}
          title="Daftar Produk"
          extra={
            <Input.Search
              placeholder="Cari nama atau kategori..."
              allowClear
              style={{ width: 260 }}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        >
          <ProductsTable data={filter_data} loading={loading} />
        </Card>
      </DashboardLayout>
    </>
  );
}
