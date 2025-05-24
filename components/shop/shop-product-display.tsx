"use client";

import Image from "next/image";
import ProductCheckout from "./product-checkout";
import { useCurrency } from "@/components/currency-provider";

interface ShopProductDisplayProps {
  productName: string;
  productDescription: string;
  productImage?: string;
  priceId: string;
}

export default function ShopProductDisplay({
  productName,
  productDescription,
  productImage,
  priceId,
}: ShopProductDisplayProps) {
  const { formatPrice } = useCurrency();

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-lg border bg-white">
          <Image
            src={productImage || "/placeholder.svg"}
            alt={productName || "Product Image"}
            width={600}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Product Info & Checkout Button */}
      <ProductCheckout
        productName={productName}
        formattedPrice={formatPrice()}
        productDescription={productDescription}
        priceId={priceId}
      />
    </div>
  );
}