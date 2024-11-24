
import { Key } from "react";
import ResultItem from "./ResultItem";
import { searchHadith } from "@/lib/actions";

interface SearchResultsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SearchResults({ searchParams }: SearchResultsProps) {
  const query = searchParams.query as string;
  const hadits = searchParams.hadits as string;

  if (!query) return null;
  if (!hadits) return null;

  const results = await searchHadith(query, hadits);

  return (
    <div
      className="w-full max-w-screen-xl mt-6 overflow-y-auto"
      style={{ maxHeight: "70vh" }}
    >
      {results.length > 0 && (
        <>
          <p className="flex justify-center text-neutral">
            Menampilkan 10 Hadits yang relevan
          </p>
          <ul className="space-y-3">
            {results.map((item: { text_arab: string; text: string; kitab: string; id: string; score: number; }, index: Key | null | undefined) => (
              <ResultItem key={index} item={item} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}