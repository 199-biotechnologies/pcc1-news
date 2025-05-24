import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend";

// Configuration from environment variables
const HCAPTCHA_SECRET_KEY = Deno.env.get("HCAPTCHA_SECRET_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const WAITLIST_EMAIL_SENDER = Deno.env.get("CONTACT_EMAIL_SENDER"); // Reuse existing sender

// Helper function to verify hCaptcha token
async function verifyHCaptcha(token: string): Promise<boolean> {
  if (!HCAPTCHA_SECRET_KEY || !token) {
    console.error("Missing hCaptcha configuration or token");
    return false;
  }

  const verifyUrl = "https://api.hcaptcha.com/siteverify";
  const body = new URLSearchParams();
  body.append("secret", HCAPTCHA_SECRET_KEY);
  body.append("response", token);

  try {
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    });

    if (!response.ok) {
      console.error(`hCaptcha verification failed: ${response.status}`);
      return false;
    }

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error during hCaptcha verification:", error);
    return false;
  }
}

// Main function handler
serve(async (req) => {
  // Check configuration
  if (!HCAPTCHA_SECRET_KEY || !RESEND_API_KEY || !WAITLIST_EMAIL_SENDER) {
    console.error("Missing required environment variables");
    return new Response("Server configuration error", { status: 500 });
  }

  // Extract webhook payload
  let record;
  try {
    const payload = await req.json();
    if (payload.type !== 'INSERT' || !payload.record) {
      console.warn("Received non-insert event or missing record");
      return new Response("Ignoring non-insert event", { status: 200 });
    }
    record = payload.record;
    console.log("Processing waitlist entry:", record.id);
  } catch (error) {
    console.error("Error parsing request:", error);
    return new Response("Bad Request", { status: 400 });
  }

  // Validate required fields
  if (!record.email || !record.hcaptcha_token || !record.product_id) {
    console.error("Missing required fields in record");
    return new Response("Invalid record data", { status: 200 });
  }

  // Verify hCaptcha
  const isCaptchaValid = await verifyHCaptcha(record.hcaptcha_token);
  if (!isCaptchaValid) {
    console.warn("Invalid hCaptcha token for record:", record.id);
    // Consider deleting the invalid record
    return new Response("Invalid captcha", { status: 200 });
  }

  // Send confirmation email via Resend
  const resend = new Resend(RESEND_API_KEY);
  try {
    const referralLink = `https://pcc1.news/shop?ref=${record.referral_code}`;
    
    const { data, error } = await resend.emails.send({
      from: WAITLIST_EMAIL_SENDER,
      to: record.email,
      subject: "You're on the PCC1 waitlist! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .button { display: inline-block; background-color: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .referral-box { background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 40px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to the PCC1 Waitlist!</h1>
            </div>
            
            <p>Hi there,</p>
            
            <p>Thank you for joining the waitlist for <strong>Procyanidin Complex</strong>. We're excited to have you as one of our early supporters!</p>
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>We'll notify you 24 hours before the product launches</li>
              <li>You'll have early access to purchase before the general public</li>
              <li>As a waitlist member, you'll receive an exclusive discount code</li>
            </ul>
            
            ${record.quantity_interested > 1 ? `<p>We've noted that you're interested in <strong>${record.quantity_interested} boxes</strong>. We'll do our best to reserve this quantity for you.</p>` : ''}
            
            <div class="referral-box">
              <h3>Move up the waitlist!</h3>
              <p>Share your unique referral link with friends. Each friend who joins using your link moves you up in priority:</p>
              <p><strong>Your referral link:</strong><br/>
              <a href="${referralLink}">${referralLink}</a></p>
            </div>
            
            <p>While you wait, you might be interested in:</p>
            <ul>
              <li><a href="https://pcc1.news/research">Reading our latest research</a></li>
              <li><a href="https://pcc1.news/science">Understanding the science behind PCC1</a></li>
              <li><a href="https://pcc1.news/blog">Following our blog for updates</a></li>
            </ul>
            
            <div class="footer">
              <p>Questions? Reply to this email and we'll be happy to help.</p>
              <p>© ${new Date().getFullYear()} PCC1.news. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to the PCC1 Waitlist!

Thank you for joining the waitlist for Procyanidin Complex. We're excited to have you as one of our early supporters!

What happens next?
- We'll notify you 24 hours before the product launches
- You'll have early access to purchase before the general public
- As a waitlist member, you'll receive an exclusive discount code

${record.quantity_interested > 1 ? `We've noted that you're interested in ${record.quantity_interested} boxes. We'll do our best to reserve this quantity for you.\n` : ''}

Move up the waitlist!
Share your unique referral link with friends: ${referralLink}

While you wait, check out:
- Our latest research: https://pcc1.news/research
- The science behind PCC1: https://pcc1.news/science
- Blog updates: https://pcc1.news/blog

Questions? Reply to this email and we'll be happy to help.

© ${new Date().getFullYear()} PCC1.news. All rights reserved.
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return new Response("Email sending failed", { status: 200 });
    }

    console.log("Waitlist confirmation email sent:", data);
    return new Response("Email sent successfully", { status: 200 });

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

console.log("Waitlist confirmation handler started.");