export interface BaseDocumentData {
  id: string;
  name: string;
  description: string;
  url: string;
}

export type NotesDocument = BaseDocumentData;
export type OthersDocument = BaseDocumentData;
export type VideoDocument = BaseDocumentData;
export type AssignmentDocument = BaseDocumentData;
export type LabDocument = BaseDocumentData;
export type PYQDocument = BaseDocumentData;
export interface SyllabusDocument {
  id: string;
  name: string;
  content: string;
}

export interface UploadDocumentData {
  name: string;
  description: string;
  url: string;
}