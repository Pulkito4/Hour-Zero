"use client";

import { FC } from "react";
import { BaseDocument } from "@/types/documents"; // Assuming a common type for all documents
import { X } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-2 sm:p-4">
      <div className="bg-gray-950 rounded-lg w-full h-[95vh] sm:h-[90vh] sm:w-11/12 md:w-4/5 lg:w-3/5 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 sm:top-4 right-2 sm:right-4 text-red px-2 sm:px-3 py-1 rounded hover:text-red/50"
          onClick={onClose}
          aria-label="Close preview"
        >
          <X size={24} className="sm:w-7 sm:h-7" />
        </button>

        {/* Document Details */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white p-4 sm:p-6">{document.title}</h3>
        <p className="text-sm sm:text-base text-gray-400 px-4 sm:px-6">{document.description}</p>

        {/* Document Viewer */}
        <div className="mt-4 h-[75vh] sm:h-[70vh] px-2 sm:px-6">
          <iframe
            className="w-full h-full rounded-lg sm:w-{120px}"
            src={document.pdfUrl + '#view=FitH'}
            title={document.title}
            allow="fullscreen"
            style={{ 
              minWidth: '100%',
              minHeight: '100%'
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};
