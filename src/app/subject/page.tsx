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
import {
	getDocumentsInSubjectSubCollection,
	getSubjects,
} from "@/firebase/firestore";
import { NotesTab } from "@/components/subject/NotesTab";
import SubjectTabs from "@/components/subject/SubjectTabs";
import LeftSidebar from "@/components/subject/LeftSidebar";
import { AssignmentsTab } from "@/components/subject/AssignmentsTab";
import { PYQsTab } from "@/components/subject/PYQs";
import { OthersTab } from "@/components/subject/Others";
import { LabFileTab } from "@/components/subject/LabFileTab";
import { VideoTab } from "@/components/subject/VideoTab";
import { SyllabusTab } from "@/components/subject/SyllabusTab";
import { useSubject } from "@/context/SubjectContext";

interface SelectedSubjectInfo {
	id: string;
	folderName: string;
}
import { Spinner } from "@/components/ui/Spinner";
import { NoData } from "@/components/subject/NoData";
import { NoContent } from "@/components/subject/NoContent";
import { LabCodeTab } from "@/components/subject/LabCodesTab";
import { Metadata } from "next";
import Head from "next/head";
import { useSubjectDocuments } from "@/lib/react-query/queries";

const WelcomeMessage = () => (
	<div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
		<h2 className="text-2xl font-bold text-white">Welcome to Hour Zero</h2>
		<p className="text-gray-400">
			Select a subject from the sidebar to get started
		</p>
		<p className="text-slate-500">
			DISCLAIMER: All the assignments and lab files are as per VIPS CSE
			2022-2026 Batch
		</p>
	</div>
);

