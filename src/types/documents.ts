export interface BaseDocumentData {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface NotesDocument extends BaseDocumentData { }
export interface OthersDocument extends BaseDocumentData { }
export interface VideoDocument extends BaseDocumentData { }
export interface AssignmentDocument extends BaseDocumentData { }
export interface LabDocument extends BaseDocumentData { }
export interface PYQDocument extends BaseDocumentData { }
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