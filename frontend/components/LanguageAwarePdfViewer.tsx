"use client";

import { useLanguage } from "@/components/LanguageProvider";

interface PdfContentMap {
  [language: string]: {
    pdfUrl: string;
  };
}

interface LanguageAwarePdfViewerProps {
  contentMap: PdfContentMap;
  defaultHeight?: string | number;
}

export default function LanguageAwarePdfViewer({ 
  contentMap, 
  defaultHeight = 800 
}: LanguageAwarePdfViewerProps) {
  const { selectedLanguage } = useLanguage();
  
  // Use the selected language's PDF or fall back to first available
  const pdfUrl = contentMap[selectedLanguage]?.pdfUrl || 
    Object.values(contentMap)[0]?.pdfUrl;

  return (
    <div className="pdf-container w-full">
      <embed
        src={pdfUrl}
        type="application/pdf"
        width="100%"
        height={defaultHeight}
        title={`PDF Viewer - ${selectedLanguage}`}
        className="rounded-md"
      />
    </div>
  );
}