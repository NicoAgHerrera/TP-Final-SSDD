"use client";

import { useEffect, useState } from "react";
import { useConversion } from "../contexts/ConversionContext";
import AudioWaves from "./AudioWaves";
import { useConvertAudio } from "@/hooks/useConvertAudio";
import { ArrowPathIcon } from "@heroicons/react/24/solid";



export default function CompareView() {
  const { file, convertedFile, targetFormat, setConvertedFile, setStep } = useConversion();
  const { convert, loading, error: hookError } = useConvertAudio();
  const [localError, setLocalError] = useState<string | null>(null);

  // -------------------------------------------------
  // Copia el error del hook SIEMPRE después del render
  // -------------------------------------------------
  useEffect(() => {
    setLocalError(hookError);
  }, [hookError]);

  // -------------------------------------------------
  // Ejecutar conversión
  // -------------------------------------------------
  async function doConvert() {
    if (!file) return;

    setLocalError(null);
    setConvertedFile(null);

    // SI EL FORMATO ES IGUAL → no llamamos al servidor
    const originalExt = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (originalExt === targetFormat.toLowerCase()) {
      setConvertedFile(file);
      return;
    }


    const result = await convert(file, targetFormat);


    if (result) {
      setConvertedFile(result);
      setLocalError(null);
    }
  }

  // Lanzar conversión al montar
  useEffect(() => {
    if (file && !convertedFile) doConvert();
  }, []);

  // -------------------------------------------------
  function handleRetry() {
    setLocalError(null);
    doConvert();
  }

  return (
    <div className="rounded-xl border border-[var(--border)] p-6 bg-[var(--card)] shadow-md">
      <h2 className="text-xl font-bold mb-4">Compará los audios</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ORIGINAL */}
        <div>
          <h3 className="font-semibold mb-1">Original</h3>
          {file && (
            <div className="mt-3 py-6">
              <audio controls src={URL.createObjectURL(file)} className="w-full rounded-md" />
            </div>
          )}
        </div>

        {/* CONVERTIDO */}
        <div>
          <h3 className="font-semibold mb-1">Convertido</h3>

          {/* ERROR */}
          {localError && (
            <div className="mt-7 flex flex-col items-center text-red-500 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-xl">❌</span>
                {localError}
              </p>

              <button
                onClick={handleRetry}
                className="
                  mx-auto mt-1 flex items-center justify-center
                  w-10 h-10 rounded-full
                  bg-blue-600 text-white
                  hover:bg-blue-700
                  transition
                  shadow-md
                "
                aria-label="Reintentar"
              >
                <ArrowPathIcon className="w-7 h-7" />
              </button>

            </div>
          )}


          {loading && !localError && (
            <div className="flex flex-col items-center mt-3 py-6">
              <AudioWaves />
              <p className="text-sm opacity-70 mt-2">Convirtiendo…</p>
            </div>
          )}

          {!loading && convertedFile && !localError && (
            <div className="mt-3 py-6">
              <audio controls src={URL.createObjectURL(convertedFile)} className="w-full rounded-md" />
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => convertedFile && setStep(3)}
        disabled={!convertedFile}
        className="mt-6 w-full py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        Continuar
      </button>
    </div>
  );
}
