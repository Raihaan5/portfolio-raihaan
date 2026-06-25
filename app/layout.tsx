import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raihaan Abubacar | Portfolio",
  description: "Portfolio profissional de Raihaan Abubacar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
