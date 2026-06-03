import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { token } = body;

		if (!token) {
			return NextResponse.json({ error: "Token is required" }, { status: 400 });
		}

		// Await the cookies object before using its methods
		const cookieStore = await cookies();
		
		cookieStore.set("session", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			path: "/",
			maxAge: 60 * 60 * 24 * 5, // 5 days
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Session creation error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function DELETE() {
	try {
		const cookieStore = await cookies();
		cookieStore.delete("session");
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
