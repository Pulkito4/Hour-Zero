import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  // if (req.headers.get("origin")?.includes("localhost")) {
  //   return NextResponse.json({ error: "Localhost submissions are blocked" }, { status: 403 });
  // }

  try {
    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: "Hour Zero <onboarding@resend.dev>",
      to: "contact.hourzero@gmail.com", // Change this to your actual email
      replyTo: email,
      subject: `Query from ${name}`,
      text: `${message}`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
