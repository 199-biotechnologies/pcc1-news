import type React from "react"
import type { Metadata } from 'next'
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pcc1.news'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PCC1.news | Procyanidin C1 Research & News",
    template: "%s | PCC1.news"
  },
  description: "The leading source for Procyanidin C1 research, news, and scientific discoveries. Learn about PCC1's effects on cellular aging, senescence, and longevity from 199 Biotechnologies.",
  keywords: ["Procyanidin C1", "PCC1", "polyphenols", "longevity", "cellular aging", "senescence", "199 Biotechnologies", "199 Longevity", "grape seed extract", "anti-aging research"],
  authors: [{ name: "199 Biotechnologies" }],
  creator: "199 Biotechnologies",
  publisher: "199 Biotechnologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'PCC1.news',
    title: 'PCC1.news | Procyanidin C1 Research & News',
    description: 'The leading source for Procyanidin C1 research, news, and scientific discoveries. Learn about PCC1\'s effects on cellular aging, senescence, and longevity.',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PCC1.news - Procyanidin C1 Research'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@199longevity',
    creator: '@199longevity',
    title: 'PCC1.news | Procyanidin C1 Research & News',
    description: 'The leading source for Procyanidin C1 research, news, and scientific discoveries.',
    images: ['/opengraph-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "199 Biotechnologies",
    alternateName: "199 Longevity",
    url: "https://199biotechnologies.com",
    logo: "https://pcc1.news/placeholder-logo.png",
    sameAs: [
      "https://x.com/199longevity",
      "https://www.instagram.com/longevity.boris/"
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "199 Biotechnologies"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PCC1.news",
    description: "The leading source for Procyanidin C1 research, news, and scientific discoveries",
    url: "https://pcc1.news",
    publisher: {
      "@type": "Organization",
      name: "199 Biotechnologies"
    }
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
