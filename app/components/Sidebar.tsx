import React from "react";
import Hamburger from "./Hamburger";
import Image from "next/image";

interface SidebarProps {
  main: React.ReactNode;
}

const items = [
  { label: "Shahih Bukhari", href: "#" },
  { label: "Shahih Muslim", href: "#" },
];

export default function Sidebar({ main }: SidebarProps) {
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
          <h1 className="text-xl font-bold text-neutral ml-4 mb-4">Searchmantic Hadist</h1>
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
                <a href={item.href} className="text-md text-neutral">{item.label}</a>
              </li>
            ))}
          </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
