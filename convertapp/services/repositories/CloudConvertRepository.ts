// CloudConvertRepository.ts
import axios from "axios";

const API_KEY = process.env.CLOUDCONVERT_API_KEY;
const API_URL = "https://api.cloudconvert.com/v2";

export const CloudConvertRepository = {
  async convert({ buffer, filename, targetFormat }: {
    buffer: Buffer;
    filename: string;
    targetFormat: string;
  }) {

    if (!API_KEY) {
      throw new Error("Falta CLOUDCONVERT_API_KEY en .env.local");
    }

    const audioCodecMap: Record<string, string | null> = {
      mp3: "mp3",
      wav: null,
      ogg: "vorbis",
      m4a: "aac",
      aac: "aac",
      flac: "flac",
      mp4: null,
    };

    const codec = audioCodecMap[targetFormat];

    // 1) Crear Job
    const jobRes = await axios.post(
      `${API_URL}/jobs`,
      {
        tasks: {
          "import-my-file": {
            operation: "import/base64",
            file: buffer.toString("base64"),
            filename,
          },
          "convert-my-file": {
            operation: "convert",
            input: ["import-my-file"],
            output_format: targetFormat,
            ...(codec ? { audio_codec: codec } : {})
          },
          "export-my-file": {
            operation: "export/url",
            input: ["convert-my-file"]
          }
        }
      },
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );

    let job = jobRes.data.data;

    // 2) Hacer POLLING hasta que termine
    while (job.status === "waiting" || job.status === "processing") {
      await new Promise(r => setTimeout(r, 1200));

      const statusRes = await axios.get(`${API_URL}/jobs/${job.id}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });

      job = statusRes.data.data;
    }

    if (job.status === "error") {
      console.error("CLOUDCONVERT ERROR JOB:", job);
      throw new Error(job?.tasks?.[1]?.message || "La conversión falló en CloudConvert");
    }

    // 3) Obtener URL exportada
    const exportTask = job.tasks.find((t:any) => t.operation === "export/url");

    const url = exportTask?.result?.files?.[0]?.url;
    if (!url) {
      console.error(job);
      throw new Error("No se pudo obtener el archivo convertido.");
    }

    // 4) Descargar archivo convertido
    const fileRes = await axios.get(url, { responseType: "arraybuffer" });

    return Buffer.from(fileRes.data);
  },
};
