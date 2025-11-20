"use client";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useConversion } from "../contexts/ConversionContext";

export default function Header() {
  const { reset } = useConversion();

  return (
    <header className="w-full bg-[var(--header)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex items-center justify-center px-6 py-4">

        <button
          onClick={reset}
          className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer select-none"
        >
          <ArrowPathIcon className="w-7 h-7 text-blue-500" />
          <span className="text-2xl font-bold text-[var(--text)]">
            <span>Convert</span>
            <span className="text-blue-500">App</span>
          </span>
        </button>

      </div>
    </header>
  );
}
