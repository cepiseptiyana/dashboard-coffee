import Link from "next/link";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { COFFEE_COLORS } from "@/constants/theme";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterCardProps {
  loading?: boolean;
  onSubmit: (values: RegisterValues) => void;
}

export default function RegisterCard({ loading, onSubmit }: RegisterCardProps) {
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
        Buat Akun Baru
      </h2>
      <p style={{ marginTop: 8, marginBottom: 28, color: "#6b6b6b" }}>
        Sudah punya akun?{" "}
        <Link
          href="/login"
          style={{ color: COFFEE_COLORS.espresso, fontWeight: 600 }}
        >
          Masuk di sini
        </Link>
      </p>

      <Form<RegisterValues>
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Nama Lengkap"
          rules={[{ required: true, message: "Nama wajib diisi" }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Andi Barista"
          />
        </Form.Item>

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
          rules={[
            { required: true, message: "Kata sandi wajib diisi" },
            { min: 8, message: "Minimal 8 karakter" },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Minimal 8 karakter"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Konfirmasi Kata Sandi"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Konfirmasi kata sandi wajib diisi" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Kata sandi tidak cocok"));
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Ulangi kata sandi"
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
          Daftar
        </Button>
      </Form>
    </div>
  );
}
