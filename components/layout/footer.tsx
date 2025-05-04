import Link from "next/link"
import { Microscope } from "lucide-react"

export function Footer() {
  return (
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
          {/* Navigation Column */}
          <div className="space-y-2">
            <h4 className="text-sm font-light">Navigation</h4>
            <ul className="space-y-1 text-xs">
              <li><Link href="/" className="text-gray-500 hover:text-gray-900 font-light">Home</Link></li>
              <li><Link href="/blog" className="text-gray-500 hover:text-gray-900 font-light">Blog</Link></li>
              <li><Link href="/research" className="text-gray-500 hover:text-gray-900 font-light">Research</Link></li>
              <li><Link href="/shop" className="text-gray-500 hover:text-gray-900 font-light">Shop</Link></li>
            </ul>
          </div>
          {/* Resources Column */}
          <div className="space-y-2">
            <h4 className="text-sm font-light">Resources</h4>
            <ul className="space-y-1 text-xs">
              {/* Removed duplicate link */}
              <li><Link href="/press" className="text-gray-500 hover:text-gray-900 font-light">Press</Link></li>
              <li><Link href="/privacy" className="text-gray-500 hover:text-gray-900 font-light">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-500 hover:text-gray-900 font-light">Terms of Service</Link></li>
            </ul>
          </div>
          {/* Contact Column */}
          <div className="space-y-2">
            <h4 className="text-sm font-light">Contact</h4>
            <ul className="space-y-1 text-xs">
              <li><Link href="/about" className="text-gray-500 hover:text-gray-900 font-light">About Us</Link></li>
              {/* <li><Link href="#" className="text-gray-500 hover:text-gray-900 font-light">Contact Us</Link></li> */} {/* Removed for now */}
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
  )
}