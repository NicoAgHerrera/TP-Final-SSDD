"use client";

import { useState } from "react";

export function useConvertAudio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function convert(file: File, targetFormat: string) {
    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("targetFormat", targetFormat);

      const res = await fetch("/api/convert", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error en el servidor");
      }

      const arrayBuffer = await res.arrayBuffer();
      const converted = new File([arrayBuffer], file.name.replace(/\.[^.]+$/, "") + "." + targetFormat, {
        type: "audio/" + targetFormat,
      });

      return converted;

    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { convert, loading, error };
}
