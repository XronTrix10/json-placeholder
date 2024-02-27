import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "300"
});

export const metadata: Metadata = {
  title: "Json Placeholder",
  description: "A Crud App for Rest API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        {children}
        </body>
    </html>
  );
}
