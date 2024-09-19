"use client";
import { useState } from "react";
import Skeleton from "./components/Skeletons";



export default function Home() {
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${encodeURIComponent(query)}`;
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        endpoint
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setError("")
      setResults(data || []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10">
      <h1 className="text-4xl font-bold text-gray-700 mb-4">
        Searchmantic Hadist
      </h1>

      <div className="w-full max-w-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sunnah paling utama"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {error && <div className="mt-4 text-red-500">Error: {error}</div>}

      {loading ? (
        <div className="mt-6 w-full max-w-screen-xl space-y-4">
          {/* Render 3 skeletons sebagai placeholder */}
          {[1, 2, 3].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        results.length > 0 && (
          <ul className="mt-6 w-full max-w-screen-xl space-y-4">
            {results.map((item, index) => (
              <li key={index} className="p-4 rounded-md">
                <p className="text-md"> Shahih Bukhari : {item.id + 1}</p>
                <p className="text-xl text-right rtl font-arabic mt-4" style={{ lineHeight: '2' }}>
                  {item.text_arab}
                </p>
                <p className="text-md mt-3">{item.text}</p>
                <p className="text-sm text-gray-600 mt-3">
                  Similarity Score: {(item.score * 100).toFixed(2)}%
                </p>
                <hr className="mt-5" />
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
