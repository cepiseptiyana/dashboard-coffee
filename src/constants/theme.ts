// Palet warna khas kedai kopi: espresso gelap, krim hangat, dan aksen emas "crema".
// Dipakai bersama di ConfigProvider (Ant Design) maupun opsi ECharts agar konsisten.
export const COFFEE_COLORS = {
  espresso: "#2B1B12", // dasar sidebar & teks utama
  espressoDark: "#1C1109", // hover/aktif sidebar
  coffeeBrown: "#6F4436", // elemen sekunder
  latte: "#A9764F", // border/garis lembut
  crema: "#C88B3D", // aksen utama (tombol, highlight)
  cremaLight: "#E4B975", // hover aksen
  cream: "#FBF6EF", // latar konten
  creamCard: "#FFFFFF", // latar kartu
  sage: "#6B8F71", // indikator positif/naik
  rust: "#B85C50", // indikator negatif/turun
  ink: "#3A2A20", // teks body di atas krim
  muted: "#8C7A6B", // teks sekunder
} as const;

export const CHART_PALETTE = [
  COFFEE_COLORS.crema,
  COFFEE_COLORS.coffeeBrown,
  COFFEE_COLORS.sage,
  COFFEE_COLORS.latte,
  COFFEE_COLORS.rust,
  COFFEE_COLORS.espresso,
];

export const antdTheme = {
  token: {
    colorPrimary: COFFEE_COLORS.crema,
    colorInfo: COFFEE_COLORS.crema,
    colorSuccess: COFFEE_COLORS.sage,
    colorError: COFFEE_COLORS.rust,
    colorTextBase: COFFEE_COLORS.ink,
    colorBgBase: COFFEE_COLORS.cream,
    borderRadius: 10,
    fontFamily:
      "var(--font-body), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  components: {
    Layout: {
      siderBg: COFFEE_COLORS.espresso,
      headerBg: COFFEE_COLORS.creamCard,
      bodyBg: COFFEE_COLORS.cream,
    },
    Menu: {
      darkItemBg: COFFEE_COLORS.espresso,
      darkItemSelectedBg: COFFEE_COLORS.crema,
      darkItemSelectedColor: COFFEE_COLORS.espresso,
      darkItemHoverBg: COFFEE_COLORS.espressoDark,
      darkSubMenuItemBg: COFFEE_COLORS.espressoDark,
    },
    Card: {
      colorBgContainer: COFFEE_COLORS.creamCard,
    },
  },
};
