// ./components/SearchForm.tsx

"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import ButtonSearch from "./Button";

// 1. Definisikan tipe untuk props yang diterima komponen ini
interface SearchFormProps {
  initialQuery?: string; // Tanda '?' berarti prop ini tidak wajib (opsional)
  initialHadits?: string;
}

export default function SearchForm({
  initialQuery,
  initialHadits,
}: SearchFormProps) { // 2. Terapkan tipe pada props
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Gunakan prop untuk nilai awal state
  const [query, setQuery] = useState(initialQuery || "");

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

  // 3. Tambahkan tipe untuk event form (ini adalah praktik terbaik)
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      const params = new URLSearchParams();
      if (query) {
        params.set("query", query);
        params.set("hadits", initialHadits || "shahih_bukhari");
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
          // 4. (Opsional) Tambahkan tipe untuk event input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
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
      </div>
    </form>
  );
}