import { LabDocument } from "@/types/documents";
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import { CodeViewerModal } from "./CodeViewerModal";
import { FileCode } from "lucide-react";
import { useSubject } from "@/context/SubjectContext";
import { getYearFromSemester } from "@/lib/utils";
import { Spinner } from "flowbite-react";
import { useToast } from "@/hooks/use-toast";

const octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_PRIVATE_GITHUB_TOKEN,
});

interface GitHubFile {
	type: string;
	name: string;
	path: string;
	download_url: string;
}

interface LabCodesTabProps {
	folderName: string;
}

export const LabCodeTab: React.FC<LabCodesTabProps> = ({ folderName }) => {
	const { semester } = useSubject();
	const { toast } = useToast();

	const year = getYearFromSemester(semester);
	const [rootFolder, setRootFolder] = useState(`${year}/${folderName}`);
	const [currentPath, setCurrentPath] = useState(rootFolder);
	const [pathHistory, setPathHistory] = useState<string[]>([rootFolder]);
	const [labCodes, setLabCodes] = useState<GitHubFile[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<{
		content: string;
		name: string;
	} | null>(null);

	const handlePathClick = (index: number) => {
		const newPath = pathHistory[index];
		setCurrentPath(newPath);
		setPathHistory((prev) => prev.slice(0, index + 1));
	};

	const handleFolderClick = (newPath: string) => {
		setCurrentPath(newPath);
		setPathHistory((prev) => [...prev, newPath]);
		setIsLoading(true);
	};

	const fetchFileContent = async (
		url: string | null,
		filename: string,
		path: string
	) => {
		try {
			// Always try to fetch using the path first
			const response = await octokit.repos.getContent({
				owner: "Pulkito4",
				repo: "hour-zero-codes",
				path: path,
			});

			// Handle response based on the type of data received
			if ("content" in response.data) {
				// Single file response
				const content = Buffer.from(
					response.data.content,
					"base64"
				).toString();
				setSelectedFile({ content, name: filename });
			} else {
				// If we didn't get content directly, try the download_url
				if (url) {
					const directResponse = await fetch(url);
					if (!directResponse.ok) {
						throw new Error(
							`HTTP error! status: ${directResponse.status}`
						);
					}
					const content = await directResponse.text();
					setSelectedFile({ content, name: filename });
				} else {
					throw new Error("No content or download URL available");
				}
			}
		} catch (error) {
			console.error("Error fetching file content:", error);
			toast({
				title: "Error",
				description: "Failed to load file content",
				variant: "destructive",
			});
		}
	};

	const fetchLabCodes = async () => {
		if (folderName === "") {
			setError("No such folder exists");
			setIsLoading(false);
			return;
		}

		try {
			const response = await octokit.repos.getContent({
				owner: "Pulkito4",
				repo: "hour-zero-codes",
				path: currentPath,
			});

			if (Array.isArray(response.data)) {
				setLabCodes(response.data as GitHubFile[]);
			}
		} catch (err) {
			console.error("Error fetching lab codes:", err);
			setError("Failed to load lab codes");
		} finally {
			setIsLoading(false);
		}
	};

	// const handleFolderClick = (newPath: string) => {
	//   setCurrentPath(newPath);
	//   setIsLoading(true);
	//   fetchLabCodes();
	// };

	useEffect(() => {
		fetchLabCodes();
	}, [currentPath]);

	return (
		<div>
			{/* Path breadcrumb */}

			<div className="p-4">
				<div className="flex items-center gap-2 mb-4 text-sm">
					{pathHistory.map((path, index) => (
						<div key={path} className="flex items-center">
							<button
								onClick={() => handlePathClick(index)}
								className={`hover:text-purple-500 transition-colors
                ${currentPath === path ? "text-purple-500" : "text-gray-400"}`}>
								{path.split("/").pop() || ""}
							</button>
							{index < pathHistory.length - 1 && (
								<span className="mx-2 text-gray-600">/</span>
							)}
						</div>
					))}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{isLoading ? (
						<Spinner className="text-primary-300" />
					) : (
						labCodes.map((file) => (
							<div
								key={file.path}
								onClick={() =>
									file.type === "dir"
										? handleFolderClick(file.path)
										: fetchFileContent(
												file.download_url,
												file.name,
												file.path
										  )
								}
								className="bg-gray-900 p-4 rounded-lg cursor-pointer hover:bg-gray-800 
                     transition-all duration-200 hover:shadow-lg">
								{/* <FileCode className="w-5 h-5 text-purple-500" /> */}
								<span className="ml-2 text-white capitalize">
									{file.name}
								</span>
							</div>
						))
					)}
				</div>

				{selectedFile && (
					<CodeViewerModal
						content={selectedFile.content}
						filename={selectedFile.name}
						onClose={() => setSelectedFile(null)}
					/>
				)}
			</div>
		</div>
	);
};
