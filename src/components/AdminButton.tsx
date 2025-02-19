import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AdminButton() {
	const router = useRouter();

	const handleAdminClick = () => {
		const session = Cookies.get("session");

		if (session) {
			// Redirect to dashboard if session exists
			router.push("/dashboard");
		} else {
			// Redirect to Google Sign-In if no session exists
			router.push("/google");
		}
	};

	return (
		<button onClick={handleAdminClick} className="hover:text-purple-300">
			Admin
		</button>
	);
}
