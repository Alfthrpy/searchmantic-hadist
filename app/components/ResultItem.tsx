'use client'

import { BookOpenIcon, DocumentDuplicateIcon, ShareIcon } from "@heroicons/react/16/solid";
import Swal from "sweetalert2";
import formatTitle from "@/utils/formatTitle";

interface ResultItemProps {
  item: {
    text_arab: string;
    text: string;
    kitab: string;
    id: string;
    score: number;
  };
}

export default function ResultItem({ item }: ResultItemProps) {
  const handleCopy = (arabicText: string, translation: string) => {
    const fullText = `${arabicText}\n\n${translation}`;
    navigator.clipboard
      .writeText(fullText)
      .then(() => {
        Swal.fire({
          title: "Berhasil!",
          text: "Hadits telah disalin ke clipboard.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Gagal!",
          text: `Tidak dapat menyalin teks: ${error.message}`,
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      });
  };

  const handleShare = (arabicText: string, translation: string) => {
    const fullText = `${arabicText}\n\n${translation}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Hadits",
          text: fullText,
        })
        .then(() => {
          Swal.fire({
            title: "Berhasil!",
            text: "Hadits telah dibagikan.",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Gagal!",
            text: `Tidak dapat membagikan teks: ${error.message}`,
            icon: "error",
            confirmButtonText: "Coba Lagi",
          });
        });
    } else {
      Swal.fire({
        title: "Fitur Tidak Didukung!",
        text: "Browser Anda tidak mendukung fitur share.",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <li className="p-4 rounded-md min-h-[150px] relative">
      <div className="card bg-inherit flex">
        <div className="absolute left-0 top-0 flex flex-col space-y-2 items-center">
          <button
            className="p-1"
            onClick={() => handleCopy(item.text_arab, item.text)}
          >
            <DocumentDuplicateIcon className="h-5 w-5 text-accent hover:text-neutral" />
          </button>
          <button
            className="p-1"
            onClick={() => handleShare(item.text_arab, item.text)}
          >
            <ShareIcon className="h-5 w-5 text-accent hover:text-neutral" />
          </button>
        </div>

        <div className="flex flex-col ml-12 space-y-3">
          <div className="flex items-center space-x-2">
            <BookOpenIcon className="h-6 w-6 text-primary" />
            <p className="text-md text-primary">
              {formatTitle(item.kitab)} : {item.id}
            </p>
          </div>
          <p
            className="text-xl text-justify font-amiri mt-4"
            dir="rtl"
            style={{ lineHeight: "2" }}
          >
            {item.text_arab}
          </p>
          <p className="text-md mt-3 text-justify text-neutral">
            {item.text}
          </p>
        </div>
      </div>
      <hr className="mt-5" />
    </li>
  );
}