import { CarousalSlider } from "@/components/homepage/ContributorsCarousel";

import { Whyus } from "@/components/homepage/Whyus";
import { Offer } from "@/components/homepage/whatWeOffer";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Contribution } from "@/components/homepage/Contribution";
import { Dropdown } from "@/components/homepage/Dropdown";
import { BASE_URL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Hour Zero - Because Every Mark Counts",
	description:
		"Access engineering study materials, notes, assignments, and previous year questions. Your one-stop platform for academic resources and study materials.",
	keywords: [
		"Hour Zero",
		"hourzero",
		"study materials",
		"academic resources",
		"solutions",
		"engineering study materials",
		"VIPS resources",
		"academic notes",
		"engineering assignments",
		"previous year questions",
		"IPU study materials",
		"GGSIPU resources",
		"engineering education",
		"BTech materials",
		"student resources",
		"academic support",
		"academic help",
		"engineering notes",
		"engineering study materials",
		"VIPS CSE notes",
		"VIPS engineering",
		"IPU engineering",
		"IPU CSE",
		"previous year questions",
		"lab manuals",
		"practical files",
		"semester notes",
		"engineering assignments",
		"college notes",
		"computer science notes",
		"CSE study materials",
		"engineering resources",
		"VIPS Delhi",
		"IPU Delhi",
		"engineering lectures",
		"engineering videos",
		"computer science resources",
		"programming notes",
		"coding resources",
		"semester wise notes",
		"branch wise notes",
		"engineering syllabus",
		"GGSIPU syllabus",
		"BTech study guide",
		"engineering practice questions",
		"engineering exam preparation",
	],
	alternates: {
		canonical: BASE_URL,
	},
	openGraph: {
		title: "Hour Zero - Because Every Mark Counts",
		description:
			"HourZero is your one-stop platform to get study resources of GGSIPU! 🚀 Access organized notes, past papers, assignments, and lab files without the hassle.",
		url: BASE_URL,
		siteName: "Hour Zero",
		type: "website",
	},
};

export default function Home() {
	return (
		<>
			<div className="w-full h-full font-work-sans text-white">
				{/* tagline */}
				<div className="mt-15  font-work-sans text-center font-semibold">
					<span className="text-4xl  text-white">
						HOUR <span className="text-primary-100">ZERO</span>
					</span>
					<p className="text-gray-400  text-xl !font-normal">
						Because Every Mark Counts
					</p>
				</div>

				<div className="relative h-[500px] flex items-center justify-center overflow-hidden">
					{/* WavyBackground Container */}
					<div className="absolute inset-0 w-full h-[500px]">
						<WavyBackground />
					</div>

					{/* Dropdown Container */}
					<div className="relative z-10 w-full max-w-xl mx-auto px-4 ">
						<Dropdown />
					</div>
				</div>

				<div className="px-8 mt-15  mb-15  ">
					<h1 className="text-white ml-4 mb-5 text-3xl font-bold text-center">
						WHAT WE <span className="text-primary-100">OFFER</span>
					</h1>
					<Offer />
				</div>

				{/* <div className="px-8 mt-15  mb-15 ">
					<h1 className="text-white ml-4 mb-9 text-3xl font-bold text-center">
						MEET OUR TOP <span className="text-primary-100">CONTRIBUTORS</span>
					</h1>
					<CarousalSlider />
				</div> */}

				<div className="px-8 mt-15  mb-15 ">
					<h1 className="text-white ml-4 mb-9 text-3xl font-bold text-center">
						WANT TO{" "}
						<span className="text-primary-100">CONTRIBUTE ?</span>
					</h1>
					<Contribution />
				</div>

				<div className="px-8 mt-15  mb-15 flex flex-col items-center">
					<h1 className="text-white ml-4 mb-5 text-3xl font-bold text-center">
						<span className="text-primary-100">WHY</span> HOUR ZERO
						?
					</h1>
					<Whyus />
				</div>
			</div>
		</>
	);
}
