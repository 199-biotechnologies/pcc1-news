"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Microscope, ShoppingCart } from "lucide-react"
import { CurrencySelector } from "@/components/currency-selector"
import { useCurrency } from "@/components/currency-provider"

export function Header() {
  const { currency, setCurrency } = useCurrency();
  return (
    <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Microscope className="h-5 w-5 text-teal-600" />
          <span className="text-lg font-light tracking-wide">PCC1.news</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-light hover:text-teal-600 transition-colors">
            Home
          </Link>
          <Link href="/science" className="text-sm font-light hover:text-teal-600 transition-colors">
            Science
          </Link>
          <Link href="/research" className="text-sm font-light hover:text-teal-600 transition-colors">
            Research
          </Link>
          <Link href="/blog" className="text-sm font-light hover:text-teal-600 transition-colors">
            Blog
          </Link>
          <Link href="/shop" className="text-sm font-light hover:text-teal-600 transition-colors">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-light hover:text-teal-600 transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <CurrencySelector value={currency} onValueChange={setCurrency} />
          <Button variant="outline" size="sm" className="font-light hidden sm:flex" asChild>
            <Link href="/shop">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Shop
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}