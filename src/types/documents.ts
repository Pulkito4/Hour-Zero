// export interface BaseDocument {
//   id: string;
//   title: string;
//   // description: string;
//   // pdfUrl: string;
// }

// export interface NotesDocument extends BaseDocument {
//   pdfUrl: string;
//   description: string;
// }

// export interface OthersDocument extends BaseDocument {
//   pdfUrl: string;
//   description: string;
// }

// export interface VideoDocument extends BaseDocument {
//   videoUrl: string;
//   description: string;
// }

// export interface AssignmentDocument extends BaseDocument {
//   pdfUrl: string;
// }

// export interface LabDocument extends BaseDocument {
//   pdfUrl: string;
// }

// export interface PYQDocument extends BaseDocument {
//   pdfUrl: string;
// }

// export interface SyllabusDocument extends BaseDocument {
//   content: string
// }

// //creating a generic document type to handle all types of documents upload 
// export interface DocumentData {
//   name: string;
//   description: string;
//   url: string;
//   createdAt: Date;
// }


// // MAKE ALL THE DOCUMENTS LIKE DocumentData-> add id:string to this only, then handle changes in components,  this will also modify the firestore structure and add attributes like "description" to each sub collection

// filepath: /d:/Coding stuff (self practice and projects and all)/Hour Zero/hourzero/src/types/documents.ts
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