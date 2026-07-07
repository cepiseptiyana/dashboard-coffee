import { Card, Col, Row } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import StatCard from "@/components/Cards/StatCard";
import SalesTrendChart from "@/components/Charts/SalesTrendChart";
import ProductPieChart from "@/components/Charts/ProductPieChart";
import HourlyTrafficChart from "@/components/Charts/HourlyTrafficChart";
import ProductsTable from "@/components/Table/ProductsTable";
import {
  getHourlyTraffic,
  getProductCategorySales,
  getProducts,
  getSalesTrend,
  getStatSummaries,
} from "@/services/api";
import type {
  HourlyTraffic,
  Product,
  ProductCategorySales,
  SalesPoint,
  StatSummary,
} from "@/types";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatSummary[]>([]);
  const [sales, setSales] = useState<SalesPoint[]>([]);
  const [categories, setCategories] = useState<ProductCategorySales[]>([]);
  const [traffic, setTraffic] = useState<HourlyTraffic[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    Promise.all([
      getStatSummaries(),
      getSalesTrend(),
      getProductCategorySales(),
      getHourlyTraffic(),
      getProducts(),
    ]).then(([s, sale, cat, traf, prod]) => {
      setStats(s);
      setSales(sale);
      setCategories(cat);
      setTraffic(traf);
      setProducts([...prod].sort((a, b) => b.sold - a.sold).slice(0, 5));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Ringkasan | Kopi Nusantara Dashboard</title>
      </Head>
      <DashboardLayout title="Ringkasan Toko">
        <Row gutter={[16, 16]}>
          {stats.map((stat) => (
            <Col key={stat.id} xs={24} sm={12} lg={6}>
              <StatCard stat={stat} />
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={16}>
            <Card
              title="Tren Penjualan 7 Hari Terakhir"
              variant="borderless"
              style={{ borderRadius: 14 }}
              loading={loading}
            >
              <SalesTrendChart data={sales} />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card
              title="Penjualan per Kategori"
              variant="borderless"
              style={{ borderRadius: 14 }}
              loading={loading}
            >
              <ProductPieChart data={categories} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={10}>
            <Card
              title="Kunjungan Pelanggan per Jam"
              variant="borderless"
              style={{ borderRadius: 14 }}
              loading={loading}
            >
              <HourlyTrafficChart data={traffic} />
            </Card>
          </Col>
          <Col xs={24} lg={14}>
            <Card
              title="5 Produk Terlaris"
              variant="borderless"
              style={{ borderRadius: 14 }}
            >
              <ProductsTable data={products} loading={loading} pageSize={5} />
            </Card>
          </Col>
        </Row>
      </DashboardLayout>
    </>
  );
}
