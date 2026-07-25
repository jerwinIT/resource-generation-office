import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "RGO — Resource Generation Office | Batangas State University",
  description:
    "The official Resource Generation Office store and reservation platform for Batangas State University. Shop uniforms, merchandise, and supplies, then reserve your pickup slot.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="bg-background">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
