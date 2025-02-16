import { BASE_URL } from "@/lib/constants";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
	title: "Privacy Policy | Hour Zero",
	description:
		"Learn how Hour Zero collects, uses, and protects your information. Read our comprehensive privacy policy to understand your rights and our data practices.",
	keywords: [
		"privacy policy",
		"data protection",
		"user privacy",
		"Hour Zero privacy",
		"student data protection",
		"privacy practices",
		"IPU",
		"GGSIPU",
		"Guru Gobind Singh Indraprastha University",
		"study materials",
		"notes",
		"assignments",
		"question papers",
		"previous year papers",
		"VIPS",
		"vips",
		"engineering",
		"btech",
	],
	alternates: {
		canonical: `${BASE_URL}/privacy`,
	},
};

const PrivacyPolicy = () => {
	return (
		<main className="mx-4 sm:mx-6 md:mx-15 lg:mx-20 mt-5 sm:mt-8 md:mt-10 text-white">
			<header className="mt-15 mb-9 font-work-sans text-center font-semibold">
				<span className="text-4xl  text-white">
					PRIVACY <span className="text-primary-100">POLICY</span>
				</span>
			</header>

			<section className="text-center mb-3 font-semibold text-gray-200">
				<h1>Your privacy is important to us. </h1>
				<h1>
					This Privacy Policy explains how we collect, use, and
					protect your information when you use our website.
				</h1>
				<h1>
					By using Hour Zero, you agree to the collection and use of
					information in accordance with this policy.
				</h1>
			</section>

			<article className=" p-5 ml-15 mr-15 font-work-sans">
				<hr className="mb-15 border-gray-600" />
				<section className="ppcontent">
					<h2 className="ppheading">1. INFORMATION WE COLLECT</h2>
					<p className="ml-5 m-1 p-2 ">
						We collect different types of information to improve our
						services and provide a seamless experience for our
						users.
					</p>
					<ol className="list-[lower-alpha] ml-10 space-y-2 ">
						<li>
							Personal Information (If Provided by You)
							<ul className="list-disc ml-8 mt-2 ">
								<li>
									Name, email address, and other contact
									details (only if you voluntarily provide
									them for authentication or communication).
								</li>
							</ul>
						</li>
						<li>
							Usage Data
							<ul className="list-disc ml-8 mt-2 ">
								<li>
									IP address, browser type, device details,
									and how you interact with our website
								</li>
								<li>
									Cookies and tracking technologies to enhance
									your browsing experience.
								</li>
							</ul>
						</li>
						<li>
							Uploaded Content
							<ul className="list-disc ml-8 mt-2 ">
								<li>
									Any files uploaded to Hour Zero (e.g.,
									notes, assignments, books, previous year
									question papers).
								</li>
								<li>
									Metadata associated with uploads, such as
									timestamps and file names.
								</li>
							</ul>
						</li>
					</ol>
				</section>

				<section className="ppcontent">
					<h2 className="ppheading">
						2. HOW WE USE YOUR INFORMATION
					</h2>
					<p className="ml-5 m-1 p-2 text-gray-200">
						We use the collected data to:
					</p>
					<ul className="list-disc ml-8 mt-1 ">
						<li>Provide access to study materials.</li>
						<li>Improve and personalize user experience.</li>
						<li>
							Maintain website security and prevent unauthorized
							access.
						</li>
						<li>
							Analyze traffic and usage trends for optimization.
						</li>
						<li>
							Send updates, announcements, or respond to inquiries
							(if you’ve provided contact information).
						</li>
					</ul>
				</section>

				<section className="ppcontent">
					<h2 className="ppheading">
						3. HOW WE SHARE YOUR INFORMATION
					</h2>
					<p className="ml-5 m-1 p-2 text-gray-200">
						Your information is never sold or rented. However, we
						may share limited data in the following cases:
					</p>
					<ul className="list-disc ml-8 mt-1 ">
						<li>
							Service Providers: Third-party services we use (such
							as Cloudinary for file storage and Firebase for
							authentication) may have access to your uploaded
							files and authentication details.
						</li>
						<li>
							Legal Compliance: If required by law, or if
							necessary to prevent fraud, security issues, or
							violations of our terms.
						</li>
					</ul>
					<p className="ml-5 m-1 p-2 text-gray-200">
						We take necessary precautions to ensure that third-party
						services comply with data protection laws.
					</p>
				</section>

				<section className="ppcontent">
					<h2 className="ppheading">
						4. HOW WE STORE AND PROTECT YOUR DATA{" "}
					</h2>
					<p className="ml-5 m-1 p-2 text-gray-200">
						Your data is stored securely and managed with
						industry-standard protection, including:
					</p>
					<ul className="list-disc ml-8 mt-1 ">
						<li>
							Service Providers: Third-party services we use (such
							as Cloudinary for file storage and Firebase for
							authentication) may have access to your uploaded
							files and authentication details.
						</li>
						<li>
							Legal Compliance: If required by law, or if
							necessary to prevent fraud, security issues, or
							violations of our terms.
						</li>
					</ul>
					<p className="ml-5 m-1 p-2 text-gray-200">
						While we take extensive security measures, no system is
						completely invulnerable. We advise users to avoid
						sharing highly sensitive information on the platform.
					</p>
				</section>

				<section className="ppcontent">
					<h2 className="ppheading">5. YOUR RIGHTS & CHOICES </h2>
					<p className="ml-5 m-1 p-2 text-gray-200">
						You have control over your data:
					</p>
					<ul className="list-disc ml-8 mt-1 ">
						<li>
							Access & Update – You can review and update your
							profile details (if applicable).
						</li>
						<li>
							Delete Uploaded Content – You can remove files
							you’ve uploaded to Hour Zero.
						</li>
					</ul>
				</section>

				<section className="ppcontent">
					<h2 className="ppheading">
						6. THIRD-PARTY LINKS & CONTENT
					</h2>
					<p className="ml-5 m-1 p-2 text-gray-200">
						We may update this policy periodically to reflect
						changes in our services, legal requirements, or security
						measures. Any updates will be posted on this page with
						the "Last Updated" date. We encourage users to review
						this policy regularly.
					</p>
				</section>

				<section className="ppcontent">
					<h2 className="ppheading">
						7. CHANGES TO THIS PRIVACY POLICY
					</h2>
					<p className="ml-5 m-1 p-2 text-gray-200">
						Hour Zero may contain links to external websites or
						third-party resources. We are not responsible for their
						privacy practices and recommend reviewing their privacy
						policies before interacting with their services.
					</p>
				</section>

				<hr className="ppcontent !mt-15 border-gray-600" />
				<div className="m-3 mb-5 text-center">
					<h2 className="ppheading">CONTACT US</h2>
					<p className="ml-5 m-1 p-2 text-gray-200">
						If you have any questions, concerns, or requests
						regarding this Privacy Policy, feel free to
						<Link
							href={`contact-us`}
							className="text-primary-light hover:text-purple-300 transition-colors">
							{" "}
							reach out to us
						</Link>
					</p>
				</div>
			</article>
		</main>
	);
};

export default PrivacyPolicy;
