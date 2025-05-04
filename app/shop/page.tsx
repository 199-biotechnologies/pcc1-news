import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Microscope, Check, ShoppingCart, Minus, Plus } from "lucide-react"

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-teal-600" />
            <span className="text-lg font-light tracking-wide">Procyanidin Insights</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-light hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-light hover:underline underline-offset-4">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-light hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/shop" className="text-sm font-light hover:underline underline-offset-4">
              Shop
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="font-light" asChild>
            <Link href="/shop">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Shop
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl">PCC1™ Senolytic Complex</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
                  Advanced Procyanidin C1 formula backed by scientific research
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg border bg-white">
                  <Image
                    src="/placeholder.svg?key=i7dzg"
                    alt="PCC1 Senolytic Complex"
                    width={500}
                    height={500}
                    className="aspect-square object-cover w-full"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="overflow-hidden rounded-lg border bg-white">
                    <Image
                      src="/placeholder.svg?key=qwf30"
                      alt="PCC1 Bottle Close-up"
                      width={150}
                      height={150}
                      className="aspect-square object-cover w-full"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg border bg-white">
                    <Image
                      src="/placeholder.svg?key=g5mnn"
                      alt="PCC1 Capsules"
                      width={150}
                      height={150}
                      className="aspect-square object-cover w-full"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg border bg-white">
                    <Image
                      src="/placeholder.svg?key=pi3a8"
                      alt="PCC1 Packaging"
                      width={150}
                      height={150}
                      className="aspect-square object-cover w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs text-teal-800 font-light">
                    Research-Backed
                  </div>
                  <h2 className="mt-2 text-2xl font-light">Procyanidin C1 Senolytic Complex</h2>
                  <div className="mt-2 flex items-center">
                    <div className="text-2xl font-light">$79.95</div>
                    <div className="ml-2 text-sm text-gray-500 line-through font-light">$99.95</div>
                    <div className="ml-2 rounded-full bg-teal-100 px-2 py-0.5 text-xs text-teal-800 font-light">
                      Save 20%
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 font-light">
                    PCC1™ is a natural trimeric procyanidin with remarkable senolytic and senomorphic properties.
                    Research published in Nature Metabolism (2021) demonstrated that PCC1 has potent effects on cellular
                    aging, extending lifespan in aged mice by over 60%.
                  </p>
                  <p className="text-sm text-gray-500 font-light">
                    Our premium formula delivers a precise dose of Procyanidin C1 extracted from natural sources using
                    advanced purification techniques to ensure maximum potency and bioavailability.
                  </p>
                </div>
                <div className="space-y-3">
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
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-md border">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:text-gray-900"
                    >
                      <Minus className="h-3 w-3" />
                      <span className="sr-only">Decrease quantity</span>
                    </button>
                    <input
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="h-8 w-12 text-center text-sm font-light [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:text-gray-900"
                    >
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Increase quantity</span>
                    </button>
                  </div>
                  <Button className="flex-1 font-light" size="sm">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
                <div className="text-xs text-gray-500 font-light">
                  * These statements have not been evaluated by the Food and Drug Administration. This product is not
                  intended to diagnose, treat, cure, or prevent any disease.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">The Science Behind PCC1™</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
                  Understanding how Procyanidin C1 supports cellular health
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-light">Senolytic Activity</h3>
                <p className="text-sm text-gray-500 font-light">
                  PCC1 selectively eliminates senescent cells (aging "zombie" cells) through programmed cell death while
                  sparing healthy cells, helping to remove harmful cells that secrete inflammatory compounds.
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-light">Senomorphic Effects</h3>
                <p className="text-sm text-gray-500 font-light">
                  Beyond eliminating senescent cells, PCC1 modifies their behavior to reduce harmful inflammatory
                  signals (SASP), decreasing their negative impact on surrounding tissues.
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-light">Antioxidant Properties</h3>
                <p className="text-sm text-gray-500 font-light">
                  As a polyphenol, PCC1 exhibits potent antioxidant properties that help combat oxidative stress, a key
                  factor in cellular aging and tissue damage.
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-light">Pathway Inhibition</h3>
                <p className="text-sm text-gray-500 font-light">
                  Research suggests PCC1 blocks the PI3K/AKT survival pathway in senescent cells, which is more potent
                  than commonly studied senolytic combinations.
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-light">Inflammation Reduction</h3>
                <p className="text-sm text-gray-500 font-light">
                  PCC1 significantly reduces the secretion of inflammatory compounds by senescent cells, including
                  interleukins IL-6, IL-8, and TGF-β, major drivers of chronic inflammation.
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-light">Lifespan Extension</h3>
                <p className="text-sm text-gray-500 font-light">
                  In the 2021 Nature Metabolism study, mice receiving PCC1 showed a 64.2% longer median post-treatment
                  lifespan and 65% reduction in mortality risk compared to controls.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline" size="sm" className="font-light" asChild>
                <Link href="/blog">Explore Research</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl text-center">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg border bg-white p-4">
                  <h3 className="text-lg font-light">What is Procyanidin C1?</h3>
                  <p className="mt-1 text-sm text-gray-500 font-light">
                    Procyanidin C1 (PCC1) is a specific type of trimeric procyanidin composed of flavan-3-ol subunits.
                    It is found naturally in foods like grape seeds, apples, and cocoa. Our PCC1™ formula contains a
                    highly purified form of this compound.
                  </p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <h3 className="text-lg font-light">How does PCC1™ work?</h3>
                  <p className="mt-1 text-sm text-gray-500 font-light">
                    PCC1™ works through both senolytic and senomorphic mechanisms. It selectively eliminates senescent
                    cells while also modifying the behavior of remaining senescent cells to reduce their harmful
                    inflammatory signals, supporting overall cellular health.
                  </p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <h3 className="text-lg font-light">What is the recommended dosage?</h3>
                  <p className="mt-1 text-sm text-gray-500 font-light">
                    The recommended dosage is 2 capsules daily, preferably with a meal. Each bottle contains a 30-day
                    supply (60 capsules).
                  </p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <h3 className="text-lg font-light">Is PCC1™ safe?</h3>
                  <p className="mt-1 text-sm text-gray-500 font-light">
                    Procyanidins have a long history of human consumption and safety as they are naturally present in
                    many foods. Our PCC1™ formula undergoes rigorous testing to ensure purity and safety. As with any
                    supplement, consult with your healthcare provider before use.
                  </p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <h3 className="text-lg font-light">How long until I see results?</h3>
                  <p className="mt-1 text-sm text-gray-500 font-light">
                    Individual results may vary. Based on research, consistent use over 2-3 months is recommended to
                    experience the full benefits of PCC1™.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="subscribe" className="w-full py-8 md:py-12 bg-gray-50">
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
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-4 py-6 md:flex-row md:gap-6 px-4 md:px-6">
          <div className="flex flex-col gap-2 md:gap-3 md:w-1/3">
            <Link href="/" className="flex items-center gap-2">
              <Microscope className="h-4 w-4 text-teal-600" />
              <span className="text-base font-light">Procyanidin Insights</span>
            </Link>
            <p className="text-xs text-gray-500 font-light">
              Exploring the science of Procyanidin C1 and its effects on cellular aging.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-light">Navigation</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-900 font-light">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-500 hover:text-gray-900 font-light">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-500 hover:text-gray-900 font-light">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-gray-500 hover:text-gray-900 font-light">
                    Shop
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-light">Resources</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-900 font-light">
                    Research Papers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-900 font-light">
                    Publications
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-900 font-light">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-light">Contact</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-900 font-light">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-900 font-light">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-900 font-light">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-gray-500 font-light">
          <div className="container px-4 md:px-6">
            © {new Date().getFullYear()} Procyanidin Insights. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
