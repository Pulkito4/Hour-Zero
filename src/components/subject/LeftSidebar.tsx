"use client";
import { useEffect, useState } from "react";
import { useSubject } from "@/context/SubjectContext";
import { Spinner } from "@/components/ui/Spinner";
import { useSubjects } from "@/lib/react-query/queries";

interface LeftSidebarProps {
	onSelectSubject: (subjectId: string, folderName: string) => void;
	onSubjectsStatus: (hasSubjects: boolean) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
	onSelectSubject,
	onSubjectsStatus,
}) => {
	const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
	const { branch, semester } = useSubject();

	const [isOpen, setIsOpen] = useState(true);

	const { data: subjects, isLoading } = useSubjects(
		branch,
		semester.toString()
	);

	useEffect(() => {
		if (!isLoading) {
			onSubjectsStatus(Boolean(subjects?.length));
		}
	}, [subjects, isLoading, onSubjectsStatus]);

	return (
		<>
			<div className="relative">
				<nav
					className={`
        fixed lg:static
        w-[280px]
        min-h-screen 
        bg-dark-2 
        transition-all duration-300 ease-in-out
        z-50
         ${!isOpen ? "-translate-x-[calc(100%-8px)]" : "translate-x-0"}
      lg:translate-x-0
      `}>
					{/* Drawer handle/indicator */}
					<div
						className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 h-20 w-4
                     cursor-pointer bg-primary-100 rounded-l
                     hover:w-5 transition-all duration-200
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
							<div
								className="max-h-[calc(100vh-200px)] overflow-y-auto 
								scrollbar-thin 
								scrollbar-track-transparent
								scrollbar-thumb-purple-500/30
								hover:scrollbar-thumb-purple-400/50
								scrollbar-thumb-rounded
								scrollbar-track-rounded
								pr-2">
								{isLoading ? (
									<div className="text-white/70 text-center">
										{/* Loading subjects... */}
										<Spinner />
									</div>
								) : (
									<ul className="flex flex-col gap-3">
										{subjects?.map((subject) => (
											<li
												key={subject.id}
												className={`rounded-lg transition-all duration-300 ${
													selectedSubject ===
													subject.id
														? "bg-primary-300 shadow-lg shadow-purple-600/50"
														: "hover:bg-purple-800/40"
												}`}>
												<button
													className="w-full text-left px-4 py-3 text-sm lg:text-base text-white/90"
													onClick={() => {
														setSelectedSubject(
															subject.id
														);
														onSelectSubject(
															subject.id,
															subject.data
																.folderName
														);
														if (
															window.innerWidth <
															1024
														)
															setIsOpen(false);
													}}>
													{subject.id}
												</button>
											</li>
										))}
									</ul>
								)}
							</div>
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
		</>
	);
};

export default LeftSidebar;
