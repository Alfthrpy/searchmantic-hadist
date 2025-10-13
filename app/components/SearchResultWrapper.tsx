'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import SearchResultsContent from './SearchResultsContent';

function SearchParamsHandler() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const hadits = searchParams.get('hadits') || '';

  return <SearchResultsContent query={query} hadits={hadits} />;
}

export default function SearchResultsWrapper() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-screen-xl mt-6 flex justify-center">
        <p className="text-neutral">Memuat...</p>
      </div>
    }>
      <SearchParamsHandler />
    </Suspense>
  );
}
