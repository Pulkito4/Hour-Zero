"use client";

import { useState } from "react";
import { NotesDocument } from "@/types/documents";
import { DocumentPreviewer } from "./DocumentPreviewer";

export const NotesTab = ({ documents }: { documents: NotesDocument[] }) => {
	const [selectedNote, setSelectedNote] = useState<NotesDocument | null>(
		null
	);

	const handleOpenModal = (doc: NotesDocument) => {
		setSelectedNote(doc);
	};

	const handleCloseModal = () => {
		setSelectedNote(null);
	};

	return (
		<div>
			{/* Documents Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5">
				{documents.map((doc) => (
					<div
						key={doc.id}
						className="bg-gray-950 rounded-lg overflow-hidden outline outline-purple-900
                       hover:shadow-[0_0_15px_rgba(139,92,246,1.0)]
                       transform hover:scale-105 
                       transition-all duration-300 ease-in-out
                       border border-purple-500/20 cursor-pointer"
						onClick={() => handleOpenModal(doc)}>
						<div className="p-5 text-center">
							<h3 className="text-lg font-medium text-white mb-3">
								{doc.name}
							</h3>
							<p className="text-sm text-gray-400">
								{doc.description}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Document Preview Modal */}
			{selectedNote && (
				<DocumentPreviewer
					document={selectedNote}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};
