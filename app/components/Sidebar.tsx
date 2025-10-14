'use client';

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Hamburger from "./Hamburger";
import Image from "next/image";

interface SidebarProps {
  main: React.ReactNode;
}

const items = [
  { label: "Hadist Shahih Bukhari", hadits: "shahih_bukhari" },
  { label: "Hadist Shahih Muslim", hadits: "shahih_muslim" },
  { label: "Hadist Sunan Tirmidzi", hadits: "sunan_tirmidzi" },
  { label: "Hadist Sunan Nasai", hadits: "sunan_nasai" },
  { label: "Hadist Sunan Abu Daud", hadits: "sunan_abu_daud" },
  { label: "Hadist Sunan Ibnu Majah", hadits: "sunan_ibnu_majah" },
];

export default function Sidebar({ main }: SidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentHadits = searchParams.get("hadits") || "shahih_bukhari";

  const handleNavigation = (hadits: string) => {
    // Update URL tanpa reload penuh
    router.push(`/?hadits=${hadits}`);

    // Tutup drawer setelah klik
    const drawerCheckbox = document.getElementById("my-drawer") as HTMLInputElement | null;
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {main}
        <Hamburger />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay sticky top-0"></label>

        <ul className="menu bg-base-200 text-base-content w-80 p-4 min-h-full">
          <h1 className="text-xl font-bold text-neutral ml-4 mb-4">Searchmantic Hadist</h1>
          <li>
            <h2 className="menu-title flex items-center">
              <Image src="/book-bookmark.svg" alt="icon" width={20} height={20} className="mr-2 text-primary" />
              Source
            </h2>

            <ul>
              {items.map((item) => (
                <li key={item.hadits}>
                  <button
                    type="button"
                    onClick={() => handleNavigation(item.hadits)}
                    className={`text-md text-neutral ${currentHadits === item.hadits ? "active" : ""}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
