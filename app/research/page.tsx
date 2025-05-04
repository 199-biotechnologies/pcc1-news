import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, ExternalLink, ShoppingCart } from "lucide-react" // Removed Microscope as it wasn't used here
import { supabase } from "@/lib/supabaseClient" // Import Supabase client

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
  published_at: string | null; // Assuming date type in DB comes as string
}

// Make the component async to fetch data
export default async function ResearchPage() {

  // Fetch data from Supabase
  const { data: papers, error } = await supabase
    .from('research_papers')
    .select('*')
    .order('year', { ascending: false }) // Order by year, newest first
    .order('created_at', { ascending: false }); // Secondary sort by creation date

  if (error) {
    console.error("Error fetching research papers:", error);
    // Optionally render an error message to the user
    // return <p>Error loading research papers.</p>;
  }

  // Ensure papers is an array, even if fetch fails or returns null
  const researchPapers: ResearchPaper[] = papers || [];

  return (
    <>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                {/* Updated Title */}
                <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl">Research</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
                  Key research papers on Procyanidin C1 and its effects on cellular aging, senescence, and longevity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl space-y-8">
              {/* Map over fetched papers */}
              {researchPapers.length > 0 ? (
                researchPapers.map((paper) => (
                  <div key={paper.id} className="border-b pb-6 last:border-0">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                      <div className="space-y-2">
                        <h2 className="text-xl font-light">{paper.title}</h2>
                        {paper.authors && <p className="text-sm text-gray-600 font-light">{paper.authors}</p>}
                        <p className="text-sm font-light">
                          {paper.journal && <span className="italic">{paper.journal}</span>}
                          {paper.year && `, ${paper.year}`}
                          {paper.volume && `, ${paper.volume}`}
                          {paper.pages && `, ${paper.pages}`}
                        </p>
                        {paper.description && <p className="text-sm text-gray-500 font-light">{paper.description}</p>}
                        {paper.doi && (
                          <div className="flex items-center justify-between pt-2">
                            <p className="text-sm text-gray-500 font-light">DOI: {paper.doi}</p>
                            <Link
                              href={`https://doi.org/${paper.doi}`}
                              className="text-teal-600 text-sm font-light hover:underline flex items-center"
                              target="_blank"
                              rel="noopener noreferrer" // Added rel for security
                            >
                              View Publication <ExternalLink className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No research papers found.</p>
              )}
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Explore More</h2>
                <p className="mx-auto max-w-[500px] text-gray-500 text-sm md:text-base font-light">
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
          </div>
        </section>
      </main>
    </>
  )
}
