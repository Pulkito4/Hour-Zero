import React, { useState, useEffect } from "react";
import { addSubject, getBranches } from "@/firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { semesters } from "@/lib/constants";

const CreateSubject = () => {
	const { toast } = useToast();
	const [branch, setBranch] = useState("");
	const [semester, setSemester] = useState(0);
	const [subjectName, setSubjectName] = useState("");
	const [subjectCode, setSubjectCode] = useState("");
	const [credits, setCredits] = useState(0);
	const [branches, setBranches] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchBranches = async () => {
			try {
				const branchList = await getBranches();
				setBranches(branchList);
			} catch (error) {
				console.error("Failed to fetch branches:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchBranches();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!branch ||
			!semester ||
			!subjectName ||
			!subjectCode ||
			credits <= 0
		) {
			toast({
				variant: "destructive",
				title: "Invalid Input",
				description: "Please fill all fields with valid values.",
			});
			return;
		}

		try {
			await addSubject(branch, semester, subjectName, {
				subjectCode,
				credits,
				folderName:""
			});

			toast({
				title: "Success!",
				description: `Subject ${subjectName} was added successfully. Please wait atleast 30 seconds before adding content to this subject.`,
			});

			// Reset form
			setBranch("");
			setSemester(0);
			setSubjectName("");
			setSubjectCode("");
			setCredits(0);
		} catch (error) {
			console.error("Error adding subject:", error);
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to add subject. Please try again.",
			});
		}
	};

	if (isLoading) {
		return <div className="text-white">Loading...</div>;
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6 text-white">
			<div className="space-y-4">
				<div className="flex flex-col gap-2">
					<label htmlFor="branch" className="text-sm font-medium">
						Branch:
					</label>
					<select
						id="branch"
						value={branch}
						onChange={(e) => setBranch(e.target.value)}
						className="w-full p-2 bg-gray-800 rounded-md"
						required>
						<option value="">Select Branch</option>
						{branches.map((branch) => (
							<option key={branch} value={branch}>
								{branch}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="semester" className="text-sm font-medium">
						Semester:
					</label>
					<select
						id="semester"
						value={semester}
						onChange={(e) => setSemester(parseInt(e.target.value))}
						className="w-full p-2 bg-gray-800 rounded-md"
						required>
						<option value="">Select Semester</option>
						{semesters.map((sem) => (
							<option key={sem} value={sem}>
								{sem}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="subjectName"
						className="text-sm font-medium">
						Subject Name:
					</label>
					<input
						id="subjectName"
						type="text"
						value={subjectName}
						onChange={(e) => setSubjectName(e.target.value)}
						className="w-full p-2 bg-gray-800 rounded-md"
						required
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="subjectCode"
						className="text-sm font-medium">
						Subject Code:
					</label>
					<input
						id="subjectCode"
						type="text"
						value={subjectCode}
						onChange={(e) => setSubjectCode(e.target.value)}
						className="w-full p-2 bg-gray-800 rounded-md"
						required
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="credits" className="text-sm font-medium">
						Credits:
					</label>
					<input
						id="credits"
						type="number"
						min="1"
						value={credits}
						onChange={(e) => setCredits(Number(e.target.value))}
						className="w-full p-2 bg-gray-800 rounded-md"
						required
					/>
				</div>

				<button
					type="submit"
					className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700">
					Add Subject
				</button>
			</div>
		</form>
	);
};

export default CreateSubject;
