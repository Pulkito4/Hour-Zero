import { FC, useEffect } from "react";
import { Copy, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-bash";

interface CodeViewerModalProps {
	content: string;
	filename: string;
	onClose: () => void;
}

export const CodeViewerModal: FC<CodeViewerModalProps> = ({
	content,
	filename,
	onClose,
}) => {
	const { toast } = useToast();

	// Determine language from filename extension
	const getLanguage = (filename: string) => {
		const ext = filename.split(".").pop()?.toLowerCase();
		switch (ext) {
			case "ts":
				return "typescript";
			case "js":
				return "javascript";
			case "jsx":
				return "jsx";
			case "tsx":
				return "tsx";
			case "css":
				return "css";
			case "py":
				return "python";
			case "java":
				return "java";
			case "c":
				return "c";
			case "cpp":
				return "cpp";
			case "json":
				return "json";
			case "md":
				return "markdown";
			case "sql":
				return "sql";
			case "dart":
				return "dart";
			case "yaml":
				return "yaml";
			case "html":
			case "xml":
			case "svg":
				return "markup";
			case "sh":
				return "bash";
			default:
				return "javascript";
		}
	};

	useEffect(() => {
		Prism.highlightAll();
	}, [content]);

	const handleCodeCopy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			toast({
				title: "Copied!",
				description: "Code copied to clipboard",
				duration: 2000,
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to copy code",
				variant: "destructive",
			});
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center sm:w-auto justify-center bg-black bg-opacity-75 sm:text-sm">
			<div className="bg-gray-950 rounded-lg w-[95%] h-[90vh] sm:w-11/12 md:w-4/5 lg:w-3/5 relative">
				<div className="flex justify-between items-center p-4 border-b border-gray-800">
					<h3 className="text-lg font-semibold text-white">
						{filename}
					</h3>
					<div className="flex gap-2">
						<button
							onClick={handleCodeCopy}
							className="p-2 hover:bg-gray-800 rounded-lg">
							<Copy className="w-5 h-5 text-purple-500" />
						</button>
						<button
							onClick={onClose}
							className="p-2 hover:bg-gray-800 rounded-lg">
							<X className="w-5 h-5 text-red-500" />
						</button>
					</div>
				</div>
				<div className="p-4 h-[calc(90vh-80px)] overflow-auto">
					<pre className="bg-gray-900 p-4 rounded-lg">
						<code className={`language-${getLanguage(filename)}`}>
							{content}
						</code>
					</pre>
				</div>
			</div>
		</div>
	);
};
