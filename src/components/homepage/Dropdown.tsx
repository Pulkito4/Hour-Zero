"use client";
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
import { getBranches } from "@/firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSubject } from "@/context/SubjectContext";
import { useToast } from "@/hooks/use-toast";
import { semesters } from "@/lib/constants";
import { useBranches } from "@/lib/react-query/queries";
import { Loader2 } from "lucide-react";

export function Dropdown() {
	const router = useRouter();
	// const [branches, setBranches] = useState<string[]>([]);
	const { setBranch, setSemester } = useSubject();
	const [isRedirecting, setIsRedirecting] = useState(false);
	const { toast } = useToast();
	const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
	const [selectedSemester, setSelectedSemester] = useState<string | null>(
		null
	);
	// const [isLoading, setIsLoading] = useState(true);
	const { data: branches, isLoading } = useBranches();

	// useEffect(() => {
	// 	const fetchBranches = async () => {
	// 		try {
	// 			const branchList = await getBranches();
	// 			setBranches(branchList);
	// 		} catch (error) {
	// 			console.error("Failed to fetch branches:", error);
	// 		} finally {
	// 			setIsLoading(false);
	// 		}
	// 	};

	// 	fetchBranches();
	// }, []);

	const handleSelectBranch = (value: string) => {
		setSelectedBranch(value);
		setBranch(value);
	};

	const handleSelectSemester = (value: string) => {
		setSelectedSemester(value);
		setSemester(Number(value));
	};

	const handleClick = () => {
		if (!selectedBranch || !selectedSemester) {
			toast({
				variant: "destructive",
				title: "Invalid Input",
				description:
					"Please select both Branch and Semester to continue",
			});
			return;
		}
		setIsRedirecting(true);
		router.push("/subject");
	};

	return (
		<Card
			className="w-full max-w-2xl mx-auto bg-black text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] 
      		transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,1)]">
			<CardHeader className="text-center md:text-xl">
				<CardTitle>Select your Branch & Semester</CardTitle>
			</CardHeader>
			<CardContent>
				<form>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="branch" className="md:text-lg">
								Select Branch
							</Label>
							<Select onValueChange={handleSelectBranch}>
								<SelectTrigger id="branch">
									<SelectValue
										placeholder={
											isLoading ? "Loading..." : "Select"
										}
									/>
								</SelectTrigger>
								<SelectContent
									position="popper"
									className="bg-black text-white">
									{branches?.map((branch) => (
										<SelectItem key={branch} value={branch}>
											{branch}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="semester" className="md:text-lg">
								Select Semester
							</Label>
							<Select onValueChange={handleSelectSemester}>
								<SelectTrigger id="semester">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent
									position="popper"
									className="bg-black text-white">
									{semesters.map((semester) => (
										<SelectItem
											key={semester}
											value={semester}>
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
					className="bg-primary-300 hover:bg-primary-400"
					onClick={handleClick}
					disabled={isRedirecting}>
						{isRedirecting? <Loader2/> : "Get Started"}
					</Button>
			</CardFooter>
		</Card>
	);
}
