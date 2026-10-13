interface LoginValues {
  email: string;
  password: string;
}

import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { message } from "antd";

import AuthLayout from "@/components/Auth/AuthLayout";
import LoginCard from "@/components/Cards/LoginCard";

import { ApiError } from "@/lib/api";
import { loginUser } from "@/services/service";
import { setToken } from "@/utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: LoginValues) => {
    setLoading(true);
    try {
      const dataInput = {
        email: values.email,
        password: values.password,
      };

      const result_data = await loginUser(dataInput);

      // setToken(token);
      // message.success("Berhasil masuk");
      // router.push("/");
    } catch (err) {
      message.error(
        err instanceof ApiError ? err.message : "Terjadi kesalahan pada server",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Masuk | Kopi Nusantara</title>
      </Head>
      <AuthLayout
        heading={
          <>
            Halo
            <br />
            Kopi Nusantara!
          </>
        }
        description="Pantau penjualan, produk, dan pelanggan kedai kopi Anda dalam satu dashboard."
      >
        <LoginCard loading={loading} onSubmit={handleLogin} />
      </AuthLayout>
    </>
  );
}
