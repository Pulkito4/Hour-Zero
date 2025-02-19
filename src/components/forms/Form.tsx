"use client";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { AddToSubject } from "@/firebase/firestore";
import { useSubject } from "@/context/SubjectContext";
import FileUploader from "../dashBoard/FileUploader";
import { Spinner } from "../ui/Spinner";

interface SimpleFormProps {
	heading: string; // Dynamic heading
}

// Add mapping for headings to subcollections
const headingToSubcollection: { [key: string]: string } = {
	"Add Notes": "notes",
	"Add Assignment": "assignments",
	"Add Lab File": "lab",
	"Add PYQ": "pyqs",
	"Add Other Reference Material": "other",
	"Add Video": "videos",
};

const Form: React.FC<SimpleFormProps> = ({ heading }) => {
	const { toast } = useToast();
	const { subject, semester, branch } = useSubject();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [fileUrl, setFileUrl] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleFileChange = (newFile: File) => {
		setFile(newFile);
		setFileUrl(URL.createObjectURL(newFile));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		const subcollection = headingToSubcollection[heading];

		if (!title || !file) {
			toast({
				variant: "destructive",
				title: "Error",
				description:
					"Please fill all required fields and attach a PDF file.",
				duration: 10000,
			});
			setIsSubmitting(false);
			return;
		}

		try {
			// First upload file to Cloudinary
			const fileUrl = await uploadToCloudinary(file);

			// Then add document data to Firestore
			await AddToSubject(
				branch,
				semester.toString(),
				subject,
				subcollection,
				{
					name: title,
					description: description,
					url: fileUrl,
				}
			);

			toast({
				title: "Success",
				description: "Document uploaded successfully!",
				duration: 10000,
			});

			// Reset form
			setTitle("");
			setDescription("");
			setFile(null);
			setFileUrl(null);
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to upload document. Please try again.",
				duration: 10000,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg"
			onSubmit={handleSubmit}>
			{/* Dynamic Heading */}
			<h2 className="text-xl font-bold mb-4">{heading}</h2>

			{/* Title Input */}
			<div className="mb-4">
				<label
					htmlFor="title"
					className="block text-sm font-medium mb-2">
					Title
				</label>
				<input
					type="text"
					id="title"
					className="w-full p-2 border border-gray-600 rounded bg-gray-900"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>

			{/* Description Input */}
			<div className="mb-4">
				<label
					htmlFor="description"
					className="block text-sm font-medium mb-2">
					Description
				</label>
				<textarea
					id="description"
					className="w-full p-2 border border-gray-600 rounded bg-gray-900"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					rows={4}></textarea>
			</div>

			{/* File Uploader */}
			<div className="mb-4">
				<label className="block text-sm font-medium mb-2">
					Attach PDF
				</label>
				<FileUploader
					fieldChange={handleFileChange}
					fileUrl={fileUrl}
				/>
			</div>

			{/* Submit Button */}
			<button
				type="submit"
				disabled={isSubmitting}
				className={`w-full py-2 px-4 rounded transition-all duration-200 flex items-center justify-center gap-2 ${
					isSubmitting
						? "bg-black cursor-not-allowed"
						: "bg-purple-600 hover:bg-purple-700"
				}`}>
				{isSubmitting ? (
					<div className="flex items-center justify-center gap-2">
						<Spinner />
					</div>
				) : (
					"Submit"
				)}
			</button>
		</form>
	);
};

export default Form;
