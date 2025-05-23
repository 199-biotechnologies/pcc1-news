'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Bell, Loader2 } from "lucide-react";

interface ProductCheckoutProps {
  productName: string;
  formattedPrice: string;
  productDescription: string;
  priceId: string; // Kept for future use when product is back in stock
}

export default function ProductCheckout({
  productName,
  formattedPrice,
  productDescription,
  priceId: _priceId // Prefixed with _ to indicate intentionally unused
}: ProductCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleWaitlist = async () => {
    setIsLoading(true);
    // Simulate waitlist signup
    setTimeout(() => {
      alert('Thank you for your interest! We\'ll notify you when PCC1 is back in stock.');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex gap-2">
          <div className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs text-teal-800 font-light">
            Research-Backed
          </div>
          <div className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs text-red-800 font-light">
            Sold Out
          </div>
        </div>
        {/* Use dynamic product name */}
        <h2 className="mt-2 text-2xl font-light">{productName}</h2>
        <div className="mt-2 flex items-center">
          {/* Use dynamic formatted price */}
          <div className="text-2xl font-light">{formattedPrice}</div>
          <div className="ml-2 text-sm text-gray-600 font-light">per box</div>
        </div>
      </div>
      <div className="space-y-2">
         {/* Use dynamic product description */}
        <p className="text-sm text-gray-500 font-light">
          {productDescription}
        </p>
        {/* Add more description paragraphs if needed */}
      </div>
      <div className="space-y-3">
        {/* Updated features */}
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-light">3 sachets × 3 capsules (9 capsules total)</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-light">High-purity Procyanidin C1</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-light">Third-party tested for quality</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-light">GMP-certified manufacturing</span>
        </div>
      </div>
      {/* Waitlist Button */}
      <div className="space-y-3">
        <Button
          className="w-full font-light"
          size="lg"
          onClick={handleWaitlist}
          disabled={isLoading}
          variant="outline"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Bell className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Adding to waitlist...' : 'Join Waitlist'}
        </Button>
      </div>
      <div className="text-xs text-gray-500 font-light">
        * These statements have not been evaluated by the Food and Drug Administration. This product is not
        intended to diagnose, treat, cure, or prevent any disease.
      </div>
    </div>
  );
}