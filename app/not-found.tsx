import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageContainer, Section, PageHeader } from '@/components/layout/page-container'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <PageContainer>
      <Section className="min-h-[60vh] flex items-center">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h1 className="text-6xl font-extralight text-gray-300">404</h1>
          <PageHeader
            title="Page Not Found"
            description="The page you're looking for doesn't exist or has been moved."
          />
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/research">
                <Search className="mr-2 h-4 w-4" />
                Browse Research
              </Link>
            </Button>
          </div>
          
          <div className="pt-8 text-sm text-gray-500 font-light">
            <p>If you believe this is an error, please <Link href="/about" className="text-teal-600 hover:underline">contact us</Link>.</p>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}