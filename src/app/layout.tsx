import type { Metadata } from "next";
import { Comic_Neue, Kaushan_Script } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const comic = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic",
});

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kaushan",
});

export const metadata: Metadata = {
  title: "{CRUD} Placeholder",
  description: "A Crud App for Rest API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(comic.variable, kaushan.variable, "pt-12")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
