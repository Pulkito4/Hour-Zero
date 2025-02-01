import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBranches, getSubjects } from "@/firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const subjects = ["Operating System", "DBMS", "PSLP", "CNS"];

export function AddToSubject() {
	const router = useRouter();
	const { toast } = useToast();

	const [formData, setFormData] = useState({
		branch: "",
		semester: "",
		subject: "",
	});

	const [branches, setBranches] = useState<string[]>([]);
	const [subjects, setSubjects] = useState<{ id: string; data: any }[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

	// Fetch branches on component mount
	useEffect(() => {
		const fetchBranches = async () => {
			try {
				const branchList = await getBranches();
				setBranches(branchList);
			} catch (error) {
				toast({
					variant: "destructive",
					title: "Error",
					description: "Failed to fetch branches.",
				});
			} finally {
				setIsLoading(false);
			}
		};

		fetchBranches();
	}, []);

	// Fetch subjects when branch and semester are selected
	useEffect(() => {
		const fetchSubjects = async () => {
			if (formData.branch && formData.semester) {
				try {
					const subjectsList = await getSubjects(
						formData.branch,
						formData.semester
					);
					setSubjects(subjectsList);
				} catch (error) {
					toast({
						variant: "destructive",
						title: "Error",
						description: "Failed to fetch subjects.",
					});
				}
			}
		};

		fetchSubjects();
	}, [formData.branch, formData.semester]);

	const handleInputChange = (field: string, value: string) => {
		setFormData({ ...formData, [field]: value });
		setError(false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { branch, semester, subject } = formData;

		if (!branch || !semester || !subject) {
			setError(true);
			return;
		}

		setIsLoading(true);
		try {
			// Navigate to content upload page with query params
			// router.push(`/dashboard/newdata?branch=${branch}&semester=${semester}&subject=${subject}`);
			router.push("/dashboard/addstuff");
		} catch (error) {
			console.error("Error:", error);
			setError(true);
			setIsLoading(false);
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
						disabled={isLoading}>
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
						disabled={!formData.branch || !formData.semester}>
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
						className="px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 
                     text-white font-medium rounded-lg transform hover:scale-[1.02] 
                     transition-all duration-200 focus:outline-none focus:ring-2 
                     focus:ring-purple-500">
						{isLoading ? "Processing..." : "Continue"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddToSubject;
