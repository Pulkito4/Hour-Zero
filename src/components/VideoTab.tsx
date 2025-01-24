"use client";

import { useState } from "react";
import { VideoDocument } from "@/types/documents";


export const VideoTab = ({ documents }: { documents: VideoDocument[] }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoDocument | null>(null);

  const handleOpenModal = (doc: VideoDocument) => {
    setSelectedVideo(doc);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  console.log(selectedVideo)

  const getEmbedUrl = (url: string) => {
    try {
      // Handle playlist URLs
      const playlistMatch = url.match(/[&?]list=([a-zA-Z0-9_-]+)/);
      if (playlistMatch) {
        const playlistId = playlistMatch[1];
        return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
      }
  
      // Handle video URLs
      const videoMatch = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/);
      if (videoMatch) {
        const videoId = videoMatch[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
  
      // Return original URL if no matches
      return url;
    } catch (error) {
      console.error('Error processing YouTube URL:', error);
      return url;
    }
  };

  return (
    <div>
      {/* Video Grid */}
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
            </div>
          </div>
        ))}
      </div>

      {/* Video Preview Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-950 rounded-lg p-5 w-11/12 md:w-3/4 lg:w-2/4">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              onClick={handleCloseModal}
            >
              Close
            </button>

            {/* Video Player */}
            <div className="relative pb-[56.25%] mb-5">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={getEmbedUrl(selectedVideo.videoUrl)}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Details */}
            <h3 className="text-xl font-medium text-white mb-3">{selectedVideo.title}</h3>
            <p className="text-gray-400">{selectedVideo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
