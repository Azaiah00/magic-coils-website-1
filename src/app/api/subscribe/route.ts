import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // `hair_type` is optional — the quiz flow (Brief #4) posts it so we
    // can segment quiz-tagged subscribers by texture inside MailerLite.
    // Other surfaces (footer, popup, welcome) just omit the field.
    const { email, source, hair_type } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const API_KEY = process.env.MAILERLITE_API_KEY;
    const GROUP_ID = process.env.MAILERLITE_GROUP_ID;

    if (!API_KEY) {
      // If MailerLite isn't set up yet, we'll simulate a successful response
      // so the UI still works for testing.
      console.warn("MAILERLITE_API_KEY is not set. Simulating successful subscription.");
      return NextResponse.json({ success: true, simulated: true });
    }

    // MailerLite API v3 Endpoint
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        fields: {
          // MailerLite already has a built-in `signup_source` field —
          // mapping our incoming `source` value to it keeps everything
          // in one column instead of creating a duplicate field.
          signup_source: source || "direct",
          // Only forward `hair_type` when the caller sent one. MailerLite
          // auto-creates the custom field on first non-empty value, so
          // no manual admin setup is needed.
          ...(hair_type ? { hair_type } : {}),
        },
        groups: GROUP_ID ? [GROUP_ID] : undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("MailerLite API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to subscribe to MailerLite" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscription Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
