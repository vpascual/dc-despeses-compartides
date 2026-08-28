import type { Metadata } from "next";
import { Noto_Sans_Display } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

const notoSansDisplay = Noto_Sans_Display({
  variable: "--font-noto-sans-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Despeses compartides",
  description: "Gestió de despeses compartides",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ca" className={notoSansDisplay.variable}>
      <body>{children}</body>
    </html>
  );
}
