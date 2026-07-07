import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { antdTheme } from "@/constants/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={antdTheme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
