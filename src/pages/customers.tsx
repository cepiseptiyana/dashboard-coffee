interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  memberSince: string;
  tier: "Reguler" | "Silver" | "Gold";
}

import { Card, Input, message } from "antd";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/components/Layout/DashboardLayout";
import CustomersTable from "@/components/Table/CustomersTable";
import { getCustomers } from "@/services/api";
import { formatDateTime } from "@/utils/formatters";

export default function CustomersPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      await Promise.all([getDataCustomers()]);
      setLoading(false);
    }
    loadDashboard();
  }, []);

  async function getDataCustomers() {
    try {
      const result = await getCustomers();

      if (!result.success) {
        message.error(result.message);
        return;
      }

      const result_sanitize_data = sanitizeDataCustomers(result.data);
      setData(result_sanitize_data);
    } catch (err) {
      console.error(err);
    }
  }

  function sanitizeDataCustomers(getData: any[]) {
    let newDataOrders: any[] = [];

    for (let getDataForSanitize of getData) {
      newDataOrders.push({
        id: getDataForSanitize.id,
        name: getDataForSanitize.name,
        email: getDataForSanitize.email,
        totalOrders: getDataForSanitize.totalOrders,
        totalSpent: getDataForSanitize.totalSpent,
        memberSince: formatDateTime(getDataForSanitize.memberSince),
        tier: getDataForSanitize.tier,
      });
    }

    return newDataOrders;
  }

  const filtered = useMemo(() => {
    const value_search = search.trim().toLowerCase();
    if (!value_search) return data;
    return data.filter(
      (data_customer_by) =>
        data_customer_by.name.toLowerCase().includes(value_search) ||
        data_customer_by.email.toLowerCase().includes(value_search),
    );
  }, [data, search]);

  return (
    <>
      <Head>
        <title>Pelanggan | Kopi Nusantara Dashboard</title>
      </Head>
      <DashboardLayout title="Manajemen Pelanggan">
        <Card
          variant="borderless"
          style={{ borderRadius: 14 }}
          title="Daftar Pelanggan"
          extra={
            <Input.Search
              placeholder="Cari nama atau email..."
              allowClear
              style={{ width: 260 }}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        >
          <CustomersTable data={filtered} loading={loading} />
        </Card>
      </DashboardLayout>
    </>
  );
}
