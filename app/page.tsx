import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Microscope, BookOpen, Users } from "lucide-react"

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-xs text-teal-800 font-light">
                  Scientific Research
                </div>
                <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl md:text-5xl">
                  Unlocking the Power of Procyanidin C1
                </h1>
                <p className="text-gray-500 md:text-lg/relaxed font-light">
                  Exploring the senolytic complex that extends lifespan and combats cellular aging.
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
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">The Science of PCC1</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
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
                <p className="text-sm text-gray-500 text-center font-light">
                  Selectively eliminates senescent "zombie" cells while sparing healthy cells, reducing harmful
                  inflammatory compounds.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-800 mb-3 mx-auto">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-light text-center">Senomorphic Effects</h3>
                <p className="text-sm text-gray-500 text-center font-light">
                  Modifies senescent cell behavior to reduce harmful inflammatory signals (SASP), decreasing negative
                  impact on tissues.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-800 mb-3 mx-auto">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-light text-center">Lifespan Extension</h3>
                <p className="text-sm text-gray-500 text-center font-light">
                  Research shows PCC1 extended median post-treatment lifespan by 64.2% in aged mice, equivalent to
                  humans 75-90 years old.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            {/* Adjusted grid to single column */}
            <div className="grid gap-8 px-6 md:gap-12">
              <div className="space-y-3 lg:col-span-1"> {/* Ensure it spans correctly */}
                <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-xs text-teal-800 font-light">
                  Key Research
                </div>
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Mechanism of Action</h2>
                <p className="text-gray-500 text-sm md:text-base font-light">
                  PCC1 works through several biological pathways to support cellular health:
                </p>
                <ul className="space-y-2 text-sm text-gray-500 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>Inhibition of PI3K/AKT pathway in senescent cells</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>Reduction of inflammatory compounds (IL-6, IL-8, TGF-β)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>Antioxidant activity combating oxidative stress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>Improved physical function and cardiovascular parameters</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-2">
                  <Button size="sm" className="font-light" asChild>
                    <Link href="/research">
                      View Research <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
              {/* Right column removed - content moved to /science page */}
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Recent Research</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
                  The latest studies exploring Procyanidin C1's effects on aging and age-related conditions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-8 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                <Link href="/blog/retinal-function" className="absolute inset-0 z-10" />
                <div className="p-4">
                  <div className="mb-3 text-xs text-gray-500 font-light">February 20, 2024</div>
                  <h3 className="mb-2 text-lg font-light">PCC1 Rejuvenates Retinal Function in Aging Mice</h3>
                  <p className="mb-3 text-sm text-gray-500 font-light">
                    Recent PNAS study shows PCC1 can rejuvenate retinal function by targeting senescent cells in the
                    retina.
                  </p>
                  <div className="flex items-center text-teal-600 text-sm group-hover:underline font-light">
                    Read more <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                <Link href="/blog/pulmonary-fibrosis" className="absolute inset-0 z-10" />
                <div className="p-4">
                  <div className="mb-3 text-xs text-gray-500 font-light">January 15, 2024</div>
                  <h3 className="mb-2 text-lg font-light">PCC1 Attenuates Pulmonary Fibrosis</h3>
                  <p className="mb-3 text-sm text-gray-500 font-light">
                    FASEB Journal research demonstrates PCC1's ability to reduce pulmonary fibrosis by eliminating
                    senescent cells.
                  </p>
                  <div className="flex items-center text-teal-600 text-sm group-hover:underline font-light">
                    Read more <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                <Link href="/blog/nature-metabolism-study" className="absolute inset-0 z-10" />
                <div className="p-4">
                  <div className="mb-3 text-xs text-gray-500 font-light">December 10, 2021</div>
                  <h3 className="mb-2 text-lg font-light">Landmark Study: PCC1 Increases Lifespan in Mice</h3>
                  <p className="mb-3 text-sm text-gray-500 font-light">
                    Nature Metabolism publication demonstrates PCC1's senotherapeutic activity and lifespan extension
                    effects.
                  </p>
                  <div className="flex items-center text-teal-600 text-sm group-hover:underline font-light">
                    Read more <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="sm" className="font-light" asChild>
                <Link href="/blog">View All Articles</Link>
              </Button>
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
    </>
  )
}
