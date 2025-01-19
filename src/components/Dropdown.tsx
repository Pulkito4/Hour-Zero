"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

export function Dropdown() {
	const router = useRouter();

	const handleClick = () => {
		router.push("/subject");
	};
	return (
		<Card
			className="w-full max-w-2xl mx-auto bg-black text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] 
      transition-shadow duration-300 
      hover:shadow-[0_0_40px_rgba(139,92,246,1)]">
			<CardHeader className="text-center md:text-xl">
				<CardTitle>Select your Branch & Semester</CardTitle>
				{/* <CardDescription>Get Started in one-click.</CardDescription> */}
			</CardHeader>
			<CardContent>
				<form>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="framework" className=" md:text-lg">
								Select Branch
							</Label>
							<Select>
								<SelectTrigger id="framework">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent
									position="popper"
									className="bg-black text-white ">
									<SelectItem value="cse">CSE</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="framework" className=" md:text-lg">
								Select Semester
							</Label>
							<Select>
								<SelectTrigger id="framework">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent
									position="popper"
									className="bg-black text-white">
									{semesters.map((semester) => (
										<SelectItem
											key={semester}
											value={semester}
											defaultValue={semester}>
											Semester {semester}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex justify-center">
				<Button
					className="bg-primary-300 hover:bg-primary-dark"
					onClick={handleClick}>
					Get Started!
				</Button>
			</CardFooter>
		</Card>
	);
}
