"use client";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { auth, db } from "@/lib/firebase.config";

export default function GoogleSignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthorizedUser = async (email: string): Promise<boolean> => {
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

      // Check if user is authorized
      const isAuthorized = await checkAuthorizedUser(user.email!);
      if (!isAuthorized) {
        setError("Access denied. Your email is not authorized.");
        await auth.signOut(); // Sign the user out
        setIsLoading(false);
        return;
      }

      // Get Firebase ID token
      const token = await user.getIdToken();

      // Set the session cookie (accessible by middleware)
      Cookies.set("session", token, {
        path: "/",
        expires: 5, // 5 days
        sameSite: "Strict",
        secure: true,
      });

      console.log("User signed in and session set.");
      router.push("/dashboard");
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
