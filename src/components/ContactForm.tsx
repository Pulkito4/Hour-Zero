"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { contactUsvalidation } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm() {
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(contactUsvalidation),
	});

	const onSubmit = async (data: any) => {
		setLoading(true);

		try {
			const captchaToken = await recaptchaRef.current?.executeAsync();
			if (!captchaToken) {
				throw new Error("Please verify you are human");
			}

			const res = await fetch("/api/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...data,
					captchaToken,
				}),
			});

			const responseData = await res.json();

			if (!res.ok) {
				throw new Error(responseData.error || "Failed to send message");
			}

			toast({
				title: "Success!",
				description: "Your message has been sent successfully.",
				variant: "default",
			});
			reset();
			recaptchaRef.current?.reset();
		} catch (error: any) {
			console.error("Form submission error:", error);
			toast({
				title: "Error",
				description:
					error.message ||
					"Failed to send message. Please try again.",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="max-w-md mx-auto bg-[#1F1F1F] border border-[#2D2D2D] rounded-xl shadow-xl">
			<CardContent className="p-6">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-6">
					<div className="space-y-1.5">
						<label className="contact-form-label">Name</label>
						<Input
							{...register("name")}
							placeholder="Your name"
							className="contact-form-input"
						/>
						{errors.name?.message && (
							<p className="text-red-500 text-xs mt-1">
								{errors.name.message.toString()}
							</p>
						)}
					</div>

					<div className="space-y-1.5">
						<label className="contact-form-label">Email</label>
						<Input
							type="email"
							{...register("email")}
							placeholder="you@example.com"
							className="contact-form-input"
						/>
						{errors.email?.message && (
							<p className="text-red-500 text-xs mt-1">
								{errors.email.message.toString()}
							</p>
						)}
					</div>

					<div className="space-y-1.5">
						<label className="contact-form-label">Message</label>
						<Textarea
							{...register("message")}
							placeholder="Your message"
							className="contact-form-textarea"
						/>
						{errors.message?.message && (
							<p className="text-red-500 text-xs mt-1">
								{errors.message.message.toString()}
							</p>
						)}
					</div>

					<ReCAPTCHA
						ref={recaptchaRef}
						size="invisible"
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
					/>

					<Button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors py-2.5">
						{loading ? (
							<div className="flex items-center justify-center gap-2">
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Sending...
							</div>
						) : (
							"Send Message"
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
