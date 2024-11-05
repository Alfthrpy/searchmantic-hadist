"use client";

type ButtonSearchProps = {
  funClick: () => void; // FunClick adalah fungsi
  conditionLoading: boolean; // Loading adalah boolean
};

export default function ButtonSearch({ funClick, conditionLoading }: ButtonSearchProps) {
  return (
    <>
      <button
        onClick={funClick}
        className="mt-4 btn-neutral text-white py-2 rounded-md btn btn-block max-w-xs mx-auto md:max-w-full"
      >
        {conditionLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <span className="text-pretty">Search</span>
        )}
      </button>
    </>
  );
}
