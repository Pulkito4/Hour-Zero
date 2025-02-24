import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBranches, getSubjects } from "@/firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useSubject } from "@/context/SubjectContext";
import { semesters } from "@/lib/constants";
import { Spinner } from "../ui/Spinner";
import { useBranches, useSubjects } from "@/lib/react-query/queries";

export function AddToSubject() {
	const { setSubject, setBranch, setSemester } =
		useSubject();
	const router = useRouter();
	const { toast } = useToast();

	const [formData, setFormData] = useState({
		branch: "",
		semester: "",
		subject: "",
	});

	const [error, setError] = useState(false);
	const { data: branches = [], isLoading: isLoadingBranches } = useBranches();
    const { data: subjects = [], isLoading: isLoadingSubjects } = useSubjects(
        formData.branch,
        formData.semester
    );

	const isLoading = isLoadingBranches || isLoadingSubjects;


	const handleInputChange = (field: string, value: string) => {
		// console.log(`Updating ${field} with value:`, value);

		setFormData((prev) => ({ ...prev, [field]: value }));
		setError(false);

		// Update context values
		switch (field) {
			case "branch":
				setBranch(value);
				// console.log("Updated branch in context:", value);
				break;
			case "semester":
				const semesterNumber = Number(value);
				setSemester(semesterNumber);
				// console.log("Updated semester in context:", semesterNumber);
				break;
			case "subject":
				setSubject(value);
				// console.log("Updated subject in context:", value);
				break;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { branch, semester, subject } = formData;

		if (!branch || !semester || !subject) {
			setError(true);
			toast({
				title: "Missing Fields",
				description: "Please fill out all fields before proceeding.",
				variant: "destructive",
			});
			return;
		}

		try {
			// console.log("Final form submission:", {
			// 	branch,
			// 	semester: Number(semester),
			// 	subject,
			// 	contextValues: {
			// 		branch: branch,
			// 		semester: semester,
			// 		subject: subject,
			// 	},
			// });
			toast({
				title: "Success!",
				description: `Selected ${subject} from ${branch} - Semester ${semester}`,
				variant: "default",
			});

			router.push("/dashboard/addstuff");
		} catch (error) {
			console.error("Error:", error);
			setError(true);
			toast({
				title: "Error",
				description: "Something went wrong. Please try again.",
				variant: "destructive",
			});
		} 
	};

	return (
		<div className="w-full max-w-2xl mx-auto bg-black text-white p-6 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.3)] border border-purple-500/20">
			<div className="text-center mb-6">
				<h2 className="text-xl md:text-2xl font-semibold">
					Select Branch, Semester & Subject
				</h2>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Select Branch
					</label>
					<select
						value={formData.branch}
						onChange={(e) =>
							handleInputChange("branch", e.target.value)
						}
						className="w-full p-3 bg-gray-800 text-white rounded-lg border border-purple-500/30 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
						required
						disabled={isLoadingBranches}>
						<option value="">Select</option>
						{branches.map((branch) => (
							<option key={branch} value={branch}>
								{branch}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Select Semester
					</label>
					<select
						value={formData.semester}
						onChange={(e) =>
							handleInputChange("semester", e.target.value)
						}
						className="w-full p-3 bg-gray-800 text-white rounded-lg border border-purple-500/30 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
						required>
						<option value="">Select</option>
						{semesters.map((sem) => (
							<option key={sem} value={sem}>
								Semester {sem}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Select Subject
					</label>
					<select
						value={formData.subject}
						onChange={(e) =>
							handleInputChange("subject", e.target.value)
						}
						className="w-full p-3 bg-gray-800 text-white rounded-lg border border-purple-500/30 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
						required
						disabled={!formData.branch || !formData.semester || isLoadingSubjects}>
						<option value="">Select</option>
						{subjects.map((subject) => (
							<option key={subject.id} value={subject.id}>
								{subject.id}
							</option>
						))}
					</select>
				</div>

				{error && (
					<p className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
						Please fill out all fields before proceeding.
					</p>
				)}

				<div className="flex justify-center pt-4">
					<button
						type="submit"
						disabled={isLoading}
						className={`px-8 py-3 font-medium rounded-lg transform transition-all duration-200 
              focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[150px]
              ${
					isLoading
						? "bg-transparent cursor-not-allowed"
						: "bg-purple-600 hover:bg-purple-700 hover:scale-[1.02]"
				}`}>
						{isLoading ? (
							<div className="flex items-center justify-center gap-2">
								<Spinner />
							</div>
						) : (
							"Continue"
						)}
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddToSubject;
