"use client";

import React, { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Bell, Check, Loader2, Share2 } from "lucide-react";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  quantity: z.number().min(1).max(10).default(1),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productName: string;
}

export function WaitlistModal({
  open,
  onOpenChange,
  productId,
  productName,
}: WaitlistModalProps) {
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
      phone: "",
      quantity: 1,
    },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    if (!hcaptchaToken) {
      toast.error("Please complete the captcha verification");
      return;
    }

    const loadingToast = toast.loading("Joining waitlist...");

    try {
      // First, check if email already exists in waitlist
      const { data: existingEntry } = await supabase
        .from("waitlist")
        .select("id")
        .eq("email", data.email)
        .eq("product_id", productId)
        .single();

      if (existingEntry) {
        toast.error("You're already on the waitlist for this product!", {
          id: loadingToast,
        });
        return;
      }

      // Insert new waitlist entry
      const { data: newEntry, error } = await supabase
        .from("waitlist")
        .insert([
          {
            email: data.email,
            phone: data.phone || null,
            product_id: productId,
            quantity_interested: data.quantity,
            hcaptcha_token: hcaptchaToken,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Get position in waitlist
      const { count } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .eq("product_id", productId)
        .lte("created_at", newEntry.created_at);

      setPosition(count || 1);
      setIsSubmitted(true);
      toast.success("Successfully joined the waitlist!", { id: loadingToast });
    } catch (error) {
      console.error("Error joining waitlist:", error);
      toast.error("Failed to join waitlist. Please try again.", {
        id: loadingToast,
      });
    }
  };

  const handleShare = () => {
    const shareText = `I just joined the waitlist for ${productName}! 🎉`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: `${productName} Waitlist`,
        text: shareText,
        url: shareUrl,
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      toast.success("Link copied to clipboard!");
    }
  };

  const resetModal = () => {
    setIsSubmitted(false);
    setHcaptchaToken(null);
    setPosition(null);
    form.reset();
    captchaRef.current?.resetCaptcha();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          resetModal();
        }
        onOpenChange(newOpen);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Join the Waitlist
              </DialogTitle>
              <DialogDescription>
                Be the first to know when {productName} is back in stock. We&apos;ll
                notify you via email as soon as it&apos;s available.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone Number{" "}
                        <span className="text-muted-foreground text-sm">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 (555) 123-4567"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Get SMS notifications for faster updates
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity Interested</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 1)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        How many boxes would you like to reserve?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <HCaptcha
                    ref={captchaRef}
                    sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                    onVerify={(token) => setHcaptchaToken(token)}
                    onExpire={() => setHcaptchaToken(null)}
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting || !hcaptchaToken}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        <Bell className="mr-2 h-4 w-4" />
                        Join Waitlist
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <Check className="h-5 w-5" />
                You&apos;re on the list!
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="text-center">
                <p className="text-lg font-semibold">
                  Position #{position} in line
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  We&apos;ll email you as soon as {productName} is back in stock
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium mb-2">What&apos;s next?</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check your email for confirmation</li>
                  <li>• We&apos;ll notify you 24 hours before launch</li>
                  <li>• You&apos;ll have early access to purchase</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}