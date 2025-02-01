export interface BaseDocument {
  id: string;
  title: string;
  // description: string;
  // pdfUrl: string;
}

export interface NotesDocument extends BaseDocument {
  pdfUrl: string;
  description: string;
}

export interface OthersDocument extends BaseDocument {
  pdfUrl: string;
  description: string;
}

export interface VideoDocument extends BaseDocument {
  videoUrl: string;
  description: string;
}

export interface AssignmentDocument extends BaseDocument {
  pdfUrl: string;
}

export interface LabDocument extends BaseDocument {
  pdfUrl: string;
  
}

export interface PYQDocument extends BaseDocument {
  pdfUrl: string;
}

export interface SyllabusDocument extends BaseDocument {
  content: string
}

export interface DocumentData {
  name: string;
  description: string;
  url: string;
  createdAt: Date;
}