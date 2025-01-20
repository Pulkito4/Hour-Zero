"use client";
import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase.config"; // Ensure correct Firebase config import
import { useRouter } from "next/navigation";
import { cookies } from "next/dist/server/request/cookies";


export default function GoogleSignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthorizedUser = async (email: string) => {
    const q = query(
      collection(db, "authorizedUsers"),
      where("email", "==", email.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    setError(null);
   
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        //const cookieStore = await cookies();
        
      // Check if the user's email is in the authorized list
      const isAuthorized = await checkAuthorizedUser(user.email!);
       
      if (!isAuthorized) {
        setError("Access denied. Your email is not authorized.");
        await auth.signOut(); // Sign the user out if not authorized
        setIsLoading(false);
        return;
      }
      const token = await result.user.getIdToken();
      document.cookie = `session=${token}; path=/; max-age=${60 * 60 * 24 * 5}; SameSite=Strict; Secure`;
    
      //cookieStore.set("session", token, { httpOnly: true });

      console.log("User signed in:", user);
      router.push("/dashboard"); // Redirect to dashboard or another route
    } catch (err: any) {
      setError("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-black border-2 border-purple-500 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.5)]">
        <h2 className="text-2xl font-bold text-center text-white">Sign In with Google</h2>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
