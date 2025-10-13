import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { Suspense } from 'react'; // <-- TAMBAHKAN INI

import { Amiri, Inter } from '@next/font/google';

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Searchmantic Hadist",
  description: "Search Engine for Shahih Bukhari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="autumn">
      {/* ... bagian <head> tetap sama ... */}

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${amiri.className}antialiased`}
      >
        {/* Bungkus Sidebar di sini */}
        <Suspense fallback={<LoadingSidebar>{children}</LoadingSidebar>}>
          <Sidebar main={children} />
        </Suspense>
      </body>
    </html>
  );
}

const LoadingSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {children} {/* Tetap render children agar halaman tidak kosong */}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 w-80 p-4">
          {/* Ini adalah versi loading state dari sidebar */}
          <li className="h-8 w-3/4 bg-gray-300 rounded animate-pulse mb-4"></li>
          <li className="h-6 w-1/2 bg-gray-300 rounded animate-pulse mb-2"></li>
          <li className="h-6 w-1/2 bg-gray-300 rounded animate-pulse mb-2"></li>
          <li className="h-6 w-1/2 bg-gray-300 rounded animate-pulse mb-2"></li>
        </ul>
      </div>
    </div>
  );
};
