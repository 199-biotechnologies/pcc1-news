import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Microscope, BookOpen, Users } from "lucide-react"
import { PageContainer, Section } from "@/components/layout/page-container"
import { NewsletterSubscribe } from "@/components/newsletter-subscribe"
import { ContentFeedItem, ContentType } from "@/components/content-feed-item"
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

// Define the type for a blog post
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string | null;
  author: string | null;
}

// Unified content item
interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description?: string | null;
  date: Date;
  link: string;
  isExternal?: boolean;
  journal?: string | null;
  author?: string | null;
}

export default async function Home() {
  // Fetch latest research papers and blog posts
  const [papersResult, postsResult] = await Promise.all([
    supabase
      .from('research_papers')
      .select('*')
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('year', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, published_at, author')
      .order('published_at', { ascending: false })
      .limit(10)
  ]);

  if (papersResult.error) {
    console.error("Error fetching research papers:", papersResult.error);
  }
  if (postsResult.error) {
    console.error("Error fetching blog posts:", postsResult.error);
  }

  // Convert to unified content items
  const contentItems: ContentItem[] = [];
  
  // Add research papers
  (papersResult.data || []).forEach((paper: ResearchPaper) => {
    contentItems.push({
      id: `research-${paper.id}`,
      type: 'research',
      title: paper.title,
      description: paper.description,
      date: new Date(paper.published_at || paper.created_at),
      link: paper.doi ? `https://doi.org/${paper.doi}` : '#',
      isExternal: true,
      journal: paper.journal,
    });
  });

  // Add blog posts
  (postsResult.data || []).forEach((post: BlogPost) => {
    contentItems.push({
      id: `blog-${post.id}`,
      type: 'blog',
      title: post.title,
      description: post.excerpt,
      date: new Date(post.published_at || ''),
      link: `/blog/${post.slug}`,
      isExternal: false,
      author: post.author,
    });
  });

  // Sort all content by date, newest first
  contentItems.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Group content by time period
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const groupedContent = {
    today: contentItems.filter(item => item.date >= todayStart),
    thisWeek: contentItems.filter(item => item.date >= weekAgo && item.date < todayStart),
    thisMonth: contentItems.filter(item => item.date >= monthAgo && item.date < weekAgo),
    older: contentItems.filter(item => item.date < monthAgo)
  };

  return (
    <PageContainer>
      <Section background="gradient">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-extralight tracking-tight sm:text-5xl xl:text-6xl/none">
              Decoding Cellular Longevity Through <span className="text-teal-600">Procyanidin C1</span> Research
            </h1>
            <p className="text-base text-gray-600 sm:text-lg font-light">
              PCC1.news is your source for the latest scientific discoveries about Procyanidin C1, a natural
              compound showing remarkable potential in addressing cellular aging and extending healthspan.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button size="sm" className="font-light" asChild>
                <Link href="/shop">
                  Explore Shop <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="font-light" asChild>
                <Link href="#subscribe">Subscribe</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[500px]">
            <Image
              src="/pcc1-molecule.svg"
              alt="Procyanidin C1 Molecular Structure"
              width={500}
              height={400}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </Section>

      <Section>
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
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Latest Updates</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 text-sm md:text-base font-light">
              The latest research papers and articles about Procyanidin C1
            </p>
          </div>
        </div>
        
        <div className="mx-auto max-w-4xl">
          {/* Content Feed */}
          <div className="divide-y">
            {/* Today's content */}
            {groupedContent.today.length > 0 && (
              <div className="pb-8">
                <h3 className="text-sm text-gray-500 font-light mb-4">Today</h3>
                <div className="space-y-1">
                  {groupedContent.today.map(item => (
                    <ContentFeedItem key={item.id} {...item} />
                  ))}
                </div>
              </div>
            )}
            
            {/* This week's content */}
            {groupedContent.thisWeek.length > 0 && (
              <div className="py-8">
                <h3 className="text-sm text-gray-500 font-light mb-4">This Week</h3>
                <div className="space-y-1">
                  {groupedContent.thisWeek.map(item => (
                    <ContentFeedItem key={item.id} {...item} />
                  ))}
                </div>
              </div>
            )}
            
            {/* This month's content */}
            {groupedContent.thisMonth.length > 0 && (
              <div className="py-8">
                <h3 className="text-sm text-gray-500 font-light mb-4">This Month</h3>
                <div className="space-y-1">
                  {groupedContent.thisMonth.map(item => (
                    <ContentFeedItem key={item.id} {...item} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Older content */}
            {groupedContent.older.length > 0 && (
              <div className="py-8">
                <h3 className="text-sm text-gray-500 font-light mb-4">Earlier</h3>
                <div className="space-y-1">
                  {groupedContent.older.slice(0, 5).map(item => (
                    <ContentFeedItem key={item.id} {...item} />
                  ))}
                </div>
              </div>
            )}
            
            {/* No content fallback */}
            {contentItems.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500 font-light">No updates yet. Check back soon!</p>
              </div>
            )}
          </div>
          
          {/* View more buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <Button variant="outline" size="sm" className="font-light" asChild>
              <Link href="/research">All Research</Link>
            </Button>
            <Button variant="outline" size="sm" className="font-light" asChild>
              <Link href="/blog">All Articles</Link>
            </Button>
          </div>
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
          <div className="w-full max-w-md">
            <NewsletterSubscribe
              source="homepage-subscribe"
              successMessage="Welcome to the research community!"
              showDescription={false}
            />
            <p className="text-xs text-gray-600 font-light mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}