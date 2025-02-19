"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase.config";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			// Attempt to sign in with email and password
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const token = await userCredential.user.getIdToken();
			document.cookie = `session=${token}; path=/; max-age=${
				60 * 60 * 24 * 5
			}; SameSite=Strict; Secure`;

			// Redirect to the dashboard after successful login
			router.push("/dashboard");
		} catch (err: any) {
			setError("You are not authorized to access this page.");
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-black text-white">
			<div className="w-full max-w-md p-8 space-y-6 bg-black border-2 border-purple-500 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.5)]">
				<h2 className="text-2xl font-bold text-center text-white">
					Sign In
				</h2>

				{error && (
					<div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">
						{error}
					</div>
				)}

				<form onSubmit={handleSignIn} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-white">
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full p-2 mt-1 text-white bg-gray-800 border border-purple-500 rounded-md focus:ring-2 focus:ring-purple-500"
							placeholder="Enter your email"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-white">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-2 mt-1 text-white bg-gray-800 border border-purple-500 rounded-md focus:ring-2 focus:ring-purple-500"
							placeholder="Enter your password"
							required
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50">
						{isLoading ? "Signing In..." : "Sign In"}
					</button>

					<br />
					<br />
					<hr />
					<Link href="/google"> OR SIGNIN WITH GOOGLE </Link>
				</form>
			</div>
		</div>
	);
}
