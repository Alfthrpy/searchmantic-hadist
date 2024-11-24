export default function Skeleton() {
  return (
    <div className="animate-pulse w-full space-y-4">
      <div className="w-full">
        {/* Skeleton untuk teks id */}
        <div className="h-4 bg-gray-200 rounded mb-2"></div>

        {/* Skeleton untuk teks arab */}
        <div className="h-6 bg-gray-200 rounded mb-4"></div>

        {/* Skeleton untuk teks terjemahan */}
        <div className="h-4 bg-gray-200 rounded mb-2"></div>

        {/* Skeleton untuk similarity score */}
        <div className="h-3 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
}
