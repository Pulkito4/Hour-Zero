"use client";

import React, { useState } from "react";
import {
	BookA,
	BookOpen,
	FileCode,
	FileQuestion,
	LibraryBig,
	MoveLeft,
	NotebookPen,
	TvMinimalPlay,
} from "lucide-react";
import Form from "@/components/forms/Form";
import UrlForm from "@/components/forms/Urlform";
import { SyllabusForm } from "@/components/forms/SyllabusForm";
import { useRouter } from "next/navigation";
import { useSubject } from "@/context/SubjectContext";

const tabs = [
	{
		title: "Syllabus",
		icon: <LibraryBig size={20} />,
	},
	{
		title: "Notes",
		icon: <NotebookPen size={20} />,
	},
	{
		title: "Assignments",
		icon: <BookA size={20} />,
	},
	{
		title: "Lab File",
		icon: <FileCode size={20} />,
	},
	{
		title: "PYQs",
		icon: <FileQuestion size={20} />,
	},
	{
		title: "Others",
		icon: <BookOpen size={20} />,
	},
	{
		title: "Videos",
		icon: <TvMinimalPlay size={20} />,
	},
];

const SubjectTab: React.FC = () => {
	const [activeTab, setActiveTab] = useState(0);
	const router = useRouter();
	const {subject} = useSubject();

	const renderTabContent = () => {
		switch (activeTab) {
			case 0:
				return <SyllabusForm onClose={() => {}} />;
			case 1:
				return <Form heading={"Add Notes"} />;
			case 2:
				return <Form heading={"Add Assignment"} />;
			case 3:
				return <Form heading={"Add Lab File"} />;
			case 4:
				return <Form heading={"Add PYQ"} />;
			case 5:
				return <Form heading={"Add Other Reference Material"} />;
			case 6:
				return <UrlForm heading={"Add Video"} />;
			default:
				return null;
		}
	};

	return (
		<>
			<div className=" bg-black p-2 w-18 ml-9  rounded-md flex items-center gap-4">
				<button
					onClick={() => router.push("/dashboard")}
					className="text-white rounded-lg font-bold text-2xl py-2 px-2 hover:bg-gray-600 hover:bg-opacity-45 flex items-center gap-1">
					<MoveLeft />
					<p className="text-sm">Dashboard</p>
				</button>
				<p className="text-primary-400">|</p>
				<p className="text-primary-light text-sm font-medium">{subject}</p>
			</div>
			<div className="w-full max-w-4xl mx-auto items-center justify-center p-2">
				{/* Tab Navigation */}
				<div className="flex flex-wrap lg:justify-evenly sm:justify-evenly border-b border-gray-700">
					{tabs.map((tab, index) => (
						<button
							key={index}
							onClick={() => setActiveTab(index)}
							className={`flex items-center justify-evenly gap-3 px-5 py-2 text-sm sm:text-base sm:gap-2 transition-all ${
								activeTab === index
									? "text-white border-b-2 border-purple-500"
									: "text-gray-400"
							}`}>
							{tab.icon}
							<span className="hidden sm:inline">
								{tab.title}
							</span>
						</button>
					))}
				</div>

				{/* Tab Content */}
				<div className="p-5 text-white bg-gray-900 rounded-lg shadow-lg mt-4">
					<div>{renderTabContent()}</div>
				</div>
			</div>
		</>
	);
};

export default SubjectTab;
