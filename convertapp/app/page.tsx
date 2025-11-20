"use client";

import { useConversion } from "../contexts/ConversionContext";
import StepHeader from "../components/StepHeader";
import UploadForm from "../components/UploadForm";
import CompareView from "../components/CompareView";
import DownloadView from "../components/DownloadView";

export default function HomePage() {
  const { step } = useConversion();

  return (
    <div className="space-y-12 pb-12">
      <StepHeader step={step} />

      {step === 1 && <UploadForm />}
      {step === 2 && <CompareView />}
      {step === 3 && <DownloadView />}
    </div>
  );
}
