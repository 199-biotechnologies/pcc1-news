"use client";

import React, { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // <-- Add state for submission status
  const captchaRef = useRef<HCaptcha>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const loadingToastId = toast.loading("Sending message...");

    if (!hcaptchaToken) {
      toast.error("Please complete the captcha.", { id: loadingToastId });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name,
          email,
          message,
          hcaptcha_token: hcaptchaToken, // Include the token
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success("Message sent successfully!", { id: loadingToastId });
      setIsSubmitted(true); // <-- Set submission status to true
      // No need to reset fields anymore as the form will be hidden
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Error sending message. Please try again.", { id: loadingToastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      {!isSubmitted && ( // Only show header when form is visible
        <CardHeader>
          <CardTitle className="text-xl font-light">Send us a message</CardTitle>
        </CardHeader>
      )}
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {isSubmitted ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium">Thanks for reaching out, {name}!</h3>
              <p className="text-muted-foreground text-sm">We've received your message and will get back to you as soon as possible.</p>
            </div>
          ) : (
            // Use a React Fragment to group the form elements
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-center">
                 <HCaptcha
                   ref={captchaRef}
                   sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!} // Use env variable
                   onVerify={(token) => setHcaptchaToken(token)}
                   onExpire={() => setHcaptchaToken(null)}
                   onError={() => toast.error("Captcha challenge failed. Please try again.")}
                   reCaptchaCompat={false} // Important for hCaptcha
                 />
              </div>
            </> // End of React Fragment for form elements
          )}
        </CardContent>
        {!isSubmitted && ( // Conditionally render footer only if form is not submitted
          <CardFooter>
            <Button type="submit" className="w-full font-light" disabled={isLoading || !hcaptchaToken}>
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
}