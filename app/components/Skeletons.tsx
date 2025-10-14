export default function Skeleton() {
  // tampilkan beberapa skeleton item agar loading terasa "hidup"
  return (
    <ul className="w-full max-w-screen-xl mt-6 space-y-3">
      {[...Array(3)].map((_, i) => (
        <li
          key={i}
          className="p-4 rounded-md min-h-[150px] relative animate-pulse shadow-sm"
        >
          <div className="card bg-inherit flex">
            {/* Ikon kiri (copy & share) */}
            <div className="absolute left-0 top-0 flex flex-col space-y-2 items-center mt-2 ml-2">
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
            </div>

            {/* Konten utama */}
            <div className="flex flex-col ml-12 space-y-3 w-full">
              {/* Judul kitab dan id */}
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 bg-gray-200 rounded"></div>
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
              </div>

              {/* Teks arab */}
              <div className="space-y-2 mt-2">
                <div className="h-5 w-11/12 bg-gray-200 rounded"></div>
                <div className="h-5 w-9/12 bg-gray-200 rounded"></div>
                <div className="h-5 w-10/12 bg-gray-200 rounded"></div>
              </div>

              {/* Terjemahan */}
              <div className="space-y-2 mt-4">
                <div className="h-4 w-10/12 bg-gray-200 rounded"></div>
                <div className="h-4 w-8/12 bg-gray-200 rounded"></div>
                <div className="h-4 w-6/12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          <hr className="mt-5 border-gray-200" />
        </li>
      ))}
    </ul>
  );
}
