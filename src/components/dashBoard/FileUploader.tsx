import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { FileText } from "lucide-react";

type FileUploaderProps = {
	fieldChange: (file: File) => void;
	fileUrl: string | null;
};

const FileUploader = ({ fieldChange, fileUrl }: FileUploaderProps) => {
	const [file, setFile] = useState<File | null>(null);

	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[]) => {
			setFile(acceptedFiles[0]);
			fieldChange(acceptedFiles[0]);
		},
		[fieldChange]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"application/pdf": [".pdf"],
			"application/msword": [".doc"],
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				[".docx"],
			"text/plain": [".txt"],
			"application/vnd.ms-powerpoint": [".ppt"],
			"application/vnd.openxmlformats-officedocument.presentationml.presentation":
				[".pptx"],
		},
		maxSize: 20971520, // 20MB
		multiple: false,
	});

	return (
		<div
			{...getRootProps()}
			className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200
        ${
			isDragActive
				? "border-purple-500 bg-purple-500/10"
				: "border-gray-600 hover:border-purple-500/50"
		}`}>
			<input {...getInputProps()} className="cursor-pointer" />

			{fileUrl ? (
				<div className="flex flex-col items-center gap-2">
					<FileText className="w-12 h-12 text-purple-500" />
					<p className="text-sm text-gray-400">
						{file?.name || "File uploaded"}
					</p>
					<p className="text-xs text-gray-500">
						Click or drag to replace
					</p>
				</div>
			) : (
				<div className="flex flex-col items-center gap-4">
					<FileText className="w-12 h-12 text-gray-400" />
					<div className="text-center">
						<p className="text-gray-300 mb-2">
							Drag & Drop your File here <br /> (PDF, DOC, DOCX,
							TXT, PPT, PPTX)
						</p>
						<p className="text-sm text-gray-500 mb-4">
							or click to select
						</p>
					</div>
					<Button
						variant="outline"
						className="bg-transparent text-purple-500 border-2 border-purple-500 
             hover:bg-purple-500 hover:text-white
             transition-all duration-300 ease-in-out
             px-6 py-2 rounded-lg
             focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black">
						Select File
					</Button>
				</div>
			)}
		</div>
	);
};

export default FileUploader;
