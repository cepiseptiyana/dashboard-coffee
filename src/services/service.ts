import { api, ApiResponse } from "@/lib/api";
import type { Product } from "@/types";

// ==========================================
// ===== Auth ===========================
// ==========================================
export const loginUser = (body: Record<string, unknown>) =>
  api<{ token: string }>("/api/v1/auth/login", {
    method: "POST",
    body,
  });

export const registerUser = (body: Record<string, unknown>) => {
  return api<ApiResponse<{ id: number; email: string; created_at: string }>>(
    "/api/v1/auth/register",
    {
      method: "POST",
      body,
    },
  );
};

export const getProfile = () =>
  api<{ id: string; name: string; email: string }>("/auth/me", {
    method: "GET",
  });

export const logout = () =>
  api<void>("/auth/logout", {
    method: "POST",
  });

// ==========================================
// ===== Products ===========================
// ==========================================
export const getProducts = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string[];
}) =>
  api<Product[]>("/products", {
    method: "GET",
    params,
  });

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

// ==========================================
// ===== Dashboard ==========================
// ==========================================
// export const getSummaries = () =>
//   api<ApiResponse<StatSummary[]>>("/dashboard/summaries", {
//     method: "GET",
//   });

// export const getSalesTrend = () =>
//   api<ApiResponse<SalesPoint[]>>("/dashboard/sales-trend", {
//     method: "GET",
//   });

// export const getCategories = () =>
//   api<ApiResponse<ProductCategorySales[]>>("/dashboard/categories", {
//     method: "GET",
//   });

// export const getTraffic = () =>
//   api<ApiResponse<HourlyTraffic[]>>("/dashboard/traffic", {
//     method: "GET",
//   });
