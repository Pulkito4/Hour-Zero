"use client";
import Image from "next/image";
import Link from "next/link";
import AdminButton from "./AdminButton";

export function CustomFooter() {
	return (
		<footer className=" bg-gray-950 text-white py-8 px-4 font-work-sans">
			<div className="container mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-center">
					{/* Logo Section */}
					<Link href="/" className="flex items-center mb-3 md:mb-0 ">
						<Image
							src="/logo.png"
							alt="Hour Zero Logo - Academic Resource Platform"
							width={100}
							height={100}
							priority
							className="hover:opacity-90"
						/>
						<div className="flex flex-col ">
							<span className="ml-3 text-lg font-semibold ">
								Hour{" "}
								<span className="text-primary-100">Zero</span>
							</span>

							<div className="text-gray-400 text-sm mt-2 text-center">
								<p>Because Every Mark Counts</p>
							</div>
						</div>
					</Link>

					{/* Links Section */}
					<div className="flex gap-10 justify-around mr-6">
						<Link href="/about" className="hover:text-purple-300">
							About
						</Link>
						<Link href="/privacy" className="hover:text-purple-300">
							Privacy Policy
						</Link>
						<Link
							href="/contact-us"
							className="hover:text-purple-300">
							Contact
						</Link>

						<AdminButton />
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-800 my-6" />

				{/* Copyright */}
				<div className="text-center text-sm text-gray-500">
					<p>
						Disclaimer: We do not claim ownership of any materials
						on this website. They are shared in good faith to assist
						students. If you own any content and wish to have it
						removed, please contact us.
					</p>
				</div>
			</div>
		</footer>
	);
}
