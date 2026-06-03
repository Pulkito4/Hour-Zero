"use client";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";

interface SubjectContextType {
	branch: string;
	semester: number;
	subject: string;
	setBranch: (branch: string) => void;
	setSemester: (semester: number) => void;
	setSubject: (subject: string) => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

const sanitizePath = (value: string): string => {
	return value.replace(/\/+/g, "/").replace(/^\/|\/$/g, "");
};

export const SubjectProvider = ({ children }: { children: ReactNode }) => {
	const [branch, setBranchState] = useState<string>("");
	const [semester, setSemesterState] = useState<number>(0);
	const [subject, setSubjectState] = useState<string>("");
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setBranchState(localStorage.getItem("branch") || "");
		setSemesterState(Number(localStorage.getItem("semester")) || 0);
		setSubjectState(localStorage.getItem("selectedSubject") || "");
		setIsMounted(true);
	}, []);

	const setBranch = (value: string) => {
		const sanitizedValue = sanitizePath(value);
		setBranchState(sanitizedValue);
		setSubjectState("");
		localStorage.removeItem("selectedSubject");
	};

	const setSemester = (value: number) => {
		setSemesterState(value);
		setSubjectState("");
		localStorage.removeItem("selectedSubject");
	};

	const setSubject = (value: string) => {
		const sanitizedValue = sanitizePath(value);
		setSubjectState(sanitizedValue);
		if (typeof window !== "undefined") {
			localStorage.setItem("selectedSubject", sanitizedValue);
		}
	};

	useEffect(() => {
		if (isMounted) {
			localStorage.setItem("branch", branch);
			localStorage.setItem("semester", semester.toString());
		}
	}, [branch, semester, isMounted]);

	return (
		<SubjectContext.Provider
			value={{
				branch,
				semester,
				subject,
				setBranch,
				setSemester,
				setSubject,
			}}>
			{children}
		</SubjectContext.Provider>
	);
};

export const useSubject = () => {
	const context = useContext(SubjectContext);
	if (!context) {
		throw new Error("useSubject must be used within a SubjectProvider");
	}
	return context;
};
