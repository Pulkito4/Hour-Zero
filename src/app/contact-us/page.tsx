import { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
	title: "Contact Us | Hour Zero",
	description:
		"Get in touch with Hour Zero team. Submit your queries, suggestions, or content removal requests. We are here to help!",
	keywords: [
		"contact Hour Zero",
		"academic resources support",
		"student help",
		"content removal request",
		"Hour Zero contact form",
		"academic platform support",
		"support",
		"queries",
		"suggestions",
		"talk to us",
		"contact form",
		"contribute",
		"contribution",
		"content removal",
		"report content",
		"report abuse",
		"report",
		"add content",
		"add study material",
		"add notes",
		"add assignments",
		"add question papers",
		"add previous year papers",
		"add lab files",
		"add lab manuals",
		"add practical files",
	],
	alternates: {
		canonical: `${BASE_URL}/contact-us`,
	},
};

export default function Page(){
	return <ContactPage/>
}