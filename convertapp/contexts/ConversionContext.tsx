"use client";

import { createContext, useContext, useState } from "react";

type Step = 1 | 2 | 3;

type ConversionContextType = {
  step: Step;
  file: File | null;
  convertedFile: File | null;
  targetFormat: string;

  setStep: (s: Step) => void;
  setFile: (f: File | null) => void;
  setConvertedFile: (f: File | null) => void;
  setTargetFormat: (f: string) => void;
  reset: () => void;
};

const ConversionContext = createContext<ConversionContextType | null>(null);

export function ConversionProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<Step>(1);
  const [file, setFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState("mp3");

  function reset() {
    setStep(1);
    setFile(null);
    setConvertedFile(null);
  }

  return (
    <ConversionContext.Provider
      value={{
        step,
        file,
        convertedFile,
        targetFormat,
        setStep,
        setFile,
        setConvertedFile,
        setTargetFormat,
        reset,
      }}
    >
      {children}
    </ConversionContext.Provider>
  );
}

export function useConversion() {
  const ctx = useContext(ConversionContext);
  if (!ctx) throw new Error("useConversion must be used inside <ConversionProvider>");
  return ctx;
}
