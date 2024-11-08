"use client";
import { useEffect, useState } from "react";
import Skeleton from "./components/Skeletons";

import ButtonSearch from "./components/Button";
import {
  BookOpenIcon,
  DocumentDuplicateIcon,
  ShareIcon,
} from "@heroicons/react/16/solid";

export default function Home() {
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${encodeURIComponent(
    query
  )}`;



  const placeholderOptions = [
    "Kisah kisah Nabi Muhammad",
    "Amalan yang dianjurkan Nabi Muhammad",
    "Kisah para sahabat Nabi Muhammad"
  ];

  const [placeholder, setPlaceholder] = useState(placeholderOptions[0]); // Gunakan default

  useEffect(() => {
    // Set placeholder acak hanya di sisi klien
    setPlaceholder(placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)]);
  }, []);

  const handleSearch = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setError("");
      setResults(data || []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center pt-6">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-neutral mb-4">
          Searchmantic Hadist
        </h1>
        <div className="w-full max-w-lg flex flex-col items-center">
            <label className="input input-bordered w-full flex items-center gap-2 max-w-xs mx-auto md:max-w-full">
              <input
                type="text"
                className="grow"
                placeholder={
                  placeholder
                }
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

          <div className="flex justify-center w-full mt-2">
            <ButtonSearch funClick={handleSearch} conditionLoading={loading} />
          </div>
        </div>

        {error && <div className="mt-4 text-red-500">Error: {error}</div>}

        <div
          className="w-full max-w-screen-xl mt-6 overflow-y-auto"
          style={{ maxHeight: "70vh" }}
        >
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <Skeleton key={index} />
              ))}
            </div>
          ) : (
            results.length > 0 && (
              <>
                <p className="flex justify-center text-neutral">
                  Menampilkan 10 Hadist yang relevan
                </p>
                <ul className="space-y-3">
                  {results.map((item, index) => (
                    <li
                      key={index}
                      className="p-4 rounded-md min-h-[150px] relative"
                    >
                      <div className="card bg-inherit flex">
                        <div className="absolute left-0 top-0 flex flex-col space-y-2 items-center">
                          <button className="p-1">
                            <DocumentDuplicateIcon className="h-5 w-5 text-accent hover:text-neutral" />
                          </button>
                          <button className="p-1">
                            <ShareIcon className="h-5 w-5 text-accent hover:text-neutral" />
                          </button>
                        </div>

                        <div className="flex flex-col ml-12 space-y-3">
                          <div className="flex items-center space-x-2">
                            <BookOpenIcon className="h-6 w-6 text-primary" />
                            <p className="text-md text-primary">
                              Shahih Bukhari : {item.id}
                            </p>
                          </div>
                          <p
                            className="text-xl text-justify font-amiri mt-4" dir="rtl"
                            style={{ lineHeight: "2" }}
                          >
                            {item.text_arab}
                          </p>
                          <p className="text-md mt-3 text-justify text-neutral">
                            {item.text}
                          </p>
                          <div className="badge mt-4 bg-accent text-neutral">
                            Similarity Score:{" "}
                            <span className="font-semibold ml-1 text-primary">
                              {(item.score * 100).toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr className="mt-5" />
                    </li>
                  ))}
                </ul>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}
