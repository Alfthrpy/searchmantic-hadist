import SearchForm from "./components/SearchForm";

import { Suspense } from "react";
import Skeleton from "./components/Skeletons";
import SearchResultWrapper from "./components/SearchResultWrapper";




export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-6">
      <h1 className="text-center text-[1.5rem] font-bold text-[#826a5c] sm:text-[1.875rem] md:text-[2.25rem] lg:text-[2.5rem]">
        Searchmantic Hadist
      </h1>
      <SearchForm />
      <Suspense fallback={<Skeleton/>}>
        <SearchResultWrapper />
      </Suspense>
    </div>
  );
}