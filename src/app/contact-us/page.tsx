"use client";

import { LampContainer } from "@/components/ui/lamp";
import React from "react";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const page = () => {
	return (
		<>
			<div className="min-h-screen bg-slate-950">
				<LampContainer>
					<motion.h1
						initial={{ opacity: 0.5, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							delay: 0.3,
							duration: 0.8,
							ease: "easeInOut",
						}}
						className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-5xl font-medium tracking-tight text-transparent md:text-7xl">
						Contact Us
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							delay: 0.8,
							duration: 0.8,
							ease: "easeInOut",
						}}
						className="text-center text-lg text-slate-300 mt-4 md:text-2xl">
						Got a query or a suggestion? <br /> Want removal of some content? <br />
						Get in touch NOW!
					</motion.p>
				</LampContainer>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						delay: 1.6, // Adjust delay to start after LampContainer content transition
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="max-w-md mx-auto  p-4">
					<ContactForm />
					{/* <form className="space-y-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-200">
								Name
							</label>
							<input
								type="text"
								id="name"
								className="mt-1 block w-full rounded-md bg-gray-800 border-transparent focus:border-primary-100 focus:bg-gray-900 focus:ring-0 text-white"
								placeholder="Your name"
							/>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-200">
								Email
							</label>
							<input
								type="email"
								id="email"
								className="mt-1 block w-full rounded-md bg-gray-800 border-transparent focus:border-purple-500 focus:bg-gray-900 focus:ring-0 text-white"
								placeholder="you@example.com"
							/>
						</div>

						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-200">
								Message
							</label>
							<textarea
								id="message"
								rows={4}
								className="mt-1 block w-full rounded-md bg-gray-800 border-transparent focus:border-purple-500 focus:bg-gray-900 focus:ring-0 text-white"
								placeholder="Your message"
							/>
						</div>

						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-300 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
							Send Message
						</button>
					</form> */}
				</motion.div>
			</div>
		</>
	);
};

export default page;
