import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const path = searchParams.get("path");

	if (!path) {
		return NextResponse.json(
			{ error: "Path query parameter is required" },
			{ status: 400 }
		);
	}

	const octokit = new Octokit({
		auth: process.env.GITHUB_TOKEN,
	});

	try {
		const response = await octokit.repos.getContent({
			owner: "Pulkito4",
			repo: "hour-zero-codes",
			path: path,
		});

		return NextResponse.json(response.data);
	} catch (error: unknown) {
		console.error("GitHub API error:", error);
		const status = typeof error === 'object' && error !== null && 'status' in error ? (error as { status: number }).status : 500;
		const message = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json(
			{ error: "Failed to fetch repository contents", details: message },
			{ status: status }
		);
	}
}
