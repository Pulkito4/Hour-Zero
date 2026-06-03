import { useRouter } from "next/navigation";

export default function AdminButton() {
	const router = useRouter();

	const handleAdminClick = () => {
		router.push("/dashboard");
	};

	return (
		<button onClick={handleAdminClick} className="hover:text-purple-300">
			Admin
		</button>
	);
}
