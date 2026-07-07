import { Card, Input } from "antd";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import CustomersTable from "@/components/Table/CustomersTable";
import { getCustomers } from "@/services/api";
import type { Customer } from "@/types";

export default function CustomersPage() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }, [customers, search]);

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
