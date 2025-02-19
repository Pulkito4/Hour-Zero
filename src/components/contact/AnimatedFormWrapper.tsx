"use client";

import { motion } from "framer-motion";
import React from "react";

const AnimatedFormWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				delay: 1.6,
				duration: 0.8,
				ease: "easeInOut",
			}}
			className="max-w-md mx-auto p-4">
			{children}
		</motion.div>
	);
};

export default AnimatedFormWrapper;
