"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

interface NewsletterSubscribeProps {
  source?: string; // Override source tracking
  buttonText?: string;
  placeholder?: string;
  successMessage?: string;
  showDescription?: boolean;
  className?: string;
}

export function NewsletterSubscribe({
  source,
  buttonText = "Subscribe",
  placeholder = "Enter your email",
  successMessage = "Welcome! Check your email for confirmation.",
  showDescription = true,
  className = "",
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Call the subscribe function
      const { data, error } = await supabase.rpc("subscribe_newsletter", {
        subscriber_email: email,
        subscriber_source: source || pathname,
        subscriber_metadata: {
          timestamp: new Date().toISOString(),
          url: window.location.href,
        },
      });

      if (error) throw error;

      const result = data as { success: boolean; message?: string } | null;
      
      if (result?.success) {
        setIsSuccess(true);
        setEmail("");
        
        if (result.message === "Already subscribed") {
          toast.info("You're already subscribed!");
        } else {
          toast.success(successMessage);
        }
        
        // Reset success state after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        toast.error(result.message || "Subscription failed");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              disabled={isLoading || isSuccess}
              className="pr-10"
              required
            />
            {isSuccess && (
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
            )}
          </div>
          <Button
            type="submit"
            size="default"
            disabled={isLoading || isSuccess || !email}
            className="font-light"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : isSuccess ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Subscribed!
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                {buttonText}
              </>
            )}
          </Button>
        </div>
        
        {showDescription && (
          <p className="text-xs text-muted-foreground">
            Get exclusive updates on PCC1 research and early access to new products.
            Unsubscribe anytime.
          </p>
        )}
      </form>
    </div>
  );
}