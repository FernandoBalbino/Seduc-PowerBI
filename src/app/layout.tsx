import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Pesos necessários
  display: "swap", // Melhora performance
});
export const metadata: Metadata = {
  title: "DashBoard Seduc",
  description: "Sistema de Gestão Escolar da Seduc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
