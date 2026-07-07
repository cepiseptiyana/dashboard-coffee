import { Card, Input } from "antd";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import OrdersTable from "@/components/Table/OrdersTable";
import { getOrders } from "@/services/api";
import type { Order } from "@/types";

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q)
    );
  }, [orders, search]);

  return (
    <>
      <Head>
        <title>Pesanan | Kopi Nusantara Dashboard</title>
      </Head>
      <DashboardLayout title="Manajemen Pesanan">
        <Card
          variant="borderless"
          style={{ borderRadius: 14 }}
          title="Daftar Pesanan"
          extra={
            <Input.Search
              placeholder="Cari ID atau nama pelanggan..."
              allowClear
              style={{ width: 260 }}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        >
          <OrdersTable data={filtered} loading={loading} />
        </Card>
      </DashboardLayout>
    </>
  );
}
