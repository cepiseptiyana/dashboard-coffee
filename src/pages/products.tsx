import { Card, Input } from "antd";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ProductsTable from "@/components/Table/ProductsTable";
import { getProducts } from "@/services/api";
import type { Product } from "@/types";

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

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
          <ProductsTable data={filtered} loading={loading} />
        </Card>
      </DashboardLayout>
    </>
  );
}
