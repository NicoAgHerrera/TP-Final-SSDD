export async function sendConvertRequest(file: File, targetFormat: string) {
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

  return res.arrayBuffer();
}
