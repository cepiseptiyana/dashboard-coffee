interface ResultRegisterValues {
  name: string;
  email: string;
  password: string;
}

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { message } from "antd";
import AuthLayout from "@/components/Auth/AuthLayout";
import RegisterCard from "@/components/Cards/RegisterCard";
import { ApiError } from "@/lib/api";
import { registerUser } from "@/services/service";
import { setToken } from "@/utils/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<ResultRegisterValues>();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: RegisterValues) => {
    setLoading(true);
    try {
      // confirmPassword hanya untuk validasi form, tidak dikirim ke backend
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const dataInput = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const result_data = await registerUser(dataInput);

      if (!result_data.success) {
        throw new Error(result_data.message);
      }

      message.success(result_data.message);
      router.push("/login");
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
        <title>Daftar | Kopi Nusantara</title>
      </Head>
      <AuthLayout
        heading={
          <>
            Gabung
            <br />
            Kopi Nusantara!
          </>
        }
        description="Buat akun dan mulai kelola kedai kopi Anda dengan lebih mudah dan cepat."
      >
        <RegisterCard loading={loading} onSubmit={handleRegister} />
      </AuthLayout>
    </>
  );
}
