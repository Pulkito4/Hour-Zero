"use client";

import { FC, useState } from "react";
import { BaseDocumentData } from "@/types/documents"; // Assuming a common type for all documents
import { Download, X } from "lucide-react";

interface DocumentProps {
	id: string;
	title: string;
	description?: string;
	pdfUrl: string;
}

interface DocumentPreviewerProps {
	document: BaseDocumentData;
	onClose: () => void;
}

export const DocumentPreviewer: FC<DocumentPreviewerProps> = ({
	document: doc,
	onClose,
}) => {
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownload = async () => {
		try {
			setIsDownloading(true);
			const response = await fetch(doc.url);
			const blob = await response.blob();

			const extension = doc.url.split('.').pop() || 'pdf';

			// Create file name from document title
			const fileName = `${doc.name
				.replace(/[^a-z0-9]/gi, "_")
				.toLowerCase()}.${extension}`;

			// // Create file name from document title
			// const fileName = `${doc.name
			// 	.replace(/[^a-z0-9]/gi, "_")
			// 	.toLowerCase()}.pdf`;

			// Create a link element and trigger download
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.download = fileName;

			// Append to body, click and cleanup
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(link.href);
		} catch (error) {
			console.error("Download failed:", error);
		} finally {
			setIsDownloading(false);
		}
	};


	const getViewerUrl = (url: string) => {
        const extension = url.split('.').pop()?.toLowerCase();
        if (extension === 'doc' || extension === 'docx') {
            return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
        }
        return url;
    };

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-2 sm:p-4">
			<div className="bg-gray-950 rounded-lg w-full h-[95vh] sm:h-[90vh] sm:w-11/12 md:w-4/5 lg:w-3/5 relative">
				{/* Toolbar */}
				<div className="flex justify-between items-center p-4 border-b border-gray-800">
					<div className="flex flex-col gap-2">
						<h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white p-4 sm:p-6">
							{doc.name}
						</h3>
						<p className="text-sm sm:text-base text-gray-400 px-4 sm:px-6">
							{doc.description}
						</p>
					</div>

					<div className="flex items-center gap-4">
						<button
							onClick={handleDownload}
							disabled={isDownloading}
							className="text-primary-300 p-2 hover:text-primary-light transition-colors font-bold hover:bg-gray-800 rounded-lg">
							<Download size={24} />
							<span className="hidden sm:inline">
								{isDownloading ? "Downloading..." : ""}
							</span>
						</button>
						<button
							onClick={onClose}
							aria-label="Close preview"
							className="text-rose-500 hover:text-red transition-colors p-2 hover:bg-gray-800 rounded-lg font-bold mr-3">
							<X size={24} />
						</button>
					</div>
				</div>

				{/* Document Details */}

				{/* Document Viewer */}
				<div className="mt-4 h-[75vh] sm:h-[70vh] px-2 sm:px-6">
					{/* <iframe
						className="w-full h-full rounded-lg sm:w-{120px} sm:text-{20px}"
						// src={`${doc.url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
						src={getViewerUrl(doc.url)}
						title={doc.name}
						allow="fullscreen"
						style={{
							minWidth: "100%",
							minHeight: "100%",
						}}></iframe> */}

<iframe
                        className="w-full h-full rounded-lg"
                        src={`${getViewerUrl(doc.url)}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        title={doc.name}
                        allow="fullscreen"
                        style={{
                            minWidth: "100%",
                            minHeight: "100%",
                        }}></iframe>
				</div>
			</div>
		</div>
	);
};
