import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyCaptcha(token: string) {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });

  const data = await res.json();
  return data.success;
}

export async function POST(req: NextRequest) {
  if (req.headers.get("origin")?.includes("localhost")) {
    return NextResponse.json({ error: "Localhost submissions are blocked" }, { status: 403 });
  }

  try {
    const { name, email, message, captchaToken } = await req.json();
    // Verify captcha
    try {
      const isValidCaptcha = await verifyCaptcha(captchaToken);
      if (!isValidCaptcha) {
        return NextResponse.json(
          { error: "Invalid captcha verification" },
          { status: 400 }
        );
      }
    } catch (captchaError) {
      console.error("Captcha verification error:", captchaError);
      return NextResponse.json(
        { error: "Captcha verification failed" },
        { status: 400 }
      );
    }

    // Send email
    try {
      const data = await resend.emails.send({
        from: "Hour Zero <onboarding@resend.dev>",
        to: "contact.hourzero@gmail.com",
        replyTo: email,
        subject: `Query from ${name}`,
        text: `${message}`.trim(),
      });

      return NextResponse.json({ success: true, data });
    } catch (emailError: any) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        { error: emailError?.message || "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("General error:", error);
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }
}
