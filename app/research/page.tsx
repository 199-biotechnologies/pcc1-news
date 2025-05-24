import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingCart } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { PageContainer, Section, PageHeader } from "@/components/layout/page-container"
import ResearchPapersList from "@/components/research/research-papers-list"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research | PCC1.news',
  description: 'Explore peer-reviewed research papers on Procyanidin C1, senescence, and cellular aging from leading scientific journals.',
  openGraph: {
    title: 'PCC1 Research Papers',
    description: 'Scientific research on Procyanidin C1 and cellular aging.',
  },
};

// Revalidate every 5 minutes (300 seconds)
export const revalidate = 300

// Define the type for a research paper based on the Supabase table
interface ResearchPaper {
  id: number;
  created_at: string;
  title: string;
  authors: string | null;
  journal: string | null;
  year: number | null;
  volume: string | null;
  pages: string | null;
  doi: string | null;
  description: string | null;
  published_at: string | null;
}

export default async function ResearchPage() {
  // Fetch data from Supabase
  const { data: papers, error } = await supabase
    .from('research_papers')
    .select('*')
    .order('year', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching research papers:", error);
  }

  // Ensure papers is an array, even if fetch fails or returns null
  const researchPapers: ResearchPaper[] = papers || [];

  return (
    <PageContainer>
      <Section background="gradient">
        <PageHeader 
          title="Research" 
          description="Key research papers on Procyanidin C1 and its effects on cellular aging, senescence, and longevity." 
        />
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <ResearchPapersList papers={researchPapers} />
        </div>
      </Section>

      <Section background="light">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Explore More</h2>
            <p className="mx-auto max-w-[500px] text-gray-600 text-sm md:text-base font-light">
              Discover our blog for more insights on Procyanidin C1 research and applications.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button size="sm" className="font-light" asChild>
              <Link href="/blog">
                Read Our Blog <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="font-light" asChild>
              <Link href="/shop">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Shop PCC1
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}
