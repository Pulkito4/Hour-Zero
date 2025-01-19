import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
	items,
	className,
}: {
	items: {
		title: string;
		description: string;
		icon: React.ReactNode;
	}[];
	className?: string;
}) => {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
				className
			)}>
			{items.map((item, idx) => (
				<div
					key={idx}
					className="relative group block p-2 h-full w-full"
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}>
					<AnimatePresence>
						{hoveredIndex === idx && (
							<motion.span
								className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
								layoutId="hoverBackground"
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: { duration: 0.15 },
								}}
								exit={{
									opacity: 0,
									transition: { duration: 0.15, delay: 0.2 },
								}}
							/>
						)}
					</AnimatePresence>
					<Card className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-purple-200 bg-black p-4">
						<div className="relative z-10">
							<div className="p-4 flex flex-col items-center justify-center">
								<div className="flex items-center justify-center gap-4">
									<div className=" text-purple-700">
										{item.icon}
									</div>
									<h4 className="text-2xl font-bold tracking-tight text-white">
										{item.title}
									</h4>
								</div>
								<p className="mt-4 text-sm text-gray-400 text-center">
									{item.description}
								</p>
							</div>
						</div>
					</Card>
				</div>
			))}
		</div>
	);
};

export const Card = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"rounded-2xl h-48 w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
				className
			)}>
			<div className="relative z-50">
				<div className="p-4">{children}</div>
			</div>
		</div>
	);
};
export const CardTitle = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<h4
			className={cn(
				"text-zinc-100 font-bold text-center tracking-wide mt-4",
				className
			)}>
			{children}
		</h4>
	);
};
export const CardDescription = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<p
			className={cn(
				"mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
				className
			)}>
			{children}
		</p>
	);
};
