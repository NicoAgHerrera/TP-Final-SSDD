"use client";

import {
  ArrowUpTrayIcon,
  ArrowsRightLeftIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

type Props = {
  step: 1 | 2 | 3;
};

export default function StepHeader({ step }: Props) {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 mt-4"> 

      <div className="relative">

        {/* Línea completa */}
        <div className="absolute top-7 left-1 right-4 h-4 bg-gray-600 rounded-full -translate-y-1/2"></div>

        {/* Línea progresada */}
        <div
          className="absolute top-7 left-1 h-4 bg-blue-500 rounded-full -translate-y-1/2 transition-all duration-500"
          style={{
            width: step === 1 ? "0%" : step === 2 ? "50%" : "95%",
          }}
        ></div>

        {/* CÍRCULOS */}
        <div className="relative flex justify-between items-center">

          {/* Paso 1 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all
              ${step >= 1 ? "bg-blue-500 border-blue-400 text-white" : "bg-gray-700 border-gray-500 text-gray-300"}`}
            >
              <ArrowUpTrayIcon className="w-6 h-6" />
            </div>
            <span className={`${step >= 1 ? "text-blue-400" : "text-gray-400"} mt-1 text-base`}>
              Subir
            </span>
          </div>

          {/* Paso 2 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all
              ${step >= 2 ? "bg-blue-500 border-blue-400 text-white" : "bg-gray-700 border-gray-500 text-gray-300"}`}
            >
              <ArrowsRightLeftIcon className="w-6 h-6" />
            </div>
            <span className={`${step >= 2 ? "text-blue-400" : "text-gray-400"} mt-1 text-base`}>
              Comparar
            </span>
          </div>

          {/* Paso 3 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all
              ${step >= 3 ? "bg-blue-500 border-blue-400 text-white" : "bg-gray-700 border-gray-500 text-gray-300"}`}
            >
              <ArrowDownTrayIcon className="w-6 h-6" />
            </div>
            <span className={`${step >= 3 ? "text-blue-400" : "text-gray-400"} mt-1 text-base`}>
              Descargar
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
