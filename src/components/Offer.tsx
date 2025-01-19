"use client";
import { HoverEffect } from "./ui/card-hover-effect";
import {
	BookA,
	BookOpen,
	FileCode,
	FileQuestion,
	NotebookPen,
	TvMinimalPlay,
} from "lucide-react";

export function Offer() {
	return (
		<div className="max-w-5xl mx-auto px-8 sm:text-[20px] text-[16px] md:text-[18px]">
			<HoverEffect items={projects} />
		</div>
	);
}

export const projects = [
	{ title: "Notes", description: "The only notes you need to refer!", icon: <NotebookPen size={40} /> },
	{ title: "Assignments", description: "Stuck on assignments? Find all the solutions you need here!", icon: <BookA size={40} /> },
	{ title: "Lab Files", description: "Last-minute file submissions? Can't figure out that one code? We've got you covered!", icon: <FileCode size={40} /> },
	{ title: "PYQs", description: "Past year questions at your fingertips!", icon: <FileQuestion size={40} /> },
	{ title: "TextBooks", description: "Nobody really reads these but well we have them if you need :)", icon: <BookOpen size={40} /> },
	{ title: "Videos", description: "The best YouTube tutorials, all in one place!", icon: <TvMinimalPlay size={40} /> },
];
