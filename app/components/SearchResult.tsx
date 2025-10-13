import { Key } from "react";
import ResultItem from "./ResultItem";
import { searchHadith } from "@/lib/actions";

interface SearchResultsProps {
  searchParams: {
    query: string;
    hadits: string;
  };
}
export default async function SearchResults({
  searchParams,
}: SearchResultsProps) {
  const params = await searchParams;
  const query = params.query;
  const hadits = params.hadits;

  if (!query || !hadits) {
    console.warn("Validasi gagal: Query dan Hadits harus diisi", {
      query,
      hadits,
    });
    return null;
  }

  try {
    const results = await searchHadith(query, hadits);

    if (!query || !hadits) {
      console.warn("Validasi gagal: Query dan Hadits harus diisi", {
        query,
        hadits,
      });
      return null;
    }

    return (
      <div
        className="w-full max-w-screen-xl mt-6 overflow-y-auto"
        style={{ maxHeight: "70vh" }}
      >
        {results.results.length > 0 ? (
          <>
            <p className="flex justify-center text-neutral">
              Menampilkan {results.length} Hadits yang relevan
            </p>
            <ul className="space-y-3">
              {results.results.map(
                (
                  item: {
                    text_arab: string;
                    text: string;
                    kitab: string;
                    id: string;
                    score: number;
                  },
                  index: Key | null | undefined
                ) => (
                  <ResultItem key={index} item={item} />
                )
              )}
            </ul>
          </>
        ) : (
          <p className="flex justify-center text-red-600">{results.error}</p>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="w-full max-w-screen-xl mt-6">
        <p className="flex justify-center text-red-500">
          Terjadi kesalahan:{" "}
          {error instanceof Error ? error.message : "Kesalahan tidak diketahui"}
        </p>
      </div>
    );
  }
}
