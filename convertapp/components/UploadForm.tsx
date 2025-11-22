"use client";

import { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useConversion } from "../contexts/ConversionContext";

// Formatos permitidos para SUBIR (puede incluir mp4)
const allowedUploadedFormats = ["mp3", "wav", "m4a", "aac", "flac", "mp4"];

// Formatos permitidos para CONVERTIR (audio → audio)
const allowedTargetFormats = ["mp3", "wav", "m4a", "aac", "flac"];

const MAX_SIZE = 100 * 1024 * 1024; // 100MB

export default function UploadForm() {
  const { setFile, setStep, setTargetFormat } = useConversion();

  const [localFile, setLocalFile] = useState<File | null>(null);
  const [localTargetFormat, setLocalTargetFormat] = useState("mp3");
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    const ext = f.name.split(".").pop()?.toLowerCase() || "";

    // Validar formato subido
    if (!allowedUploadedFormats.includes(ext)) {
      setError(
        `Formato no permitido. Permitidos: ${allowedUploadedFormats
          .join(", ")
          .toUpperCase()}`
      );
      setLocalFile(null);
      return;
    }

    if (f.size > MAX_SIZE) {
      setError("El archivo supera el límite de 100MB.");
      setLocalFile(null);
      return;
    }

    setError(null);
    setLocalFile(f);
  }

  function handleSubmit() {
    if (!localFile) return;

    setFile(localFile);
    setTargetFormat(localTargetFormat);
    setStep(2);
  }

  const buttonDisabled = !localFile || !!error;

  return (
    <div
      className="rounded-xl border p-6 shadow-md"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      <h2 className="text-xl font-bold mb-2">Subí tu archivo</h2>
      <p className="text-sm opacity-80 mb-4">
        Formatos soportados:{" "}
        {allowedUploadedFormats.join(", ").toUpperCase()} — Máx 100MB
      </p>

      <label
        className="flex items-center gap-3 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition"
        style={{ borderColor: "var(--border)" }}
      >
        <ArrowUpTrayIcon className="w-6 h-6 text-blue-500" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">Elegí un archivo</span>
          <span className="text-xs opacity-70">Click para seleccionar</span>
        </div>

        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {localFile && (
        <p className="text-xs mt-2 opacity-80">
          Archivo seleccionado: <strong>{localFile.name}</strong>
        </p>
      )}

      <div className="mt-4">
        <label className="text-sm font-medium">Formato destino:</label>
        <select
          value={localTargetFormat}
          onChange={(e) => setLocalTargetFormat(e.target.value)}
          className="mt-1 w-full p-2 rounded-md border"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          {allowedTargetFormats.map((f) => (
            <option key={f} value={f}>
              {f.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={buttonDisabled}
        className="mt-6 w-full py-2 rounded-lg text-white font-semibold transition"
        style={{
          backgroundColor: buttonDisabled ? "#6b7280" : "#3b82f6",
          cursor: buttonDisabled ? "not-allowed" : "pointer",
        }}
      >
        Continuar
      </button>
    </div>
  );
}
