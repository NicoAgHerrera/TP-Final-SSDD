"use client";

import { useConversion } from "../contexts/ConversionContext";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const { reset } = useConversion();

  return (
    <header
      className="w-full border-b"
      style={{
        backgroundColor: "var(--header-bg)",
        color: "var(--header-fg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center py-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer select-none"
        >

          <span className="flex items-center text-4xl font-bold tracking-wide">
            C
            <ArrowPathIcon className="w-9 h-9 text-blue-500 mx-1" />
            nvert
            <span className="text-blue-500">App</span>
          </span>
        </button>
      </div>
    </header>
  );
}
