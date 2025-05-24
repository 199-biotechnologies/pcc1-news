import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, User, Search } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { NewsletterSubscribe } from "@/components/newsletter-subscribe"
import { PageContainer, Section, PageHeader } from "@/components/layout/page-container"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | PCC1.news',
  description: 'Read the latest articles and insights about Procyanidin C1 research, cellular aging, and longevity science.',
  openGraph: {
    title: 'PCC1 Research Blog',
    description: 'Latest articles on Procyanidin C1 and longevity science.',
  },
};

// Define the type for a blog post preview based on the Supabase table columns selected
interface BlogPostPreview {
  id: number;
  // created_at: string; // Not selected for list view
  title: string;
  slug: string;
  excerpt: string | null;
  // content: string; // Not selected for list view
  published_at: string | null;
  author: string | null;
  image_url: string | null;
  doi: string | null;
}

// Helper function to format date string
function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return '';
  }
}

export default async function BlogPage() {
  // Fetch data from Supabase
  const { data: postsData, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, published_at, author, image_url, doi')
    .order('published_at', { ascending: false }); // Order by publish date, newest first

  if (error) {
    console.error("Error fetching blog posts:", error);
  }

  // Ensure postsData is an array, even if fetch fails or returns null
  const blogPosts: BlogPostPreview[] = postsData || [];

  return (
    <PageContainer>
      <Section background="gradient">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <PageHeader
            title="PCC1.news Blog"
            description="The latest studies, insights, and discoveries in the field of Procyanidin C1 science."
          />
          {/* Search input - functionality not implemented yet */}
          <div className="w-full max-w-md flex items-center space-x-2 relative mt-4">
            <input
              type="text"
              placeholder="Search articles..."
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
            />
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Map over fetched posts */}
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <article key={post.id} className="group relative flex flex-col space-y-3">
                {/* Link uses slug now */}
                <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" />
                <Image
                  src={post.image_url || "/placeholder.svg"}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="rounded-lg object-cover aspect-[16/9]"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600 font-light">
                    {post.published_at && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-lg font-light group-hover:text-teal-600 transition-colors">{post.title}</h2>
                  {post.excerpt && <p className="text-sm text-gray-600 font-light line-clamp-2">{post.excerpt}</p>}
                  <div className="flex items-center justify-between">
                    {post.author && (
                      <div className="flex items-center gap-1 text-xs text-gray-600 font-light">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                    )}
                    {post.doi && <div className="text-xs text-gray-600 font-light">DOI: {post.doi}</div>}
                  </div>
                  <div className="flex items-center text-teal-600 text-sm group-hover:underline font-light">
                    Read more <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </article>
            ))
          ) : (
             <p className="text-center text-gray-600 col-span-full">No blog posts found.</p>
          )}
        </div>
      </Section>

      {/* Subscribe section */}
      <Section id="subscribe" background="light">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Subscribe</h2>
            <p className="mx-auto max-w-[500px] text-gray-600 text-sm md:text-base font-light">
              Stay updated with the latest research and insights on Procyanidin C1.
            </p>
          </div>
          <div className="w-full max-w-md">
            <NewsletterSubscribe
              source="blog-subscribe"
              successMessage="Thanks for subscribing to our blog updates!"
              showDescription={false}
            />
            <p className="text-xs text-gray-600 font-light mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}
