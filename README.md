# Kopi Nusantara — Coffee Shop Dashboard

Dashboard admin untuk kedai kopi, dibangun dengan **Next.js (Pages Router) + TypeScript**, **Ant Design** untuk komponen UI, dan **Apache ECharts** untuk visualisasi data.

## Struktur Folder

```
src/
├── components/          # Komponen UI reusable
│   ├── Layout/           # Sidebar, Header, DashboardLayout
│   ├── Cards/            # StatCard (kartu KPI)
│   ├── Charts/           # Wrapper ECharts (line, pie, bar)
│   └── Table/            # Tabel Ant Design per entitas
├── constants/            # Konstanta tema warna & menu navigasi
├── data/                 # Mock data (pengganti sementara backend)
├── hooks/                # Custom React hooks (mis. useIsMobile)
├── pages/                # Routing Next.js (Pages Router)
│   ├── index.tsx         # Ringkasan / overview
│   ├── products.tsx      # Manajemen produk
│   ├── orders.tsx        # Manajemen pesanan
│   └── customers.tsx     # Manajemen pelanggan
├── services/             # Lapisan pemanggilan API (api.ts)
├── styles/               # CSS global
├── types/                # TypeScript interfaces/types bersama
└── utils/                # Helper format angka, mata uang, tanggal
```

## Menjalankan Project

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Build Production

```bash
npm run build
npm run start
```

## Menghubungkan ke Backend Nyata

Semua pengambilan data melewati `src/services/api.ts`. Saat backend sudah siap,
ganti isi tiap fungsi (mis. `getProducts`, `getOrders`) dengan pemanggilan
`fetch`/`axios` ke REST API atau GraphQL — komponen dan halaman tidak perlu diubah
karena hanya bergantung pada tipe data di `src/types`.

## Teknologi

- **Next.js 16** (Pages Router) + **TypeScript**
- **Ant Design v6** — komponen UI & sistem tema (ConfigProvider)
- **Apache ECharts** via `echarts-for-react` — grafik tren penjualan, pie kategori, traffic per jam
- Tema warna khas kedai kopi: espresso, krim hangat, dan aksen emas "crema"
