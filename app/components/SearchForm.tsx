"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ButtonSearch from "./Button";

export default function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  // const [limit, setLimit] = useState(10)

  // Dapatkan hadits dari pathname
  const hadits = pathname.split("/").pop() || "shahih_bukhari";

  const placeholderOptions = [
    "Kisah kisah Nabi Muhammad",
    "Amalan yang dianjurkan Nabi Muhammad",
    "Kisah para sahabat Nabi Muhammad",
  ];

  const [placeholder, setPlaceholder] = useState(placeholderOptions[0]);

  useEffect(() => {
    setPlaceholder(
      placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)]
    );
  }, []);

  useEffect(() => {
    // Update query ketika searchParams berubah
    const currentQuery = searchParams.get("query");
    if (currentQuery !== null) {
      setQuery(currentQuery);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("query", query);
        params.set("hadits", hadits);
        // params.set('limit', limit.toString());
      } else {
        params.delete("query");
        params.delete("hadits");
      }
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-lg flex flex-col items-center mt-4"
    >
      <label className="input input-bordered w-full flex items-center gap-2 max-w-xs mx-auto md:max-w-full">
        <input
          type="text"
          className="grow"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      <div className="flex flex-col justify-center w-full mt-2 items-center">
        <ButtonSearch funClick={() => {}} conditionLoading={isPending} />
        {/* <select
          id="limit"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="select select-bordered flex-shrink-0 w-32 text-sm mt-2"
        >
          <option value={10}>10 Hadits</option>
          <option value={20}>20 Hadits</option>
          <option value={50}>50 Hadits</option>
          <option value={100}>100 Hadits</option>
        </select> */}
      </div>
    </form>
  );
}
