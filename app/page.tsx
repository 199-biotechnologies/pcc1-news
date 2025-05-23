import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Microscope, BookOpen, Users, FileText } from "lucide-react"
import { PageContainer, Section } from "@/components/layout/page-container"
import { supabase } from "@/lib/supabaseClient"

// Define the type for a research paper
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

export default async function Home() {
  // Fetch latest 3 research papers from Supabase
  const { data: papers, error } = await supabase
    .from('research_papers')
    .select('*')
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('year', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching research papers:", error);
  }

  const latestPapers: ResearchPaper[] = papers || [];
  return (
    <PageContainer>
      <Section background="gradient">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-xs text-teal-800 font-light">
              Scientific Research Hub
            </div>
            <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl md:text-5xl">
              The Definitive Source for Procyanidin C1 Research
            </h1>
            <p className="text-gray-600 md:text-lg/relaxed font-light">
              Advancing the science of polyphenol senolytics through rigorous research and discovery.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="sm" className="font-light" asChild>
                <Link href="/blog">
                  Explore Research <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="font-light" asChild>
                <Link href="#subscribe">Subscribe</Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto">
            <Image
              src="/pcc1-molecule.svg"
              alt="Procyanidin C1 Molecular Structure"
              width={450}
              height={300}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">The Science of PCC1</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 text-sm md:text-base font-light">
              Procyanidin C1 is a trimeric procyanidin with remarkable senolytic and senomorphic properties.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-8 lg:grid-cols-3 lg:gap-10">
          <div className="grid gap-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-800 mb-3 mx-auto">
              <Microscope className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-light text-center">Senolytic Activity</h3>
            <p className="text-sm text-gray-600 text-center font-light">
              Selectively eliminates senescent "zombie" cells while sparing healthy cells, reducing harmful
              inflammatory compounds.
            </p>
          </div>
          <div className="grid gap-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-800 mb-3 mx-auto">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-light text-center">Senomorphic Effects</h3>
            <p className="text-sm text-gray-600 text-center font-light">
              Modifies senescent cell behavior to reduce harmful inflammatory signals (SASP), decreasing negative
              impact on tissues.
            </p>
          </div>
          <div className="grid gap-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-800 mb-3 mx-auto">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-light text-center">Lifespan Extension</h3>
            <p className="text-sm text-gray-600 text-center font-light">
              Research shows PCC1 extended median post-treatment lifespan by 64.2% in aged mice, equivalent to
              humans 75-90 years old.
            </p>
          </div>
        </div>
      </Section>

      <Section background="light">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Why PCC1 Matters</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 text-sm md:text-base font-light">
              The world is aging rapidly, and with it comes an epidemic of age-related diseases driven by cellular senescence.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-8 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-light">The Global Aging Challenge</h3>
              <p className="text-sm text-gray-600 font-light">
                By 2050, 16% of the world's population will be over 65. Age-related diseases cost healthcare systems trillions annually, driven by the accumulation of senescent "zombie" cells that refuse to die and poison surrounding tissue.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-light">The Senescence Problem</h3>
              <p className="text-sm text-gray-600 font-light">
                Senescent cells accumulate with age, secreting inflammatory factors that accelerate aging and disease. Traditional approaches fail to address this root cause, focusing on symptoms rather than cellular dysfunction.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-light">PCC1: Nature's Solution</h3>
              <p className="text-sm text-gray-600 font-light">
                Procyanidin C1 selectively eliminates senescent cells while preserving healthy ones. Found naturally in grape seeds and other plants, it represents a breakthrough in addressing aging at the cellular level.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-light">Evidence-Based Results</h3>
              <p className="text-sm text-gray-600 font-light">
                Peer-reviewed research shows PCC1 extends lifespan by 64.2% in aged mice, improves physical function, and reduces markers of aging. This natural compound offers hope for healthier, longer lives.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button size="sm" className="font-light" asChild>
            <Link href="/science">
              Learn the Science <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Latest Research</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 text-sm md:text-base font-light">
              Recent peer-reviewed studies exploring Procyanidin C1's effects on aging and age-related conditions.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-8 lg:grid-cols-3">
          {latestPapers.length > 0 ? (
            latestPapers.map((paper) => {
              // Format the date
              const displayDate = paper.published_at 
                ? new Date(paper.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                : paper.year 
                ? `${paper.year}`
                : new Date(paper.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              
              return (
                <div key={paper.id} className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                  {paper.doi && (
                    <Link href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
                  )}
                  <div className="p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-teal-600" />
                      <span className="text-xs text-gray-600 font-light">{paper.journal || "Research Paper"}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-light line-clamp-2">{paper.title}</h3>
                    {paper.description && (
                      <p className="mb-3 text-sm text-gray-600 font-light line-clamp-3">
                        {paper.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-light">{displayDate}</span>
                      {paper.doi && (
                        <div className="flex items-center text-teal-600 text-sm group-hover:underline font-light">
                          View <ArrowRight className="ml-1 h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Fallback content if no papers are fetched
            <>
              <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-teal-600" />
                    <span className="text-xs text-gray-600 font-light">PNAS</span>
                  </div>
                  <h3 className="mb-2 text-lg font-light">PCC1 Rejuvenates Retinal Function in Aging Mice</h3>
                  <p className="mb-3 text-sm text-gray-600 font-light">
                    Recent study shows PCC1 can rejuvenate retinal function by targeting senescent cells.
                  </p>
                  <span className="text-xs text-gray-500 font-light">2024</span>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-teal-600" />
                    <span className="text-xs text-gray-600 font-light">FASEB Journal</span>
                  </div>
                  <h3 className="mb-2 text-lg font-light">PCC1 Attenuates Pulmonary Fibrosis</h3>
                  <p className="mb-3 text-sm text-gray-600 font-light">
                    Research demonstrates PCC1's ability to reduce pulmonary fibrosis.
                  </p>
                  <span className="text-xs text-gray-500 font-light">2024</span>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-teal-600" />
                    <span className="text-xs text-gray-600 font-light">Nature Metabolism</span>
                  </div>
                  <h3 className="mb-2 text-lg font-light">PCC1 Increases Lifespan in Mice</h3>
                  <p className="mb-3 text-sm text-gray-600 font-light">
                    Landmark study demonstrates PCC1's senotherapeutic activity.
                  </p>
                  <span className="text-xs text-gray-500 font-light">2021</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="sm" className="font-light" asChild>
            <Link href="/research">View All Research Papers</Link>
          </Button>
        </div>
      </Section>

      <Section id="subscribe" background="light">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Join the Research Community</h2>
            <p className="mx-auto max-w-[500px] text-gray-600 text-sm md:text-base font-light">
              Stay informed with breakthrough discoveries in polyphenol research from 199 Biotechnologies.
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
            <p className="text-xs text-gray-600 font-light">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}
