import { CloudConvertRepository } from "@/services/repositories/CloudConvertRepository";

export const ConversionService = {
  async convert(file: File, targetFormat: string) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const originalName = file.name.replace(/\.[^.]+$/, "");
    const outputFilename = `${originalName}.${targetFormat}`;
    try {
      const convertedBuffer = await CloudConvertRepository.convert({
        buffer,
        filename: file.name,
        targetFormat,
      });

      return {
        buffer: convertedBuffer,
        outputFilename,
      };

    } catch (err: any) {
      console.error("Error en ConversionService:", err);
      throw new Error(err?.message ?? "Error inesperado al convertir el archivo.");
    }
  },
};
