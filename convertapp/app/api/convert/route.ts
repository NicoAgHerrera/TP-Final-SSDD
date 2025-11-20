import { NextResponse } from "next/server";
import { ConversionService } from "@/services/backend/conversionService";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const file = form.get("file") as File;
    const targetFormat = form.get("targetFormat") as string;

    if (!file) {
      return NextResponse.json({ error: "Archivo faltante." }, { status: 400 });
    }

    if (!targetFormat) {
      return NextResponse.json({ error: "Formato destino faltante." }, { status: 400 });
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
