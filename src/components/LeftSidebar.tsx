"use client";
import { useState } from "react";

const subjects = [
	{ id: 1, name: "Computer Networks" },
	{ id: 2, name: "Operating Systems" },
	{ id: 3, name: "Database Management" },
	{ id: 4, name: "Theory of Computation" },
	{ id: 5, name: "Software Engineering" },
];

const LeftSidebar = () => {
	const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="relative">
			<nav
				className={`
        fixed lg:static
        w-[280px]
        min-h-screen 
        bg-dark-2 
        transition-all duration-300 ease-in-out
        z-50
         ${!isOpen ? '-translate-x-[calc(100%-8px)]' : 'translate-x-0'}
      lg:translate-x-0
      `}>
				{/* Drawer handle/indicator */}
				<div
					className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 h-20 w-2
                     cursor-pointer bg-purple-600 rounded-l
                     hover:w-3 transition-all duration-200
                     flex items-center justify-center"
					onClick={() => setIsOpen(!isOpen)}>
					<div className="w-0.5 h-8 bg-white/50 rounded-full" />
				</div>

				{/* Content */}
				<div className="p-4 lg:p-6">
					<div className="flex flex-col gap-6">
						<div className="text-white text-center font-bold text-sm lg:text-base">
							SELECT A SUBJECT
						</div>
						<hr className="opacity-20" />
						<ul className="flex flex-col gap-3">
							{subjects.map((subject) => (
								<li
									key={subject.id}
									className={`rounded-lg transition-all duration-300 ${
										selectedSubject === subject.id
											? "bg-purple-600 shadow-lg shadow-purple-600/50"
											: "hover:bg-purple-800/40"
									}`}>
									<button
										className="w-full text-left px-4 py-3 text-sm lg:text-base text-white/90"
										onClick={() => {
											setSelectedSubject(subject.id);
											if (window.innerWidth < 1024)
												setIsOpen(false);
										}}>
										{subject.name}
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</nav>

			{/* Mobile overlay */}
			{isOpen && (
				<div
					className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
					onClick={() => setIsOpen(false)}
				/>
			)}
		</div>
	);
};

export default LeftSidebar;
