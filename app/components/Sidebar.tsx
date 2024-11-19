'use client';

import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import Hamburger from "./Hamburger";
import Image from "next/image";

interface SidebarProps {
  main: React.ReactNode;
}

const items = [
  { label: "Hadist Shahih Bukhari", href: "/hadist_shahih_bukhari" },
  { label: "Hadist Shahih Muslim", href: "/hadist_shahih_muslim" },
  { label: "Hadist Sunan Tirmidzi", href: "/hadist_sunan_tirmidzi" },
  { label: "Hadist Sunan Nasai", href: "/hadist_sunan_nasai" },
  { label: "Hadist Sunan Abu Daud", href: "/hadist_sunan_abu_daud" },
  { label: "Hadist Sunan Ibnu Majah", href: "/hadist_sunan_ibnu_majah" },
];


export default function Sidebar({ main }: SidebarProps) {
  const pathname = usePathname(); // Dapatkan URI aktif

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {main}
        <Hamburger />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay sticky top-0"
        ></label>

        <ul className="menu bg-base-200 text-base-content w-80 p-4 min-h-full">
          <h1 className="text-xl font-bold text-neutral ml-4 mb-4">
            Searchmantic Hadist
          </h1>
          <li>
            <h2 className="menu-title flex items-center">
              <Image
                src="/book-bookmark.svg"
                alt="icon"
                width={20}
                height={20}
                className="mr-2 text-primary"
              />
              Source
            </h2>

            <ul>
              {items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`text-md text-neutral ${
                      pathname === item.href ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
