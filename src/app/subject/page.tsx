"use client";
import React, { useCallback, useState, useEffect, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type {
	AssignmentDocument,
	LabDocument,
	NotesDocument,
	OthersDocument,
	PYQDocument,
	SyllabusDocument,
	VideoDocument,
} from "@/types/documents";

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
import { Spinner } from "@/components/ui/Spinner";
import { NoData } from "@/components/subject/NoData";
import { NoContent } from "@/components/subject/NoContent";
import { LabCodeTab } from "@/components/subject/LabCodesTab";
import { useSubjectDocuments } from "@/lib/react-query/queries";

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
		<p className="text-slate-500">
			DISCLAIMER: All the assignments and lab files are as per VIPS CSE
			2022-2026 Batch
		</p>
	</div>
);

function SubjectPageContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { branch: contextBranch, semester: contextSemester } = useSubject();

	const branch = searchParams.get("branch") || contextBranch;
	const semester = searchParams.get("semester") || contextSemester?.toString();
	const subjectId = searchParams.get("subject") || "";
	const folderName = searchParams.get("folderName") || "";
	const tabParam = searchParams.get("tab");
	
	const activeTab = tabParam ? parseInt(tabParam, 10) : 0;
	const selectedSubject = useMemo<SelectedSubjectInfo | null>(() => {
		return subjectId ? { id: subjectId, folderName } : null;
	}, [subjectId, folderName]);

	useEffect(() => {
		if (selectedSubject) {
			document.title = `HourZero - ${selectedSubject.id}`;
		} else {
			document.title = "Hour Zero - Subjects";
		}
	}, [selectedSubject]);

	const isPlaceholderOnly = (documents: { id: string }[]) => {
		return documents.length === 1 && documents[0].id === "placeholder";
	};
	const [hasSubjects, setHasSubjects] = useState<boolean>(true);

	const handleSubjectsStatus = useCallback((hasAnySubjects: boolean) => {
		setHasSubjects(hasAnySubjects);
	}, []);

	const { data: notesData, isLoading: isLoadingNotes } =
		useSubjectDocuments<NotesDocument>(
			branch,
			semester,
			selectedSubject?.id,
			"notes"
		);

	const { data: videosData, isLoading: isLoadingVideos } =
		useSubjectDocuments<VideoDocument>(
			branch,
			semester,
			selectedSubject?.id,
			"videos"
		);

	const { data: syllabusData, isLoading: isLoadingSyllabus } =
		useSubjectDocuments<SyllabusDocument>(
			branch,
			semester,
			selectedSubject?.id,
			"syllabus"
		);

	const { data: assignmentsData, isLoading: isLoadingAssignments } =
		useSubjectDocuments<AssignmentDocument>(
			branch,
			semester,
			selectedSubject?.id,
			"assignments"
		);

	const { data: pyqsData, isLoading: isLoadingPyqs } =
		useSubjectDocuments<PYQDocument>(
			branch,
			semester,
			selectedSubject?.id,
			"pyqs"
		);

	const { data: othersData, isLoading: isLoadingOthers } =
		useSubjectDocuments<OthersDocument>(
			branch,
			semester,
			selectedSubject?.id,
			"other"
		);

	const { data: labData, isLoading: isLoadingLab } =
		useSubjectDocuments<LabDocument>(
			branch,
			semester,
			selectedSubject?.id,
			"lab"
		);

	const documents = {
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

	const handleSelectSubject = (id: string, folder: string) => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set("subject", id);
		newParams.set("folderName", folder);
		if (!newParams.has("tab")) {
			newParams.set("tab", "0");
		}
		if (!newParams.has("branch") && branch) newParams.set("branch", branch);
		if (!newParams.has("semester") && semester) newParams.set("semester", semester);
		router.push(`/subject?${newParams.toString()}`, { scroll: false });
	};

	const handleSetActiveTab = (index: number) => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set("tab", index.toString());
		router.push(`/subject?${newParams.toString()}`, { scroll: false });
	};

	const renderTabContent = () => {
		if (isLoading) {
			return (
				<div className="flex justify-center items-center min-h-[300px]">
					<Spinner />
				</div>
			);
		}
		switch (activeTab) {
			case 0:
				return isPlaceholderOnly(documents.syllabus) ? (
					<NoContent />
				) : (
					<SyllabusTab documents={documents.syllabus} />
				);
			case 1:
				return isPlaceholderOnly(documents.notes) ? (
					<NoContent />
				) : (
					<NotesTab documents={documents.notes} />
				);
			case 2:
				return isPlaceholderOnly(documents.assignments) ? (
					<NoContent />
				) : (
					<AssignmentsTab documents={documents.assignments} />
				);
			case 3:
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
			case 4:
				return isPlaceholderOnly(documents.pyqs) ? (
					<NoContent />
				) : (
					<PYQsTab documents={documents.pyqs} />
				);
			case 5:
				return isPlaceholderOnly(documents.others) ? (
					<NoContent />
				) : (
					<OthersTab documents={documents.others} />
				);
			case 6:
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
			<LeftSidebar
				onSelectSubject={handleSelectSubject}
				onSubjectsStatus={handleSubjectsStatus}
			/>
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
						<SubjectTabs
							activeTab={activeTab}
							setActiveTab={handleSetActiveTab}
							className="w-full">
							{renderTabContent()}
						</SubjectTabs>
					</>
				)}
			</main>
		</div>
	);
}

export default function SubjectPage() {
	return (
		<Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Spinner /></div>}>
			<SubjectPageContent />
		</Suspense>
	);
}
