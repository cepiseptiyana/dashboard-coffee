// Lapisan service — titik integrasi tunggal ke backend nyata.
// Saat ini masih memakai mock data agar UI dapat langsung berjalan;
// ganti isi tiap fungsi dengan pemanggilan fetch/axios ke REST/GraphQL API saat backend siap.

import {
  CUSTOMERS,
  HOURLY_TRAFFIC,
  ORDERS,
  PRODUCT_CATEGORY_SALES,
  PRODUCTS,
  SALES_TREND,
  STAT_SUMMARIES,
} from "@/data/mockData";
import type {
  Customer,
  HourlyTraffic,
  Order,
  Product,
  ProductCategorySales,
  SalesPoint,
  StatSummary,
} from "@/types";

// Simulasi latensi network agar loading state komponen dapat diuji.
function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getStatSummaries(): Promise<StatSummary[]> {
  return delay(STAT_SUMMARIES);
}

export async function getSalesTrend(): Promise<SalesPoint[]> {
  return delay(SALES_TREND);
}

export async function getProductCategorySales(): Promise<ProductCategorySales[]> {
  return delay(PRODUCT_CATEGORY_SALES);
}

export async function getHourlyTraffic(): Promise<HourlyTraffic[]> {
  return delay(HOURLY_TRAFFIC);
}

export async function getProducts(): Promise<Product[]> {
  return delay(PRODUCTS);
}

export async function getOrders(): Promise<Order[]> {
  return delay(ORDERS);
}

export async function getCustomers(): Promise<Customer[]> {
  return delay(CUSTOMERS);
}
