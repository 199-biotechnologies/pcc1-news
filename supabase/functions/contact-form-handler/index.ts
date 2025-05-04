import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend"; // Using npm specifier for Deno

// --- Configuration (Retrieve from Environment Variables/Secrets) ---
const HCAPTCHA_SECRET_KEY = Deno.env.get("HCAPTCHA_SECRET_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const CONTACT_EMAIL_RECIPIENT = Deno.env.get("CONTACT_EMAIL_RECIPIENT");
const CONTACT_EMAIL_SENDER = Deno.env.get("CONTACT_EMAIL_SENDER"); // Must be a verified domain in Resend

// --- Helper Function: Verify hCaptcha Token ---
async function verifyHCaptcha(token: string): Promise<boolean> {
  if (!HCAPTCHA_SECRET_KEY) {
    console.error("HCAPTCHA_SECRET_KEY is not set.");
    return false;
  }
  if (!token) {
    console.error("hCaptcha token is missing.");
    return false;
  }

  const verifyUrl = "https://api.hcaptcha.com/siteverify";
  const body = new URLSearchParams();
  body.append("secret", HCAPTCHA_SECRET_KEY);
  body.append("response", token);
  // Optionally add 'remoteip' if you capture the user's IP
  // body.append('remoteip', userIpAddress);

  try {
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    });

    if (!response.ok) {
      console.error(`hCaptcha verification request failed: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error("hCaptcha error body:", errorBody);
      return false;
    }

    const data = await response.json();
    console.log("hCaptcha verification response:", data);
    return data.success === true;
  } catch (error) {
    console.error("Error during hCaptcha verification:", error);
    return false;
  }
}

// --- Main Function Handler ---
serve(async (req) => {
  // 1. Check configuration
  if (!HCAPTCHA_SECRET_KEY || !RESEND_API_KEY || !CONTACT_EMAIL_RECIPIENT || !CONTACT_EMAIL_SENDER) {
    console.error("Missing required environment variables/secrets.");
    return new Response("Server configuration error", { status: 500 });
  }

  // 2. Extract data from the request (assuming DB webhook payload)
  let record;
  try {
    const payload = await req.json();
    // Adjust based on your actual webhook payload structure
    // Common structure: { type: 'INSERT', table: 'contact_messages', record: { ... }, old_record: null }
    if (payload.type !== 'INSERT' || !payload.record) {
       console.warn("Received non-insert event or missing record:", payload.type);
       return new Response("Ignoring non-insert event", { status: 200 }); // Acknowledge but don't process
    }
    record = payload.record;
    console.log("Received record:", record);
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response("Bad Request", { status: 400 });
  }

  // 3. Validate input data
  if (!record.name || !record.email || !record.message || !record.hcaptcha_token) {
    console.error("Missing required fields in the record:", record);
    // Don't return 400 here, as the data is already in the DB. Log it.
    // Consider deleting the invalid record if desired.
    return new Response("Invalid record data received", { status: 200 }); // Acknowledge DB trigger
  }

  // 4. Verify hCaptcha
  const isCaptchaValid = await verifyHCaptcha(record.hcaptcha_token);
  if (!isCaptchaValid) {
    console.warn("Invalid hCaptcha token received for record:", record.id);
    // Decide how to handle invalid captcha: log, delete record, or mark as spam?
    // For now, just log and acknowledge the trigger.
    // Optionally: Delete the record from Supabase here if desired.
    return new Response("Invalid captcha", { status: 200 }); // Acknowledge DB trigger but indicate issue
  }

  // 5. Send Email via Resend
  const resend = new Resend(RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: CONTACT_EMAIL_SENDER,
      to: CONTACT_EMAIL_RECIPIENT,
      subject: `New Contact Message from PCC1.news: ${record.name}`,
      html: `
        <p>You received a new contact message:</p>
        <ul>
          <li><strong>Name:</strong> ${record.name}</li>
          <li><strong>Email:</strong> ${record.email}</li>
          <li><strong>Message:</strong></li>
        </ul>
        <p style="white-space: pre-wrap;">${record.message}</p>
        <hr>
        <p><em>Received at: ${new Date(record.created_at).toLocaleString()}</em></p>
      `,
      // Optional: Add reply_to for easier response
      reply_to: record.email,
    });

    if (error) {
      console.error("Error sending email via Resend:", error);
      // Don't return 500 here as the main task (DB insert) succeeded.
      // Log the error for monitoring.
      return new Response("Email sending failed", { status: 200 }); // Acknowledge DB trigger
    }

    console.log("Email sent successfully:", data);
    return new Response("Email sent successfully", { status: 200 });

  } catch (error) {
    console.error("Unexpected error sending email:", error);
    return new Response("Internal Server Error during email sending", { status: 500 });
  }
});

console.log("Contact form handler function started.");