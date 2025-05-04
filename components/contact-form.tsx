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
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setHcaptchaToken(null);
      captchaRef.current?.resetCaptcha(); // Reset hCaptcha widget
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Error sending message. Please try again.", { id: loadingToastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-light">Send us a message</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
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
               sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2" // Default Web3Forms/hCaptcha free key
               onVerify={(token) => setHcaptchaToken(token)}
               onExpire={() => setHcaptchaToken(null)}
               onError={() => toast.error("Captcha challenge failed. Please try again.")}
               reCaptchaCompat={false} // Important for hCaptcha
             />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full font-light" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}