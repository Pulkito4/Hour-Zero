import React from "react";
import ContactForm from "@/components/forms/ContactForm";
import AnimatedContact from "./AnimatedContact";
import AnimatedFormWrapper from "./AnimatedFormWrapper";
const ContactPage = () => {
	return (
		<>
			<div className="min-h-screen bg-slate-950">
				<AnimatedContact />
				
				<AnimatedFormWrapper>
					<ContactForm />
				</AnimatedFormWrapper>
			</div>
		</>
	);
};

export default ContactPage;
