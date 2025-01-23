"use client";

import { useEffect, useState } from "react";
import type {
	AssignmentDocument,
	LabDocument,
	NotesDocument,
	OthersDocument,
	PYQDocument,
	SyllabusDocument,
	VideoDocument,
} from "@/types/documents";
import { getDocumentsInSubjectSubCollection } from "@/firebase/firestore";
import { NotesTab } from "@/components/NotesTab";
import SubjectTabs from "@/components/SubjectTabs";
import LeftSidebar from "@/components/LeftSidebar";

export default function SubjectPage() {
	const [documents, setDocuments] = useState<{
		notes: NotesDocument[];
		videos: VideoDocument[];
		pyqs: PYQDocument[];
		assignments: AssignmentDocument[];
		lab: LabDocument[];
		syllabus: SyllabusDocument[];
		others: OthersDocument[];
	}>({
		notes: [],
		videos: [],
		pyqs: [],
		assignments: [],
		lab: [],
		syllabus: [],
		others: [],
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [
					rawNotes,
					rawVideos,
					rawSyllabus,
					rawAssignments,
					rawPyqs,
					rawOthers,
					rawLab,
				] = await Promise.all([
					getDocumentsInSubjectSubCollection(
						"CSE",
						"5",
						"Operating Systems",
						"notes"
					),
					getDocumentsInSubjectSubCollection(
						"CSE",
						"5",
						"Operating Systems",
						"videos"
					),
					getDocumentsInSubjectSubCollection(
						"CSE",
						"5",
						"Operating Systems",
						"syllabus"
					),
					getDocumentsInSubjectSubCollection(
						"CSE",
						"5",
						"Operating Systems",
						"assignments"
					),
					getDocumentsInSubjectSubCollection(
						"CSE",
						"5",
						"Operating Systems",
						"other"
					),
					getDocumentsInSubjectSubCollection(
						"CSE",
						"5",
						"Operating Systems",
						"pyqs"
					),
					getDocumentsInSubjectSubCollection(
						"CSE",
						"5",
						"Operating Systems",
						"lab"
					),
				]);

				const notes: NotesDocument[] = rawNotes.map((doc) => ({
					id: doc.id,
					pdfUrl: doc.data.url,
					description: doc.data.description,
					title: doc.data.name,
				}));

        const videos: VideoDocument[] = rawVideos.map((doc) => ({
          id: doc.id,
          videoUrl: doc.data.url,
          description: doc.data.description,
          title: doc.data.name,
        }));

        const syllabus: SyllabusDocument[] = rawSyllabus.map((doc) => ({
          id: doc.id,
          content: doc.data.content,
          title: doc.data.name,
        }));

        const assignments: AssignmentDocument[] = rawAssignments.map((doc) => ({
          id: doc.id,
          pdfUrl: doc.data.url,
          title: doc.data.name,
        }));

        const pyqs: PYQDocument[] = rawPyqs.map((doc) => ({
          id: doc.id,
          pdfUrl: doc.data.url,
          title: doc.data.name,
        }));

        const others: OthersDocument[] = rawOthers.map((doc) => ({
          id: doc.id,
          pdfUrl: doc.data.url,
          description: doc.data.description,
          title: doc.data.name,
        }));

        const lab: LabDocument[] = rawLab.map((doc) => ({
          id: doc.id,
          pdfUrl: doc.data.url,
          title: doc.data.name,
        }));

				setDocuments({
					notes,
					videos,
					pyqs,
					assignments,
					lab,
					syllabus,
					others,
				});
			} catch (error) {
				console.error("Error fetching documents:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="flex">
			<LeftSidebar />
			<div className="flex-1">
				<SubjectTabs className="w-full">
					<NotesTab documents={documents.notes} />
				</SubjectTabs>
			</div>
		</div>
	);
}
