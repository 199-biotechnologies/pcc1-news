import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Microscope, ShoppingCart } from "lucide-react"

export function Header() {
  return (
    <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          <Link href="/research" className="text-sm font-light hover:underline underline-offset-4">
            Research
          </Link>
          <Link href="/shop" className="text-sm font-light hover:underline underline-offset-4">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-light hover:underline underline-offset-4">
            About
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
  )
}