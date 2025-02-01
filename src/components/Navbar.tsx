"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Share2, Star } from "lucide-react";
import { Button } from "./ui/button"; // Assuming Button is imported like this
import { handleCopy, redirectGithub } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { toast } = useToast()


	const handleCopyWithToast = () => {
		try {
		  handleCopy()
		  toast({
			title: "Copied!",
			description: "URL copied to clipboard.\nNow you can share it with your friends.",
		  })
		} catch (error) {
		  toast({
			variant: "destructive",
			title: "Error",
			description: "Failed to copy URL.",
		  })
		}
	  }

	return (
		<nav className="bg-gradient-to-r from-black via-primary-dark to-black text-white px-6 py-4 font-work-sans animate-gradient-x">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between">
					{/* Logo and Brand */}
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/logo.png"
							alt="logo"
							width={70}
							height={70}
							className="hover:opacity-90"
						/>
						<span className="text-xl font-semibold">
							Hour <span className="text-primary-100">Zero</span>
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-6">
						<Link
							href="/"
							className="hover:text-purple-200 transition-colors text-lg">
							Home
						</Link>
						<Link
							href="/about"
							className="hover:text-purple-200 transition-colors text-lg">
							About Us
						</Link>
						<Link
							href="/contact-us"
							className="hover:text-purple-200 transition-colors text-lg">
							Contact Us
						</Link>

						<div className=" flex gap-3">
							<Button
								className="border border-white size-7"
								onClick={redirectGithub}>
								<Star size={16} />
							</Button>
							<Button
								className="border border-white size-7"
								onClick={handleCopyWithToast}>
								<Share2 size={16} />
							</Button>
						</div>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden"
						onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Sidebar */}
				<div
					className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-r from-black  to-black text-white transform ${
						isOpen ? "translate-x-0" : "translate-x-full"
					} transition-transform duration-300 ease-in-out z-50`}>
					<div className="flex items-center justify-between p-4">
						<span className="text-xl font-semibold">
							Hour <span className="text-primary-100">Zero</span>
						</span>
						<button onClick={() => setIsOpen(false)}>
							<X size={24} />
						</button>
					</div>
					<div className="flex flex-col gap-4 p-4 flex-grow">
						<Link
							href="/"
							className="hover:text-purple-200 transition-colors"
							onClick={() => setIsOpen(false)}>
							Home
						</Link>
						<Link
							href="/about"
							className="hover:text-purple-200 transition-colors"
							onClick={() => setIsOpen(false)}>
							About Us
						</Link>
						<Link
							href="/contact-us"
							className="hover:text-purple-200 transition-colors"
							onClick={() => setIsOpen(false)}>
							Contact Us
						</Link>
					</div>
					<div className="p-4 mt-auto absolute bottom-0 w-full mb-2">
						<Button className="hover:text-purple-200 transition-colors w-full mb-2">
							<Link href="https://github.com/Pulkito4/Hour-Zero">
								Give us a star on Github !
							</Link>
						</Button>
						<Button
							className="hover:text-purple-200 transition-colors w-full"
							onClick={handleCopy}>
							Share with Friends !
						</Button>
					</div>
				</div>

				{/* Overlay */}
				{isOpen && (
					<div
						className="fixed inset-0 bg-black opacity-50 z-40"
						onClick={() => setIsOpen(false)}></div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
