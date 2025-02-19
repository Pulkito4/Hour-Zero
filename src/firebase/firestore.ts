import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase.config"
import { UploadDocumentData } from "@/types/documents";

interface Subject {
  subjectCode: string;
  credits: number;
  folderName: string;
}

// Define your subcollections
const subCollections = [
  "assignments",
  "notes",
  "lab",
  "other",
  "pyqs",
  "syllabus",
  "videos",
];


export const addSubject = async (
  branch: string,
  semester: number,
  subjectName: string,
  subjectData: Subject
): Promise<void> => {
  try {
    const subjectRef = doc(
      db,
      `Btech/${branch}/${semester}/${subjectName}`
    );

    // Add subject data to Firestore
    await setDoc(subjectRef, { ...subjectData, folderName: "" });
    console.log(`Subject ${subjectName} added successfully.`);

    // Create subcollections and delete the placeholder document
    for (const subCollection of subCollections) {
      const placeholderRef = doc(
        collection(subjectRef, subCollection),
        "placeholder"
      );

      // Create placeholder document
      await setDoc(placeholderRef, { placeholder: true });
    }

    console.log("All subcollections created and placeholder documents deleted.");
  } catch (error) {
    console.error("Error adding subject:", error);
  }
};


export const getSubjects = async (branch: string, semester: string): Promise<{ id: string, data: any }[]> => {
  try {
    const subjectsSnapshot = await getDocs(collection(db, `Btech/${branch}/${semester}`));
    const subjects = subjectsSnapshot.docs.map(doc => ({
      id: doc.id,        // Document ID (subject name)
      data: doc.data()   // Document data
    }));
    console.log(subjects);
    subjects.forEach(subject => console.log(subject.id));   // print subject 
    return subjects; // Return the array of subjects with IDs

  } catch (error) {
    console.error("Error fetching subjects: ", error);
    throw error; // Rethrow the error to handle it in the calling function if needed
  }
};



export const getDocumentsInSubjectSubCollection = async (
  branch: string,
  semester: string,
  subject: string,
  subCollection: string
): Promise<{ id: string, data: any }[]> => {
  try {
    const subjectRef = doc(db, `Btech/${branch}/${semester}/${subject}`);
    const subCollectionSnapshot = await getDocs(collection(subjectRef, subCollection));
    const documents = subCollectionSnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }));
    console.log(documents);
    return documents;

  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw error; // Rethrow the error to handle it in the calling function if needed
  }
};

export const getBranches = async (): Promise<string[]> => {
  try {
    const branchesSnapshot = await getDocs(collection(db, "Btech"));
    const branches = branchesSnapshot.docs.map(doc => doc.id);
    console.log(branches);
    return branches;
  } catch (error) {
    console.error("Error fetching branches: ", error);
    throw error;
  }
}


export const AddToSubject = async (
  branch: string,
  semester: string,
  subject: string,
  subcollection: string,
  documentData: UploadDocumentData
): Promise<void> => {
  try {
    // Get reference to the subject's subcollection
    const subjectRef = doc(db, `Btech/${branch}/${semester}/${subject}`);
    const subCollectionRef = collection(subjectRef, subcollection);

    // Delete placeholder document if it exists
    try {
      await deleteDoc(doc(subCollectionRef, 'placeholder'));
    } catch (error) {
      // Ignore error if placeholder doesn't exist
    }

    // Add new document with auto-generated ID
    const newDocRef = doc(subCollectionRef);
    await setDoc(newDocRef, {
      name: documentData.name,
      description: documentData.description,
      url: documentData.url,
    });

    console.log(`Document added successfully to ${subcollection}`);
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const addVideos = async (
  branch: string,
  semester: string,
  subject: string,
  subcollection: string,
  videoData: UploadDocumentData
): Promise<void> => {
  try {
    const subjectRef = doc(db, `Btech/${branch}/${semester}/${subject}`);
    const subCollectionRef = collection(subjectRef, subcollection);

    try {
      await deleteDoc(doc(subCollectionRef, 'placeholder'));
    } catch (error) {
      // Ignore error if placeholder doesn't exist
    }

    const newDocRef = doc(subCollectionRef);
    await setDoc(newDocRef, videoData);

    console.log(`Video added successfully to ${subcollection}`);
  } catch (error) {
    console.error("Error adding video:", error);
    throw error;
  }
};

export interface SyllabusData {
  name: string;
  content: string;

}

export const addSyllabus = async (
  branch: string,
  semester: string,
  subject: string,
  syllabusData: SyllabusData
): Promise<void> => {
  try {
    const subjectRef = doc(db, `Btech/${branch}/${semester}/${subject}`);
    const syllabusCollectionRef = collection(subjectRef, 'syllabus');

    // Try to delete placeholder if it exists
    try {
      await deleteDoc(doc(syllabusCollectionRef, 'placeholder'));
    } catch (error) {
      // Ignore error if placeholder doesn't exist
    }

    const newDocRef = doc(syllabusCollectionRef);
    await setDoc(newDocRef, syllabusData);

    console.log('Syllabus added successfully');
  } catch (error) {
    console.error('Error adding syllabus:', error);
    throw error;
  }
};