import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Import Markdown renderer
import remarkGfm from 'remark-gfm'; // Import GFM plugin

// Define the type for a full blog post
interface BlogPost {
    id: number;
    created_at: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string; // Full content needed here
    published_at: string | null;
    author: string | null;
    image_url: string | null;
    doi: string | null;
}

// Helper function to format date string (can be moved to a utils file later)
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

// Define props type including params
interface PostPageProps {
    params: {
        slug: string;
    };
}

// Async component to fetch data based on slug
export default async function PostPage({ params }: PostPageProps) {
    const { slug } = params;

    // Fetch the single post matching the slug
    const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*') // Select all columns for the single post view
        .eq('slug', slug) // Filter by slug
        .single(); // Expect only one result

    // Handle errors or post not found
    if (error) {
        console.error("Error fetching post:", slug, error);
        // Decide how to handle DB errors, maybe show a generic error page
    }

    if (!post) {
        notFound(); // Trigger Next.js 404 page
    }

    // We have the post data now
    const blogPost = post as BlogPost; // Type assertion

    return (
        <main className="flex-1">
            <section className="w-full py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto space-y-3 text-center">
                        <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl md:text-5xl">{blogPost.title}</h1>
                        <div className="flex justify-center items-center gap-4 text-xs text-gray-500 font-light">
                            {blogPost.published_at && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>Published on {formatDate(blogPost.published_at)}</span>
                                </div>
                            )}
                            {blogPost.author && (
                                <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span>By {blogPost.author}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-8 md:py-12">
                <div className="container px-4 md:px-6">
                    {/* Apply prose styles for markdown rendering */}
                    {/* Added prose-lg for better readability */}
                    <article className="prose prose-lg prose-gray max-w-3xl mx-auto dark:prose-invert prose-p:font-light prose-headings:font-light prose-h2:font-light prose-h3:font-light prose-a:text-teal-600 hover:prose-a:text-teal-700 prose-strong:font-semibold prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-code:bg-gray-100 prose-code:p-1 prose-code:rounded prose-pre:bg-gray-100 prose-pre:p-3 prose-pre:rounded">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {blogPost.content}
                        </ReactMarkdown>

                        {blogPost.doi && (
                             <p className="text-sm mt-6">
                                <strong>DOI:</strong> <a href={`https://doi.org/${blogPost.doi}`} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">{blogPost.doi}</a>
                             </p>
                        )}

                        <div className="mt-12 border-t pt-6">
                             <Link href="/blog" className="text-teal-600 hover:underline font-light">
                                ← Back to Blog
                             </Link>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}

// Optional: Generate static paths for better performance (if desired)
// export async function generateStaticParams() {
//   const { data: posts } = await supabase.from('blog_posts').select('slug');
//   return posts?.map(({ slug }) => ({
//     slug,
//   })) || [];
// }