import "./globals.css";
import { ConversionProvider } from "../contexts/ConversionContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "ConvertApp",
  description: "Conversor de audio en Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col transition-colors duration-300">

        <ConversionProvider>
          {/* HEADER */}
          <Header />
            {/* CONTENIDO */}
            <main className="flex-1 max-w-3xl mx-auto w-full py-0 px-4">
              {children}
            </main>
          {/* FOOTER pegado abajo siempre */}
          <Footer />
        </ConversionProvider>

      </body>
    </html>
  );
}
