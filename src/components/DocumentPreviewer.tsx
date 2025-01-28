"use client";

import { FC } from "react";
import { BaseDocument } from "@/types/documents"; // Assuming a common type for all documents

interface Document {
    id: string;
    title: string;
    description?: string;
    pdfUrl: string;
  }
  
interface DocumentPreviewerProps {
  document: Document;
  onClose: () => void;
}

export const DocumentPreviewer: FC<DocumentPreviewerProps> = ({ document, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gray-950 rounded-lg p-8 w-11/12 md:w-4/5 lg:w-3/5 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </button>

        {/* Document Details */}
        <h3 className="text-2xl font-semibold text-white mb-4">{document.title}</h3>
        <p className="text-gray-400 mb-6">{document.description}</p>

        {/* Document Viewer */}
        <div className="relative pb-[75%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={document.pdfUrl}
            title={document.title}
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
