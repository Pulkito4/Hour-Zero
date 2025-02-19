import { Team } from "@/components/aboutus/Team";
import Vision from "@/components/aboutus/Vision";
import { BASE_URL } from "@/lib/constants";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "About Us | Hour Zero",
	description:
		"Hour Zero - is a trusted platform for students for acessing study materials, notes, and all other academic resources. Our mission is to empower students with quality educational content.",
	keywords: [
		"students",
		"HourZero",
		"hourzero",
		"Hour Zero about",
		"engineering study platform",
		"academic resources",
		"student platform",
		"engineering education",
		"VIPS resources",
		"study materials",
		"educational platform",
		"engineering notes",
		"student community",
		"academic support",
		"academic help",
		"academic resources",
		"exam help",
		"study help",
		"IPU",
		"IPU notes",
		"IPU study materials",
		"IPU resources",
		"ipu notes",
		"GGSIPU",
		"Guru Gobind Singh Indraprastha University",
		"VIPS",
		"Vivekananda Institute of Professional Studies",
		"engineering",
		"btech",
		"notes",
		"assignments",
		"previous year questions",
		"syllabus",
		"study materials",
		"question papers",
		"previous year papers",
		"btech",
		"notes",
		"assignments",
		"previous year questions",
		"syllabus",
		"study materials",
		"question papers",
		"previous year papers",
		"engineering resources",
		"engineering study materials",
		"college notes",
		"university notes",
		"exam preparation",
		"study guides",
		"academic excellence",
		"student success",
		"learning resources",
		"ipu notes",
		"ggsipu notes",
		"vips notes",
		"engineering notes",
		"ipu study materials",
		"ggsipu study materials",
		"ipu best notes",
		"cse",
		"CSE",
		"CSE notes",
		"cse notes",
	],
	alternates: {
		canonical: `${BASE_URL}/about`,
	},
};

const AboutPage = () => {
	return (
		<div className="m-10">
			<h1 className="text-white text-4xl font-bold text-center">
				ABOUT <span className="text-primary-100">US</span>
			</h1>
			<hr className="mt-5 w-[70%] mx-auto border-gray-600" />
			<Vision />

			<Team />
		</div>
	);
};

export default AboutPage;
