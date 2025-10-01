import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - DashBoard Seduc",
  description: "Faça login para acessar o sistema",
};
export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
