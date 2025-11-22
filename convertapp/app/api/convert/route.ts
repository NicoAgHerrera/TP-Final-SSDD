import { NextResponse } from "next/server";
import { ConversionService } from "@/services/backend/conversionService";

const MAX_SIZE = 100 * 1024 * 1024; // 100MB

// Mapeo de extensiones → MIME types esperados
const allowedMimeTypes: Record<string, string[]> = {
  mp3: ["audio/mpeg"],
  wav: ["audio/wav", "audio/x-wav"],
  m4a: ["audio/mp4", "audio/x-m4a"],
  aac: ["audio/aac", "audio/x-aac", "audio/vnd.dlna.adts"],
  flac: ["audio/flac", "audio/x-flac"],
  mp4: ["audio/mp4", "video/mp4"], // algunos navegadores lo marcan como video/mp4
};

// Extensiones permitidas para SUBIR
const allowedUploadedFormats = ["mp3", "wav", "m4a", "aac", "flac", "mp4"];

// Extensiones permitidas para SALIDA
const allowedTargetFormats = ["mp3", "wav", "m4a", "aac", "flac"];

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const file = form.get("file") as File;
    const targetFormat = form.get("targetFormat") as string;

    // ---- Validación de presencia ----
    if (!file) {
      return NextResponse.json({ error: "Archivo faltante." }, { status: 400 });
    }

    if (!targetFormat) {
      return NextResponse.json(
        { error: "Formato destino faltante." },
        { status: 400 }
      );
    }

    // ---- Validación de tamaño ----
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "El archivo supera el tamaño máximo permitido de 100MB." },
        { status: 400 }
      );
    }

    // ---- Validación del tipo de archivo de entrada ----
    // Extraer extensión del archivo subido
    const originalExtension = file.name.split(".").pop()?.toLowerCase();

    if (!originalExtension || !allowedUploadedFormats.includes(originalExtension)) {
      return NextResponse.json(
        {
          error: `Formato de archivo no permitido. Formatos válidos: ${allowedUploadedFormats.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Validación MIME basada en la extensión detectada
    const validMimes = allowedMimeTypes[originalExtension];
    if (!validMimes || !validMimes.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Tipo MIME inválido para extensión .${originalExtension}. MIME recibido: ${file.type}. MIME esperados: ${validMimes.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // ---- Validación del formato destino ----
    if (!allowedTargetFormats.includes(targetFormat.toLowerCase())) {
      return NextResponse.json(
        {
          error: `Formato destino inválido. Opciones válidas: ${allowedTargetFormats.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // ---- Lógica de negocio (service) ----
    const result = await ConversionService.convert(file, targetFormat);

    return new NextResponse(result.buffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${result.outputFilename}"`,
      },
    });
  } catch (err: any) {
    console.error("Error en API /api/convert:", err);

    return NextResponse.json(
      { error: err?.message ?? "Error interno del servidor." },
      { status: 500 }
    );
  }
}
