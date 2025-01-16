import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config"

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
