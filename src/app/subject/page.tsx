"use client";
import React, { useEffect, useState } from "react";
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
import { AssignmentsTab } from "@/components/AssignmentsTab";
import { PYQsTab } from "@/components/PYQs";
import { OthersTab } from "@/components/Others";
import { LabFileTab } from "@/components/LabFileTab";
import { VideoTab } from "@/components/VideoTab";
import { SyllabusTab } from "@/components/SyllabusTab";
import { useSubject } from "@/context/SubjectContext";

interface SelectedSubjectInfo {
	id: string;
	folderName: string;
}

const WelcomeMessage = () => (
	<div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
		<h2 className="text-2xl font-bold text-white">Welcome to Hour Zero</h2>
		<p className="text-gray-400">
			Select a subject from the sidebar to get started
		</p>
	</div>
);

export default function SubjectPage() {
	const { branch, semester } = useSubject();
	const [selectedSubject, setSelectedSubject] =
		useState<SelectedSubjectInfo | null>(null);

	const handleSelectSubject = (subjectId: string, folderName: string) => {
		setSelectedSubject({ id: subjectId, folderName });
	};
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

	const [activeTab, setActiveTab] = useState<number>(0); // Track the active tab index

	useEffect(() => {
		if (!branch || !semester || !selectedSubject?.id) {
			return;
		}
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
						branch,
						semester.toString(),
						selectedSubject.id,
						"notes"
					),
					getDocumentsInSubjectSubCollection(
						branch,
						semester.toString(),
						selectedSubject.id,
						"videos"
					),
					getDocumentsInSubjectSubCollection(
						branch,
						semester.toString(),
						selectedSubject.id,
						"syllabus"
					),
					getDocumentsInSubjectSubCollection(
						branch,
						semester.toString(),
						selectedSubject.id,
						"assignments"
					),
					getDocumentsInSubjectSubCollection(
						branch,
						semester.toString(),
						selectedSubject.id,
						"pyqs"
					),
					getDocumentsInSubjectSubCollection(
						branch,
						semester.toString(),
						selectedSubject.id,
						"other"
					),
					getDocumentsInSubjectSubCollection(
						branch,
						semester.toString(),
						selectedSubject.id,
						"lab"
					),
				]);

				setDocuments({
					notes: rawNotes.map((doc) => ({
						id: doc.id,
						url: doc.data.url,
						description: doc.data.description,
						name: doc.data.name,
					})),
					videos: rawVideos.map((doc) => ({
						id: doc.id,
						url: doc.data.url,
						description: doc.data.description,
						name: doc.data.name,
					})),
					syllabus: rawSyllabus.map((doc) => ({
						id: doc.id,
						content: doc.data.content,
						name: doc.data.name,
					})),
					assignments: rawAssignments.map((doc) => ({
						id: doc.id,
						url: doc.data.url,
						name: doc.data.name,
						description: doc.data.description,
					})),
					pyqs: rawPyqs.map((doc) => ({
						id: doc.id,
						url: doc.data.url,
						name: doc.data.name,
						description: doc.data.description,
					})),
					others: rawOthers.map((doc) => ({
						id: doc.id,
						url: doc.data.url,
						description: doc.data.description,
						name: doc.data.name,
					})),
					lab: rawLab.map((doc) => ({
						id: doc.id,
						url: doc.data.url,
						name: doc.data.name,
						description: doc.data.description,
					})),
				});
			} catch (error) {
				console.error("Error fetching documents:", error);
			}
		};

		fetchData();
	}, [branch, semester, selectedSubject?.id]);

	const renderTabContent = () => {
		switch (activeTab) {
			case 0:
				return <SyllabusTab documents={documents.syllabus} />;
			case 1:
				return <NotesTab documents={documents.notes} />;

			case 2:
				return <AssignmentsTab documents={documents.assignments} />;
			case 3:
				return (
					<LabFileTab
						documents={documents.lab}
						folderName={selectedSubject?.folderName || null}
					/>
					//add accordion here
				);
			case 4:
				return <PYQsTab documents={documents.pyqs} />;
			case 5:
				return <OthersTab documents={documents.others} />;

			case 6:
				return <VideoTab documents={documents.videos} />;
			default:
				return (
					<div className="text-white">
						Content for this tab is coming soon!
					</div>
				);
		}
	};

	return (
		<div className="flex min-h-screen">
			<LeftSidebar onSelectSubject={handleSelectSubject} />
			<main className="flex-1">
				{activeTab === null || !selectedSubject ? (
					<WelcomeMessage />
				) : (
					<SubjectTabs
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						className="w-full">
						{renderTabContent()}
					</SubjectTabs>
				)}
			</main>
		</div>
	);
}
