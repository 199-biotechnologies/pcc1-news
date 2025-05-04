import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Microscope, Calendar, User, Search, ShoppingCart } from "lucide-react"

export default function BlogPage() {
  // Sample blog posts data
  const posts = [
    {
      id: 1,
      title: "Procyanidin C1 Rejuvenates Retinal Function in Aging Mice",
      excerpt:
        "Recent PNAS study demonstrates that PCC1 can rejuvenate retinal function by targeting senescent cells in the retina, showing potential benefits for age-related vision decline.",
      date: "February 20, 2024",
      author: "Dr. Sarah Chen",
      image: "/placeholder.svg?key=widlr",
      doi: "10.1073/pnas.2312270121",
    },
    {
      id: 2,
      title: "PCC1 Attenuates Pulmonary Fibrosis by Eliminating Senescent Cells",
      excerpt:
        "Research published in The FASEB Journal showing that PCC1's senolytic properties can reduce pulmonary fibrosis by eliminating senescent cells in lung tissue.",
      date: "January 15, 2024",
      author: "Dr. Michael Rodriguez",
      image: "/placeholder.svg?key=qwkei",
      doi: "10.1096/fj.202302043R",
    },
    {
      id: 3,
      title: "The Flavonoid Procyanidin C1 Has Senotherapeutic Activity and Increases Lifespan in Mice",
      excerpt:
        "Landmark study published in Nature Metabolism that first demonstrated PCC1's ability to extend lifespan in mice by approximately 9.4% overall, with a 64.2% longer post-treatment lifespan when started in aged mice.",
      date: "December 10, 2021",
      author: "Dr. Emily Johnson",
      image: "/placeholder.svg?key=pxxer",
      doi: "10.1038/s42255-021-00491-8",
    },
    {
      id: 4,
      title: "Procyanidin C1 Inhibits Melanoma Cell Growth via Activation of the 67-kDa Laminin Receptor",
      excerpt:
        "Research showing PCC1's potential anticancer properties through a specific cellular signaling pathway, indicating benefits beyond direct senolytic effects.",
      date: "May 5, 2020",
      author: "Dr. James Wilson",
      image: "/placeholder.svg?key=n6fws",
      doi: "10.1021/acs.jafc.0c00289",
    },
    {
      id: 5,
      title: "Understanding the Molecular Structure of Procyanidin C1",
      excerpt:
        "An in-depth look at the unique trimeric structure of PCC1 composed of flavan-3-ol subunits and how it contributes to its biological activity.",
      date: "October 15, 2022",
      author: "Dr. Lisa Thompson",
      image: "/placeholder.svg?key=oklsd",
      doi: "10.1021/acs.jnatprod.2c00072",
    },
    {
      id: 6,
      title: "Vascular Endothelial Function is Influenced by Procyanidin Trimer C1",
      excerpt:
        "Research documenting PCC1's beneficial effects on vascular endothelial function, showing potential cardiovascular benefits beyond the senotherapeutic effects.",
      date: "November 12, 2014",
      author: "Dr. Robert Kim",
      image: "/placeholder.svg?key=7luc5",
      doi: "10.1089/jmf.2013.0179",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-teal-600" />
            <span className="text-lg font-light tracking-wide">Procyanidin Insights</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-light hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-light hover:underline underline-offset-4">
              Blog
            </Link>
            <Link href="/publications" className="text-sm font-light hover:underline underline-offset-4">
              Publications
            </Link>
            <Link href="/about" className="text-sm font-light hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/shop" className="text-sm font-light hover:underline underline-offset-4">
              Shop
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="font-light" asChild>
            <Link href="/shop">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Shop
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl">Procyanidin C1 Research</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
                  The latest studies, insights, and discoveries in the field of Procyanidin C1 science.
                </p>
              </div>
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
              {posts.map((post) => (
                <article key={post.id} className="group relative flex flex-col space-y-3">
                  <Link href={`/blog/${post.id}`} className="absolute inset-0 z-10" />
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={500}
                    height={300}
                    className="rounded-lg object-cover aspect-[16/9]"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-light">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <h2 className="text-lg font-light group-hover:text-teal-600 transition-colors">{post.title}</h2>
                    <p className="text-sm text-gray-500 font-light line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500 font-light">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="text-xs text-gray-500 font-light">DOI: {post.doi}</div>
                    </div>
                    <div className="flex items-center text-teal-600 text-sm group-hover:underline font-light">
                      Read more <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

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
            <div className="space-y-2">
              <h4 className="text-sm font-light">Navigation</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-900 font-light">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-500 hover:text-gray-900 font-light">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/publications" className="text-gray-500 hover:text-gray-900 font-light">
                    Publications
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-500 hover:text-gray-900 font-light">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-gray-500 hover:text-gray-900 font-light">
                    Shop
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-light">Resources</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link href="/publications" className="text-gray-500 hover:text-gray-900 font-light">
                    Publications
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-900 font-light">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-light">Contact</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-900 font-light">
                    Contact Us
                  </Link>
                </li>
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
    </div>
  )
}
