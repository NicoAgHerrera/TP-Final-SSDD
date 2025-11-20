"use client";

import { useConversion } from "../contexts/ConversionContext";

export default function DownloadView() {
  const { convertedFile, reset } = useConversion();

  return (
    <div className="rounded-xl border border-[var(--border)] p-6 bg-[var(--card)] shadow-md">
      <h2 className="text-xl font-bold mb-4">Descargá tu archivo</h2>

      {convertedFile && (
        <>
          <p className="mb-4 text-sm">
            Archivo listo: <strong>{convertedFile.name}</strong>
          </p>

          <a
            download={convertedFile.name}
            href={URL.createObjectURL(convertedFile)}
            className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg"
          >
            Descargar
          </a>
        </>
      )}

      <button onClick={reset} className="mt-6 w-full py-2 rounded-lg bg-[var(--footer-bg)]">
        Volver al inicio
      </button>
    </div>
  );
}
