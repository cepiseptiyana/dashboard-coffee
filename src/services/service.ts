interface Login {
  id: number;
  email: string;
}

interface Register {
  id: number;
  email: string;
  created_at: string;
}

interface GetProfile {
  id: string;
  name: string;
  email: string;
}

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

interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  memberSince: string;
  tier: "Reguler" | "Silver" | "Gold";
}

interface User {
  id: string;
  name: string;
  email: string;
}

import { api, ApiResponse } from "@/lib/api";

// ==========================================
// ===== Auth ===========================
// ==========================================
export const loginUser = (body: Record<string, unknown>) =>
  api<ApiResponse<Login>>("/api/v1/auth/login", {
    method: "POST",
    body,
  });

export const registerUser = (body: Record<string, unknown>) => {
  return api<ApiResponse<Register>>("/api/v1/auth/register", {
    method: "POST",
    body,
  });
};

export const getProfile = () =>
  api<ApiResponse<GetProfile>>("/auth/me", {
    method: "GET",
  });

export const getDataUser = () =>
  api<ApiResponse<User[]>>("/api/v1/auth/getUser", {
    method: "GET",
  });

export const logout = () =>
  api<void>("/auth/logout", {
    method: "POST",
  });

// ==========================================
// ===== OVERVIEW PAGE ==========================
// ==========================================

export const getSalesTrend = () =>
  api<ApiResponse<SalesPoint[]>>("/api/v1/overview/sales_trend", {
    method: "GET",
  });

export const getSummaries = () =>
  api<ApiResponse<StatSummary[]>>("/api/v1/overview/stat_summaries", {
    method: "GET",
  });

export const getCategories = () =>
  api<ApiResponse<ProductCategorySales[]>>("/api/v1/overview/categories", {
    method: "GET",
  });

export const getTraffic = () =>
  api<ApiResponse<HourlyTraffic[]>>("/api/v1/overview/traffic", {
    method: "GET",
  });

export const getProducts = () =>
  api<ApiResponse<Product[]>>("/api/v1/overview/products", {
    method: "GET",
  });

export const getOrders = () =>
  api<ApiResponse<Order[]>>("/api/v1/overview/orders", {
    method: "GET",
  });

export const getCustomers = () =>
  api<ApiResponse<Customer[]>>("/api/v1/overview/customers", {
    method: "GET",
  });

// ==========================================
// ===== Products ===========================
// ==========================================
// export const getProducts = (params?: {
//   page?: number;
//   limit?: number;
//   search?: string;
//   category?: string[];
// }) =>
//   api<Product[]>("/products", {
//     method: "GET",
//     params,
//   });

export const getProductById = (id: string) =>
  api<Product>(`/products/${id}`, {
    method: "GET",
  });

export const createProduct = (body: Partial<Product>) =>
  api<Product>("/products", {
    method: "POST",
    body,
  });

export const updateProduct = (id: string, body: Partial<Product>) =>
  api<Product>(`/products/${id}`, {
    method: "PUT",
    body,
  });

export const deleteProduct = (id: string) =>
  api<void>(`/products/${id}`, {
    method: "DELETE",
  });
