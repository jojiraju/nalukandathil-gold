import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";

// High-contrast fashion display serif + clean modern sans.
const serif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  adjustFontFallback: false,
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Nalukandathil Gold & Diamonds | Since 1979 · Edakkara, Keralam",
  description:
    "Nalukandathil Gold & Diamonds – trusted jewellers since 1979. Rings, necklaces, chains, bracelets, anklets and lockets. Visit our showroom on CNG Road, Edakkara.",
  icons: { icon: "/logo.jpg" },
};

export const viewport = {
  themeColor: "#0a3a34",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
