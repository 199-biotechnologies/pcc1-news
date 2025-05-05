import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Stripe from 'stripe';
import ProductCheckout from "@/components/shop/product-checkout"; // Import the client component

// Initialize Stripe server-side
// Ensure STRIPE_SECRET_KEY is set in your environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil', // Match the version used in the API route
  typescript: true,
});

// Helper function to format currency
function formatCurrency(amount: number | null, currency: string | null): string {
  if (amount === null || currency === null) {
    return 'Price unavailable';
  }
  // Adjust locale and options as needed for desired formatting
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100); // Stripe amounts are in the smallest currency unit (e.g., cents)
}

// Fetch product and price data from Stripe
async function getProductData() {
  const productId = 'prod_SFtP7VXSpwhZcG'; // Updated Live Product ID
  const priceId = 'price_1RLNcfIXR6Q95AMXx9UpgE2i'; // Updated Live Price ID

  try {
    // Fetch product and price details concurrently
    const [product, price] = await Promise.all([
      stripe.products.retrieve(productId),
      stripe.prices.retrieve(priceId)
    ]);

    // Validate that the price belongs to the product
    if (price.product !== product.id) {
        console.error(`Price ID ${priceId} does not belong to Product ID ${productId}`);
        throw new Error('Price and Product mismatch.');
    }

    return { product, price };
  } catch (error) {
    console.error("Error fetching Stripe product/price data:", error);
    // Return nulls to indicate failure, allowing the page component to handle it
    return { product: null, price: null };
  }
}

// The main page component - now an async Server Component
export default async function ShopPage() {
  const { product, price } = await getProductData();

  // Graceful handling if data fetching fails
  if (!product || !price) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-2xl font-semibold text-red-600">Error Loading Product</h1>
          <p className="text-gray-500 mt-2">
            We couldn't retrieve the product information at this time. Please try again later or contact support.
          </p>
        </div>
      </main>
    );
  }

  // Prepare data for display
  const formattedPrice = formatCurrency(price.unit_amount, price.currency);
  // Use Stripe product description if available, otherwise provide a sensible default.
  // Consider managing more detailed descriptions in a CMS or your own database.
  const productDescription = product.description || `Our premium formula delivers a precise dose of ${product.name} extracted from natural sources using advanced purification techniques to ensure maximum potency and bioavailability.`;
  const shortDescription = product.metadata?.short_description || `Advanced ${product.name} formula backed by scientific research`; // Use metadata if available

  return (
    <>
      <main className="flex-1">
        {/* Section 1: Title - Uses dynamic data */}
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl">{product.name}</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
                  {shortDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Product Details & Checkout */}
        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
              {/* Image Gallery - Uses dynamic image */}
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg border bg-white">
                  <Image
                    src={product.images?.[0] || "/placeholder.svg"} // Use first image from Stripe or fallback
                    alt={product.name || "Product Image"}
                    width={500}
                    height={500}
                    className="aspect-square object-cover w-full"
                    priority // Load main image faster
                  />
                </div>
                {/* Optional: Add more images from product.images if needed */}
                <div className="grid grid-cols-3 gap-2">
                   <div className="overflow-hidden rounded-lg border bg-white">
                     <Image src={product.images?.[1] || "/placeholder.svg?key=1"} alt="Product Detail 1" width={150} height={150} className="aspect-square object-cover w-full" />
                   </div>
                   <div className="overflow-hidden rounded-lg border bg-white">
                     <Image src={product.images?.[2] || "/placeholder.svg?key=2"} alt="Product Detail 2" width={150} height={150} className="aspect-square object-cover w-full" />
                   </div>
                   <div className="overflow-hidden rounded-lg border bg-white">
                     <Image src={product.images?.[3] || "/placeholder.svg?key=3"} alt="Product Detail 3" width={150} height={150} className="aspect-square object-cover w-full" />
                   </div>
                 </div>
              </div>

              {/* Product Info & Checkout Button - Render the client component */}
              <ProductCheckout
                productName={product.name}
                formattedPrice={formattedPrice}
                productDescription={productDescription}
                priceId={price.id} // Pass priceId needed for checkout
              />
            </div>
          </div>
        </section>

        {/* Section 3: Science - Update title dynamically */}
        <section className="w-full py-8 md:py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">The Science Behind {product.name}</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
                  Understanding how {product.name} supports cellular health
                </p>
              </div>
            </div>
            {/* Static science content - consider fetching from CMS if it needs to be dynamic */}
            <div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-light">Senolytic Activity</h3>
                <p className="text-sm text-gray-500 font-light">
                  Selectively eliminates senescent cells (aging "zombie" cells) through programmed cell death while
                  sparing healthy cells, helping to remove harmful cells that secrete inflammatory compounds.
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-light">Senomorphic Effects</h3>
                <p className="text-sm text-gray-500 font-light">
                  Beyond eliminating senescent cells, modifies their behavior to reduce harmful inflammatory
                  signals (SASP), decreasing their negative impact on surrounding tissues.
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-light">Antioxidant Properties</h3>
                <p className="text-sm text-gray-500 font-light">
                  Exhibits potent antioxidant properties that help combat oxidative stress, a key
                  factor in cellular aging and tissue damage.
                </p>
              </div>
              {/* Add other science points if necessary */}
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline" size="sm" className="font-light" asChild>
                <Link href="/research">
                  <span>Explore Research</span> {/* Wrap text in span */}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section 4: FAQ - Update question dynamically */}
        <section className="w-full py-8 md:py-12">
           <div className="container px-4 md:px-6">
             <div className="mx-auto max-w-3xl space-y-6">
               <div className="space-y-2">
                 <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl text-center">
                   Frequently Asked Questions
                 </h2>
               </div>
               {/* Static FAQ content - consider fetching from CMS */}
               <div className="space-y-4">
                 <div className="rounded-lg border bg-white p-4">
                   <h3 className="text-lg font-light">What is {product.name}?</h3>
                   <p className="mt-1 text-sm text-gray-500 font-light">
                     {product.name} is a specific type of compound identified in research.
                     Our formula contains a highly purified form.
                   </p>
                 </div>
                 <div className="rounded-lg border bg-white p-4">
                   <h3 className="text-lg font-light">How does it work?</h3>
                   <p className="mt-1 text-sm text-gray-500 font-light">
                     It works through senolytic and senomorphic mechanisms, selectively eliminating senescent
                     cells while also modifying their behavior to reduce harmful inflammatory signals.
                   </p>
                 </div>
                 <div className="rounded-lg border bg-white p-4">
                   <h3 className="text-lg font-light">What is the recommended dosage?</h3>
                   <p className="mt-1 text-sm text-gray-500 font-light">
                     The recommended dosage is typically 1-2 capsules daily, preferably with a meal. Each bottle contains a 30-day supply.
                   </p>
                 </div>
                 {/* Add other FAQs */}
               </div>
             </div>
           </div>
         </section>

        {/* Section 5: Subscribe */}
        <section id="subscribe" className="w-full py-8 md:py-12 bg-gray-50">
          {/* Static subscribe section */}
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Subscribe & Save</h2>
                <p className="mx-auto max-w-[500px] text-gray-500 text-sm md:text-base font-light">
                  Get 15% off your first order when you subscribe to our newsletter
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button type="submit" size="sm" className="font-light">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-gray-500 font-light">
                  We respect your privacy. Unsubscribe at any time. Discount code will be sent to your email.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
