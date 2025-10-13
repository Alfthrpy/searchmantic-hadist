
import { Suspense } from "react";
import SearchForm from "../components/SearchForm";
import Skeleton from "../components/Skeletons";
import SearchResults from "../components/SearchResult";


interface PageProps {
  searchParams: {
    query: string;
    hadits: string;
  };
}

  


export default function Page({ searchParams }: PageProps) {
  const { query, hadits } = searchParams || {};
  return (
    <div className="min-h-screen flex flex-col items-center pt-6">
      <h1 className="text-center text-[1.5rem] font-bold text-[#826a5c] sm:text-[1.875rem] md:text-[2.25rem] lg:text-[2.5rem]">
        Searchmantic Hadist
      </h1>
      <SearchForm />
      {query && hadits ? (
        <Suspense fallback={<Skeleton />}>
          <SearchResults searchParams={{ query, hadits }} />
        </Suspense>
      ) : (
        <p className="mt-6 text-center text-neutral">
          Masukkan kata kunci pencarian dan pilih kategori hadits
        </p>
      )}
    </div>
  );
}