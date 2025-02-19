import React from "react";

import Link from "next/link";
interface CardProps {
	name: string;
}

const Cards: React.FC<CardProps> = ({ name }) => {
	return (
		<Link
			href="#"
			className=" w-30 h-30 block max-w-sm bg-white border rounded-lg text-center ">
			<div className="p-3 font-work-sans bg-purple-100 ">
				<h5 className="mb-2 text-xl font-semibold text-black md:text-sm lg:text-lg">
					{name}
				</h5>
			</div>
		</Link>
	);
};

export default Cards;
