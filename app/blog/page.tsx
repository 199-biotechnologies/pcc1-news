import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User, Search } from "lucide-react" // Removed unused icons
import { supabase } from "@/lib/supabaseClient" // Import Supabase client

// Define the type for a blog post based on the Supabase table
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

// Helper function to format date string (optional, but good practice)
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
    return ''; // Return empty string or original string on error
  }
}


// Make the component async to fetch data
export default async function BlogPage() {

  // Fetch data from Supabase
  // Selecting specific columns needed for the list view
  const { data: postsData, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, published_at, author, image_url, doi')
    .order('published_at', { ascending: false }); // Order by publish date, newest first

  if (error) {
    console.error("Error fetching blog posts:", error);
    // Optionally render an error message to the user
    // return <p>Error loading blog posts.</p>;
  }

  // Ensure postsData is an array, even if fetch fails or returns null
  const blogPosts: BlogPostPreview[] = postsData || [];

  return (
    <>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                {/* Updated Title */}
                <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl">PCC1.news Blog</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
                  The latest studies, insights, and discoveries in the field of Procyanidin C1 science.
                </p>
              </div>
              {/* Search input - functionality not implemented yet */}
              <div className="w-full max-w-md flex items-center space-x-2 relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
                />
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Map over fetched posts */}
              {blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <article key={post.id} className="group relative flex flex-col space-y-3">
                    {/* Link uses slug now */}
                    <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" />
                    <Image
                      // Use image_url, provide fallback
                      src={post.image_url || "/placeholder.svg"}
                      alt={post.title}
                      width={500}
                      height={300}
                      className="rounded-lg object-cover aspect-[16/9]"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-light">
                        {post.published_at && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {/* Format the date */}
                            <span>{formatDate(post.published_at)}</span>
                          </div>
                        )}
                      </div>
                      <h2 className="text-lg font-light group-hover:text-teal-600 transition-colors">{post.title}</h2>
                      {/* Use excerpt */}
                      {post.excerpt && <p className="text-sm text-gray-500 font-light line-clamp-2">{post.excerpt}</p>}
                      <div className="flex items-center justify-between">
                        {post.author && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 font-light">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                          </div>
                        )}
                        {/* Show DOI if present */}
                        {post.doi && <div className="text-xs text-gray-500 font-light">DOI: {post.doi}</div>}
                      </div>
                      <div className="flex items-center text-teal-600 text-sm group-hover:underline font-light">
                        Read more <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                 <p className="text-center text-gray-500 col-span-full">No blog posts found.</p>
              )}
            </div>
          </div>
        </section>

        {/* Subscribe section remains unchanged for now */}
        <section id="subscribe" className="w-full py-8 md:py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Subscribe</h2>
                <p className="mx-auto max-w-[500px] text-gray-500 text-sm md:text-base font-light">
                  Stay updated with the latest research and insights on Procyanidin C1.
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
                <p className="text-xs text-gray-500 font-light">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
