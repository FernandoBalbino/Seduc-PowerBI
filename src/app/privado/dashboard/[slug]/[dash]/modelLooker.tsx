"use client";
import { useState } from "react";

export default function modelLooker({ params }: { params: string }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="h-full w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 z-10">
          <svg
            className="animate-spin h-30 w-30 mb-4 text-blue-600"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-lg font-medium text-black">
            Carregando dados...
          </span>
        </div>
      )}

      <iframe
        className="w-full h-full rounded-2xl"
        src={params}
        title="Relatório do Google Data Studio"
        allowFullScreen
        onLoad={() => setLoading(false)}
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
