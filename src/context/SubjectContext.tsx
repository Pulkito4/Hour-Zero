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
	const [branch, setBranchState] = useState<string>(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("branch") || "";
		}
		return "";
	});

	const [semester, setSemesterState] = useState<number>(() => {
		if (typeof window !== "undefined") {
			return Number(localStorage.getItem("semester")) || 0;
		}
		return 0;
	});

	const [subject, setSubjectState] = useState<string>(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("selectedSubject") || "";
		}
		return "";
	});

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
		localStorage.setItem("branch", branch);
		localStorage.setItem("semester", semester.toString());
	}, [branch, semester]);

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
