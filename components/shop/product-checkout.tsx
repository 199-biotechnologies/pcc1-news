'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart, Loader2 } from "lucide-react";

interface ProductCheckoutProps {
  productName: string;
  formattedPrice: string;
  productDescription: string;
  priceId: string; // Needed to potentially pass to API if API route changes
}

export default function ProductCheckout({
  productName,
  formattedPrice,
  productDescription,
  priceId // Currently unused in handleCheckout as API route has fixed priceId
}: ProductCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // API route currently uses a hardcoded priceId, so no need to send it in the body
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ priceId: priceId }) // Uncomment if API route expects priceId
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Try to get error details
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url; // Redirect to Stripe
      } else {
        console.error('Stripe session URL not found in response.');
        alert('Could not initiate checkout. Please try again.');
        setIsLoading(false); // Reset loading state only if redirect fails
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`An error occurred during checkout: ${error instanceof Error ? error.message : String(error)}`);
      setIsLoading(false); // Reset loading state on error
    }
    // No need to set isLoading to false on success, as the page will redirect
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs text-teal-800 font-light">
          Research-Backed
        </div>
        {/* Use dynamic product name */}
        <h2 className="mt-2 text-2xl font-light">{productName}</h2>
        <div className="mt-2 flex items-center">
          {/* Use dynamic formatted price */}
          <div className="text-2xl font-light">{formattedPrice}</div>
          {/* Optional: Add logic for comparison price if needed */}
          {/* <div className="ml-2 text-sm text-gray-500 line-through font-light">$99.95</div> */}
          {/* <div className="ml-2 rounded-full bg-teal-100 px-2 py-0.5 text-xs text-teal-800 font-light">Save 20%</div> */}
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
        {/* Static features for now */}
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-light">30-day supply (60 capsules)</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-light">Scientifically validated formula</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-light">Free shipping on all orders</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-light">60-day money-back guarantee</span>
        </div>
      </div>
      {/* Checkout Button */}
      <div className="flex items-center gap-3">
         <Button
           className="flex-1 font-light"
           size="lg"
           onClick={handleCheckout}
           disabled={isLoading}
         >
           {isLoading ? (
             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
           ) : (
             <ShoppingCart className="mr-2 h-4 w-4" />
           )}
           {isLoading ? 'Processing...' : 'Buy Now'}
         </Button>
       </div>
      <div className="text-xs text-gray-500 font-light">
        * These statements have not been evaluated by the Food and Drug Administration. This product is not
        intended to diagnose, treat, cure, or prevent any disease.
      </div>
    </div>
  );
}