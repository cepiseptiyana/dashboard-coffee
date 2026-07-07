import type { MenuItem } from "@/types";

// Daftar navigasi utama sidebar. Path harus sesuai dengan file di src/pages.
export const MAIN_MENU: MenuItem[] = [
  { key: "/", icon: "DashboardOutlined", label: "Ringkasan" },
  { key: "/products", icon: "CoffeeOutlined", label: "Produk" },
  { key: "/orders", icon: "ShoppingCartOutlined", label: "Pesanan" },
  { key: "/customers", icon: "TeamOutlined", label: "Pelanggan" },
];
