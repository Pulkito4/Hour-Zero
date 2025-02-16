import { LabDocument } from "@/types/documents";
import { useEffect, useState } from "react";
import { DocumentPreviewer } from "./DocumentPreviewer";
import Accordion from "../Accordion";
import { Octokit } from "@octokit/rest";
import { LabCodeTab } from "./LabCodesTab";

interface LabFileTabProps {
	documents: LabDocument[];
	folderName: string | null;
}
export const LabFileTab: React.FC<LabFileTabProps> = ({
	documents,
	folderName,
}) => {
	const [selectedLabFile, setSelectedLabFile] = useState<LabDocument | null>(
		null
	);

	const handleOpenModal = (doc: LabDocument) => {
		setSelectedLabFile(doc);
	};

	const handleCloseModal = () => {
		setSelectedLabFile(null);
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
							<h3 className="text-lg font-medium text-white">
								{doc.name}
							</h3>
							{/* <p className="text-sm text-gray-400">{doc.title}</p> */}
						</div>
					</div>
				))}
			</div>

			{/* Document Preview Modal */}
			{selectedLabFile && (
				<DocumentPreviewer
					document={selectedLabFile}
					onClose={handleCloseModal}
				/>
			)}
			{folderName && (
				<>
					<hr className="mb-5" />
					<h2 className="text-center font-bold text-2xl">CODES</h2>
					<LabCodeTab folderName={folderName} />
				</>
			)}
		</div>
	);
};
