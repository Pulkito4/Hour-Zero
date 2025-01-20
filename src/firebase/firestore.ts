import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase.config"

interface Subject {
    subjectCode: string;
    credits: number;
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
        await setDoc(subjectRef, subjectData);
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



