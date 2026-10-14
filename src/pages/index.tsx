type TrendDirection = "up" | "down" | "flat";
interface StatSummary {
  id: string;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: TrendDirection;
  trendValue: string;
  description: string;
}

interface SalesPoint {
  date: string; // format: "2026-07-01"
  revenue: number;
  cupsSold: number;
}

interface ProductCategorySales {
  category: string;
  value: number;
}

interface HourlyTraffic {
  hour: string; // "08:00"
  customers: number;
}

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

interface DashboardData {
  statsSummaries: StatSummary[];
  salesTrend: SalesPoint[];
  categories: ProductCategorySales[];
  traffic: HourlyTraffic[];
  products: Product[];
}

import { Card, Col, Row, message } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/router";

import DashboardLayout from "@/components/Layout/DashboardLayout";
import StatCard from "@/components/Cards/StatCard";
import SalesTrendChart from "@/components/Charts/SalesTrendChart";
import ProductPieChart from "@/components/Charts/ProductPieChart";
import HourlyTrafficChart from "@/components/Charts/HourlyTrafficChart";
import ProductsTable from "@/components/Table/ProductsTable";

import {
  getCategories,
  getProducts,
  getSalesTrend,
  getSummaries,
  getTraffic,
} from "@/services/service";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    statsSummaries: [],
    salesTrend: [],
    categories: [],
    traffic: [],
    products: [],
  });

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    async function loadDashboard() {
      await Promise.all([
        getDataStatSummaries(),
        getDataSalesTrend(),
        getDataCategories(),
        getDataTraffic(),
        getDataProducts(),
      ]);
      setLoading(false);
    }

    loadDashboard();
  }, []);

  async function getDataStatSummaries() {
    try {
      const result = await getSummaries();

      if (!result.success) {
        message.error(result.message);
        return;
      }

      setData((prevData) => ({
        ...prevData,
        statsSummaries: result.data,
      }));
    } catch (err) {
      console.error(err);
    }
  }

  async function getDataSalesTrend() {
    try {
      const token = getToken();
      if (!token) {
        return;
      }

      const result = await getSalesTrend();
      console.log(result);

      if (!result.success) {
        message.error(result.message);
        return;
      }

      setData((prevData) => ({
        ...prevData,
        salesTrend: result.data,
      }));
    } catch (err) {
      console.error(err);
    }
  }

  async function getDataCategories() {
    try {
      const result = await getCategories();

      if (!result.success) {
        message.error(result.message);
        return;
      }

      setData((prevData) => ({
        ...prevData,
        categories: result.data,
      }));
    } catch (err) {
      console.error(err);
    }
  }

  async function getDataTraffic() {
    try {
      const result = await getTraffic();

      if (!result.success) {
        message.error(result.message);
        return;
      }

      setData((prevData) => ({
        ...prevData,
        traffic: result.data,
      }));

      // setTraffic(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getDataProducts() {
    try {
      const result = await getProducts();

      if (!result.success) {
        message.error(result.message);
        return;
      }

      setData((prevData) => ({
        ...prevData,
        products: result.data,
      }));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Head>
        <title>Ringkasan | Kopi Nusantara Dashboard</title>
      </Head>
      <DashboardLayout title="Ringkasan Toko">
        <Row gutter={[16, 16]}>
          {data.statsSummaries.map((stat) => (
            <Col key={stat.id} xs={24} sm={12} lg={6}>
              <StatCard stat={stat} />
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={24}>
            <Card
              title="Tren Penjualan 7 Hari Terakhir"
              variant="borderless"
              style={{ borderRadius: 14 }}
              loading={loading}
            >
              <SalesTrendChart data={data.salesTrend} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={16}>
            <Card
              title="Kunjungan Pelanggan per Jam"
              variant="borderless"
              style={{ borderRadius: 14 }}
              loading={loading}
            >
              <HourlyTrafficChart data={data.traffic} />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title="Penjualan per Kategori"
              variant="borderless"
              style={{ borderRadius: 14 }}
              loading={loading}
            >
              <ProductPieChart data={data.categories} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={24}>
            <Card
              title="5 Produk Terlaris"
              variant="borderless"
              style={{ borderRadius: 14 }}
            >
              <ProductsTable
                data={data.products}
                loading={loading}
                pageSize={5}
              />
            </Card>
          </Col>
        </Row>
      </DashboardLayout>
    </>
  );
}
