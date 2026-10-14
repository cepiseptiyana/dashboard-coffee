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

import { Card, Input, message } from "antd";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import OrdersTable from "@/components/Table/OrdersTable";
import { getOrders } from "@/services/service";
// import type { Order } from "@/types";

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      await Promise.all([getDataOrders()]);
      setLoading(false);
    }
    loadDashboard();
  }, []);

  async function getDataOrders() {
    try {
      const result = await getOrders();

      if (!result.success) {
        message.error(result.message);
        return;
      }

      const result_sanitize_data = sanitizeDataOrders(result.data);
      setData(result_sanitize_data);
    } catch (err) {
      console.error(err);
    }
  }

  function sanitizeDataOrders(getData: any[]) {
    let newDataOrders: any[] = [];

    for (let getDataForSanitize of getData) {
      let newDataOrdersItems: any[] = [];

      for (let getDataOrderItems of getDataForSanitize.orderItems) {
        newDataOrdersItems.push({
          name: getDataOrderItems.product.name,
        });
      }

      newDataOrders.push({
        id: getDataForSanitize.id,
        customer: getDataForSanitize.customer,
        total: getDataForSanitize.total,
        channel: getDataForSanitize.channel,
        status: getDataForSanitize.status,
        createdAt: getDataForSanitize.createdAt,
        products: newDataOrdersItems,
      });
    }

    console.log(newDataOrders);

    return newDataOrders;
  }

  const filter_data = useMemo(() => {
    const value_search = search.trim().toLowerCase();
    if (!value_search) return data;
    return data.filter(
      (data_order_by) =>
        data_order_by.id.toLowerCase().includes(value_search) ||
        data_order_by.customer.toLowerCase().includes(value_search),
    );
  }, [data, search]);

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
          <OrdersTable data={filter_data} loading={loading} />
        </Card>
      </DashboardLayout>
    </>
  );
}