export default function SubjectPage() {
	const { branch, semester } = useSubject();
	const [selectedSubject, setSelectedSubject] =
		useState<SelectedSubjectInfo | null>(null);
	// const [isLoading, setIsLoading] = useState<boolean>(false);

	const isPlaceholderOnly = (documents: any[]) => {
		return documents.length === 1 && documents[0].id === "placeholder";
	};
	const [hasSubjects, setHasSubjects] = useState<boolean>(true);

	const { data: notesData, isLoading: isLoadingNotes } =
		useSubjectDocuments<NotesDocument>(
			branch,
			semester?.toString(),
			selectedSubject?.id,
			"notes"
		);

	const { data: videosData, isLoading: isLoadingVideos } =
		useSubjectDocuments<VideoDocument>(
			branch,
			semester?.toString(),
			selectedSubject?.id,
			"videos"
		);

	const { data: syllabusData, isLoading: isLoadingSyllabus } =
		useSubjectDocuments<SyllabusDocument>(
			branch,
			semester?.toString(),
			selectedSubject?.id,
			"syllabus"
		);

	const { data: assignmentsData, isLoading: isLoadingAssignments } =
		useSubjectDocuments<AssignmentDocument>(
			branch,
			semester?.toString(),
			selectedSubject?.id,
			"assignments"
		);

	const { data: pyqsData, isLoading: isLoadingPyqs } =
		useSubjectDocuments<PYQDocument>(
			branch,
			semester?.toString(),
			selectedSubject?.id,
			"pyqs"
		);

	const { data: othersData, isLoading: isLoadingOthers } =
		useSubjectDocuments<OthersDocument>(
			branch,
			semester?.toString(),
			selectedSubject?.id,
			"other"
		);

	const { data: labData, isLoading: isLoadingLab } =
		useSubjectDocuments<LabDocument>(
			branch,
			semester?.toString(),
			selectedSubject?.id,
			"lab"
		);

	const documents: {
		notes: NotesDocument[];
		videos: VideoDocument[];
		syllabus: SyllabusDocument[];
		assignments: AssignmentDocument[];
		pyqs: PYQDocument[];
		others: OthersDocument[];
		lab: LabDocument[];
	} = {
		notes: notesData || [],
		videos: videosData || [],
		syllabus: syllabusData || [],
		assignments: assignmentsData || [],
		pyqs: pyqsData || [],
		others: othersData || [],
		lab: labData || [],
	};
	const isLoading =
		isLoadingNotes ||
		isLoadingVideos ||
		isLoadingSyllabus ||
		isLoadingAssignments ||
		isLoadingPyqs ||
		isLoadingOthers ||
		isLoadingLab;

	// useEffect(() => {
	//   const fetchSubjects = async () => {
	//     if (!branch || !semester) return;

	//     setIsLoading(true);
	//     try {
	//       const subjects = await getSubjects(branch, semester.toString());
	//       setHasSubjects(subjects && subjects.length > 0);
	//     } catch (error) {
	//       console.error("Error fetching subjects:", error);
	//       setHasSubjects(false);
	//     } finally {
	//       setIsLoading(false);
	//     }
	//   };

	//   fetchSubjects();
	// }, [branch, semester]);

	const handleSelectSubject = (subjectId: string, folderName: string) => {
		setSelectedSubject({ id: subjectId, folderName });
	};
	// const [documents, setDocuments] = useState<{
	//   notes: NotesDocument[];
	//   videos: VideoDocument[];
	//   pyqs: PYQDocument[];
	//   assignments: AssignmentDocument[];
	//   lab: LabDocument[];
	//   syllabus: SyllabusDocument[];
	//   others: OthersDocument[];
	// }>({
	//   notes: [],
	//   videos: [],
	//   pyqs: [],
	//   assignments: [],
	//   lab: [],
	//   syllabus: [],
	//   others: [],
	// });

	const [activeTab, setActiveTab] = useState<number>(0); // Track the active tab index

	// useEffect(() => {
	//   if (!branch || !semester || !selectedSubject?.id) {
	//     return;
	//   }
	//   const fetchData = async () => {
	//     setIsLoading(true);
	//     try {
	//       const [
	//         rawNotes,
	//         rawVideos,
	//         rawSyllabus,
	//         rawAssignments,
	//         rawPyqs,
	//         rawOthers,
	//         rawLab,
	//       ] = await Promise.all([
	//         getDocumentsInSubjectSubCollection(
	//           branch,
	//           semester.toString(),
	//           selectedSubject.id,
	//           "notes"
	//         ),
	//         getDocumentsInSubjectSubCollection(
	//           branch,
	//           semester.toString(),
	//           selectedSubject.id,
	//           "videos"
	//         ),
	//         getDocumentsInSubjectSubCollection(
	//           branch,
	//           semester.toString(),
	//           selectedSubject.id,
	//           "syllabus"
	//         ),
	//         getDocumentsInSubjectSubCollection(
	//           branch,
	//           semester.toString(),
	//           selectedSubject.id,
	//           "assignments"
	//         ),
	//         getDocumentsInSubjectSubCollection(
	//           branch,
	//           semester.toString(),
	//           selectedSubject.id,
	//           "pyqs"
	//         ),
	//         getDocumentsInSubjectSubCollection(
	//           branch,
	//           semester.toString(),
	//           selectedSubject.id,
	//           "other"
	//         ),
	//         getDocumentsInSubjectSubCollection(
	//           branch,
	//           semester.toString(),
	//           selectedSubject.id,
	//           "lab"
	//         ),
	//       ]);

	//       setDocuments({
	//         notes: rawNotes.map((doc) => ({
	//           id: doc.id,
	//           url: doc.data.url,
	//           description: doc.data.description,
	//           name: doc.data.name,
	//         })),
	//         videos: rawVideos.map((doc) => ({
	//           id: doc.id,
	//           url: doc.data.url,
	//           description: doc.data.description,
	//           name: doc.data.name,
	//         })),
	//         syllabus: rawSyllabus.map((doc) => ({
	//           id: doc.id,
	//           content: doc.data.content,
	//           name: doc.data.name,
	//         })),
	//         assignments: rawAssignments.map((doc) => ({
	//           id: doc.id,
	//           url: doc.data.url,
	//           name: doc.data.name,
	//           description: doc.data.description,
	//         })),
	//         pyqs: rawPyqs.map((doc) => ({
	//           id: doc.id,
	//           url: doc.data.url,
	//           name: doc.data.name,
	//           description: doc.data.description,
	//         })),
	//         others: rawOthers.map((doc) => ({
	//           id: doc.id,
	//           url: doc.data.url,
	//           description: doc.data.description,
	//           name: doc.data.name,
	//         })),
	//         lab: rawLab.map((doc) => ({
	//           id: doc.id,
	//           url: doc.data.url,
	//           name: doc.data.name,
	//           description: doc.data.description,
	//         })),
	//       });
	//     } catch (error) {
	//       console.error("Error fetching documents:", error);
	//     } finally {
	//       setIsLoading(false); // Hide loader
	//     }
	//   };

	//   fetchData();
	// }, [branch, semester, selectedSubject?.id]);

	const renderTabContent = () => {
		if (isLoading) {
			return (
				<div className="flex justify-center items-center min-h-[300px]">
					<Spinner />
				</div>
			);
		}
		switch (activeTab) {
			case 0: // Syllabus
				return isPlaceholderOnly(documents.syllabus) ? (
					<NoContent />
				) : (
					<SyllabusTab documents={documents.syllabus} />
				);
			case 1: // Notes
				return isPlaceholderOnly(documents.notes) ? (
					<NoContent />
				) : (
					<NotesTab documents={documents.notes} />
				);
			case 2: // Assignments
				return isPlaceholderOnly(documents.assignments) ? (
					<NoContent />
				) : (
					<AssignmentsTab documents={documents.assignments} />
				);
			case 3: // Lab
				if (isPlaceholderOnly(documents.lab)) {
					return selectedSubject?.folderName ? (
						<>
							<h1 className="text-center text-slate-500">
								Pdf or Word document for the lab file will be
								uploaded soon...
							</h1>
							<LabCodeTab
								folderName={selectedSubject.folderName}
							/>
						</>
					) : (
						<NoContent />
					);
				} else {
					return (
						<LabFileTab
							documents={documents.lab}
							folderName={selectedSubject?.folderName || null}
						/>
					);
				}
			case 4: // PYQs
				return isPlaceholderOnly(documents.pyqs) ? (
					<NoContent />
				) : (
					<PYQsTab documents={documents.pyqs} />
				);
			case 5: // Others
				return isPlaceholderOnly(documents.others) ? (
					<NoContent />
				) : (
					<OthersTab documents={documents.others} />
				);
			case 6: // Videos
				return isPlaceholderOnly(documents.videos) ? (
					<NoContent />
				) : (
					<VideoTab documents={documents.videos} />
				);
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
				{isLoading ? (
					<div className="flex items-center justify-center min-h-[300px]">
						<Spinner />
					</div>
				) : !hasSubjects ? (
					<NoData />
				) : !selectedSubject ? (
					<WelcomeMessage />
				) : (
					<>
						<Head>
							<title>{`HourZero - ${selectedSubject.id}`}</title>
							<meta
								name="description"
								content={`Get all the study materials for ${selectedSubject.id} at HourZero. Find notes, assignments, previous year questions, syllabus, and more.`}
							/>
							<meta
								property="og:title"
								content={`${selectedSubject.id} Study Resources`}
							/>
							<meta
								name="keywords"
								content={`HourZero, hourzero, subjects, engineering, btech, ${selectedSubject.id}, ${selectedSubject.id} notes,${selectedSubject.id} assignments, ${selectedSubject.id} PYQ, ${selectedSubject.id} syllabus, ${selectedSubject.id} playlist,${selectedSubject.id} lab`}
							/>
						</Head>
						<SubjectTabs
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							className="w-full">
							{renderTabContent()}
						</SubjectTabs>
					</>
				)}
			</main>
		</div>
	);
}
