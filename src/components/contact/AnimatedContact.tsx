"use client";

import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import React from "react";

const AnimatedContact = () => {
	return (
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
				Got a query or a suggestion? <br />
				Want removal of some content? <br />
				Get in touch NOW!
			</motion.p>
		</LampContainer>
	);
};

export default AnimatedContact;
