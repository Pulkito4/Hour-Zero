"use client";

import { useState } from "react";
import { NotesDocument } from "@/types/documents";

export const NotesTab = ({ documents }: { documents: NotesDocument[] }) => {
  const [selectedNote, setSelectedNote] = useState<NotesDocument | null>(null);

  const handleOpenModal = (doc: NotesDocument) => {
    setSelectedNote(doc);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  return (
    <div>
      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-gray-950 rounded-lg overflow-hidden outline outline-purple-900
                       hover:shadow-[0_0_15px_rgba(139,92,246,1.0)]
                       transform hover:scale-105 
                       transition-all duration-300 ease-in-out
                       border border-purple-500/20 cursor-pointer"
            onClick={() => handleOpenModal(doc)} // Open modal on click
          >
            <div className="p-5 text-center">
              <h3 className="text-lg font-medium text-white mb-3">{doc.title}</h3>
              <p className="text-sm text-gray-400">{doc.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Note Preview Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-950 rounded-lg p-8 w-11/12 md:w-4/5 lg:w-3/5 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              onClick={handleCloseModal}
            >
              Close
            </button>

            {/* Note Details */}
            <h3 className="text-2xl font-semibold text-white mb-4">{selectedNote.title}</h3>
            <p className="text-gray-400 mb-6">{selectedNote.description}</p>

            {/* Note Viewer */}
            <div className="relative pb-[75%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={selectedNote.pdfUrl}
                title={selectedNote.title}
                allow="fullscreen"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
