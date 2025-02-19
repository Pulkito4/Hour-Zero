import { FolderX } from "lucide-react";
import Link from "next/link";

const nodatalist = [
	" There are no subjects available for the selected branch and semester.",
	"Uh Oh! You ended up on the wrong side of the website.",
	"Simon says, 'No data found!",
	"Looks like the study material is on a vacation.",
	"No notes, no assignments… just an empty void of procrastination!",
	"It seems your study resources went for a coffee break… and forgot to return!",
	"Looks like your study materials are still downloading... from the universe!",
	"The data is not available at the moment.",
	"Your assignments saw you coming and ran the other way!",
	"Notes and assignments? Never heard of them. Try again later!",
];

export const NoData = () => {
	return (
		<div className="flex p-3  flex-col font-work-sans items-center justify-center min-h-[300px] space-y-4">
			<FolderX className="w-16 h-16 text-red " />
			<h2 className="text-2xl font-bold text-white">No Data Found</h2>
			<p className="text-gray-400 text-center max-w-md">
				{nodatalist[Math.floor(Math.random() * nodatalist.length)]}
			</p>
			<h2 className="text-white text-xl p-2 font-semibold">
				GO BACK TO{" "}
				<span className="text-primary-light hover:text-primary-200">
					<Link href="/">HOME</Link>
				</span>
			</h2>
		</div>
	);
};
