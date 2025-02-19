import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CustomFooter } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { SubjectProvider } from "@/context/SubjectContext";
import Script from "next/script";
import { BASE_URL } from "@/lib/constants";
import { QueryProvider } from "@/lib/react-query/QueryProvider";

const workSans = localFont({
	src: [
		{
			path: "./fonts/WorkSans-Black.ttf",
			weight: "900",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-ExtraBold.ttf",
			weight: "800",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-ExtraLight.ttf",
			weight: "200",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-Light.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-Medium.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-Regular.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-SemiBold.ttf",
			weight: "900",
			style: "normal",
		},
		{
			path: "./fonts/WorkSans-Thin.ttf",
			weight: "200",
			style: "normal",
		},
	],
	variable: "--font-work-sans",
});

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: {
		default: "Hour Zero - Because Every Mark Counts",
		template: "%s | Hour Zero",
	},
	description:
		"HourZero – your go-to study hub for GGSIPU! 🚀 Get well-organized notes, PYQs, assignments, and lab files, all tailored specifically to your syllabus. No more endless searching or last-minute chaos—just everything you need, right when you need it. 📚🔥",
	keywords: [
		"engineering",
		"study materials",
		"PYQs",
		"lab files",
		"assignments",
		"VIPS",
		"CSE",
		"IPU",
		"academic resources",
		"Hour Zero",
		"hourzero",
		"Btech",
		"btech",
		"Btech notes",
		"btech notes",
		"btech resources",
		"btech study materials",
		"ipu study materials",
		"ipu resources",
		"ipu notes",
		"ggsipu",
		"GGSIPU",
		"CSE notes",
		"cse notes",
		"VIPS-TC",
		"cse resources",
		"CSE study material",
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
		"engineering exam preparation"

	],
	authors: [{ name: "Hour Zero Team" }],
	creator: "Hour Zero",
	publisher: "Hour Zero",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: BASE_URL,
		title: "Hour Zero - Because Every Mark Counts",
		description:
			"HourZero – your go-to study hub for GGSIPU! 🚀 Get well-organized notes, PYQs, assignments, and lab files, all tailored specifically to your syllabus. No more endless searching or last-minute chaos—just everything you need, right when you need it. 📚🔥",
		siteName: "Hour Zero",
		images: [
			{
				url: "/logo.png", // Add your Open Graph image
				width: 1200,
				height: 630,
				alt: "Hour Zero Preview",
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		card: "summary_large_image",
		title: "Hour Zero",
		description:
			"Your one-stop hub for BTech notes, assignments, and lab resources.",
		images: ["../../public/logo.png"],
	},
	icons: {
		icon: "@/app/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta
					name="google-site-verification"
					content="VA0qOyHRbQxr87rx_hSVEOn7uNGvYkvkH3hoKtf4RuA"
				/>
				<Script
					src="https://www.google.com/recaptcha/api.js"
					strategy="beforeInteractive"
				/>
			</head>
			<body className={`${workSans.variable} bg-black`}>
				<QueryProvider>
				<SubjectProvider>
					<Navbar />
					{children}
					<Toaster />

					<CustomFooter />
				</SubjectProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
