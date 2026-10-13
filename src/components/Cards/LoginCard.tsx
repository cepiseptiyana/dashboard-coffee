import Link from "next/link";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { COFFEE_COLORS } from "@/constants/theme";

interface LoginValues {
  email: string;
  password: string;
}

interface LoginCardProps {
  loading?: boolean;
  onSubmit: (values: LoginValues) => void;
}

export default function LoginCard({ loading, onSubmit }: LoginCardProps) {
  return (
    <div>
      <h2
        style={{
          fontSize: 30,
          fontWeight: 700,
          margin: 0,
          color: COFFEE_COLORS.espresso,
        }}
      >
        Selamat Datang!
      </h2>
      <p style={{ marginTop: 8, marginBottom: 28, color: "#6b6b6b" }}>
        Belum punya akun?{" "}
        <Link
          href="/register"
          style={{ color: COFFEE_COLORS.espresso, fontWeight: 600 }}
        >
          Daftar sekarang
        </Link>
        , gratis dan hanya semenit.
      </p>

      <Form<LoginValues>
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email wajib diisi" },
            { type: "email", message: "Format email tidak valid" },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined />}
            placeholder="nama@email.com"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Kata Sandi"
          rules={[{ required: true, message: "Kata sandi wajib diisi" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Kata sandi"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={loading}
          style={{
            background: COFFEE_COLORS.bluePrimary,
            color: COFFEE_COLORS.cream,
            fontWeight: 600,
          }}
        >
          Masuk
        </Button>
      </Form>

      <p style={{ marginTop: 20, textAlign: "center", color: "#6b6b6b" }}>
        Lupa kata sandi?{" "}
        <Link
          href="#"
          style={{ color: COFFEE_COLORS.espresso, fontWeight: 600 }}
        >
          Klik di sini
        </Link>
      </p>
    </div>
  );
}
