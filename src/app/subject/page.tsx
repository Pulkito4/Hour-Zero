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

  const [activeTab, setActiveTab] = useState<number>(0); // Track the active tab index

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
            "pyqs"
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
            "lab"
          ),
        ]);

        setDocuments({
          notes: rawNotes.map((doc) => ({
            id: doc.id,
            pdfUrl: doc.data.url,
            description: doc.data.description,
            title: doc.data.name,
          })),
          videos: rawVideos.map((doc) => ({
            id: doc.id,
            videoUrl: doc.data.link,
            description: doc.data.description,
            title: doc.data.name,
          })),
          syllabus: rawSyllabus.map((doc) => ({
            id: doc.id,
            content: doc.data.content,
            title: doc.data.name,
          })),
          assignments: rawAssignments.map((doc) => ({
            id: doc.id,
            pdfUrl: doc.data.url,
            title: doc.data.name,
          })),
          pyqs: rawPyqs.map((doc) => ({
            id: doc.id,
            pdfUrl: doc.data.url,
            title: doc.data.name,
          })),
          others: rawOthers.map((doc) => ({
            id: doc.id,
            pdfUrl: doc.data.url,
            description: doc.data.description,
            title: doc.data.name,
          })),
          lab: rawLab.map((doc) => ({
            id: doc.id,
            pdfUrl: doc.data.url,
            title: doc.data.name,
          })),
        });
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <SyllabusTab documents={documents.syllabus} />;
      case 1:
        return <NotesTab documents={documents.notes} />;

      case 2:
        return <AssignmentsTab documents={documents.assignments} />
      case 3: 
        return (
          <LabFileTab documents={documents.lab} />
          //add accordion here
        );
      case 4:
        return(<PYQsTab documents={documents.pyqs} />);
      case 5:
        return(<OthersTab documents={documents.others}  />);

        case 6:
          return(<VideoTab documents={documents.videos}  />)
      default:
        return <div className="text-white">Content for this tab is coming soon!</div>;
    }
  };



  return (
    <div className="flex">
      <LeftSidebar />
      <div className="flex-1">
        <SubjectTabs activeTab={activeTab} setActiveTab={setActiveTab}>
          {renderTabContent()}
        </SubjectTabs>
      </div>
    </div>
  );
}
