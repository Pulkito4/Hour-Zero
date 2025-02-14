"use client";
import React, { useState } from "react";
import FileUploader from "./FileUploader";
import { useToast } from "@/hooks/use-toast";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { AddToSubject } from "@/firebase/firestore";
import { useSubject } from "@/context/SubjectContext";

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
	const {subject, semester, branch} = useSubject();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [fileUrl, setFileUrl] = useState<string | null>(null);

	const [message, setMessage] = useState("");

	const handleFileChange = (newFile: File) => {
		setFile(newFile);
		setFileUrl(URL.createObjectURL(newFile));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const subcollection = headingToSubcollection[heading];

		if (!title || !file) {
			toast({
				variant: "destructive",
				title: "Error",
				description:
					"Please fill all required fields and attach a PDF file.",
			});
			return;
		}

		try {
			// First upload file to Cloudinary
			const fileUrl = await uploadToCloudinary(file);

			// Then add document data to Firestore
			await AddToSubject(
				branch, // Replace with actual branch
				semester.toString(), // Replace with actual semester
				subject, // Replace with actual subject
				subcollection, // subcollection
				{
					name: title,
					description: description,
					url: fileUrl
				}
			);

			toast({
				title: "Success",
				description: "Document uploaded successfully!",
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
			});
		}

		// Handle form submission
		toast({
			title: "Success",
			description: "Form submitted successfully!",
		});

		// Reset form
		setTitle("");
		setDescription("");
		setFile(null);
		setFileUrl(null);
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
				className="w-full py-2 px-4 bg-purple-600 rounded hover:bg-purple-700 transition">
				Submit
			</button>

			{/* Message */}
			{message && <p className="mt-4 text-center">{message}</p>}
		</form>
	);
};

export default Form;
