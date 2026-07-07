// Tipe data bersama dipakai lintas komponen, halaman, dan service.

export interface MenuItem {
  key: string;
  icon: string;
  label: string;
  children?: MenuItem[];
}

export type TrendDirection = "up" | "down" | "flat";

export interface StatSummary {
  id: string;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: TrendDirection;
  trendValue: string;
  description: string;
}

export interface SalesPoint {
  date: string; // format: "2026-07-01"
  revenue: number;
  cupsSold: number;
}

export interface ProductCategorySales {
  category: string;
  value: number;
}

export interface HourlyTraffic {
  hour: string; // "08:00"
  customers: number;
}

export type ProductStatus = "tersedia" | "stok menipis" | "habis";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  stock: number;
  status: ProductStatus;
}

export type OrderStatus = "selesai" | "diproses" | "dibatalkan";
export type OrderChannel = "dine-in" | "take-away" | "online";

export interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  channel: OrderChannel;
  status: OrderStatus;
  createdAt: string; // ISO datetime
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  memberSince: string;
  tier: "Reguler" | "Silver" | "Gold";
}
