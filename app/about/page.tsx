import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Microscope, FileText, BookOpen, ShoppingCart } from "lucide-react"

export default function AboutPage() {
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
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-xs text-teal-800 font-light">
                  About
                </div>
                <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl">Procyanidin Insights</h1>
                <p className="text-gray-500 text-sm md:text-base font-light">
                  A scientific blog dedicated to exploring the research and applications of Procyanidin C1, a powerful
                  senolytic complex.
                </p>
              </div>
              <div className="mx-auto lg:ml-auto">
                <Image
                  src="/placeholder.svg?key=80412"
                  alt="Procyanidin C1 Research"
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
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Our Mission</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
                  To provide accurate, up-to-date information on Procyanidin C1 research and its implications for health
                  and longevity.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-8 lg:grid-cols-2 lg:gap-10">
              <Image
                src="/scientific-journal.png"
                alt="Scientific Publications"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-lg object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-4">
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-teal-600" />
                        <h3 className="text-lg font-light">Research Focus</h3>
                      </div>
                      <p className="text-sm text-gray-500 font-light">
                        We focus on the latest scientific discoveries related to Procyanidin C1, a trimeric procyanidin
                        with remarkable senolytic and senomorphic properties that has shown potential to extend lifespan
                        and improve health in aging models.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-teal-600" />
                        <h3 className="text-lg font-light">Scientific Accuracy</h3>
                      </div>
                      <p className="text-sm text-gray-500 font-light">
                        All content is based on peer-reviewed research published in respected scientific journals. We
                        strive to present complex scientific information in an accessible way without compromising
                        accuracy.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">What is Procyanidin C1?</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
                  A brief overview of this remarkable compound and its potential.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-6">
              <div className="prose prose-gray max-w-none dark:prose-invert prose-p:text-sm prose-p:font-light prose-headings:font-light">
                <p>
                  Procyanidins are a class of polyphenol compounds composed of flavan-3-ol subunits (such as catechins
                  and epicatechins) linked together. They are abundant in many plant-based foods including grape seeds,
                  apples, cinnamon, and cocoa, making them natural components of the human diet for thousands of years.
                </p>
                <p>
                  Procyanidin C1 (PCC1) is a specific type of trimeric procyanidin with remarkable health properties.
                  Research published in Nature Metabolism (2021) demonstrated that PCC1 has potent effects on cellular
                  aging through two key mechanisms: senolytic and senomorphic activity.
                </p>
                <h3 className="text-lg">Understanding Senolytic & Senomorphic Activity</h3>
                <p>
                  <strong>Senolytic:</strong> Senolytics are compounds that can selectively eliminate senescent cells
                  (aging "zombie" cells) through programmed cell death while sparing healthy cells. This helps remove
                  harmful cells that secrete inflammatory compounds.
                </p>
                <p>
                  <strong>Senomorphic:</strong> Senomorphics don't kill senescent cells but instead modify their
                  behavior to reduce the harmful inflammatory signals they produce (the Senescence-Associated Secretory
                  Phenotype or SASP), decreasing their negative impact on surrounding tissues.
                </p>
                <h3 className="text-lg">Mechanism of Action</h3>
                <p>PCC1 works through several biological pathways to support cellular health:</p>
                <ul className="text-sm font-light">
                  <li>Selective elimination of senescent cells</li>
                  <li>Inhibition of PI3K/AKT pathway in senescent cells</li>
                  <li>Reduction of inflammatory compounds (IL-6, IL-8, TGF-β)</li>
                  <li>Antioxidant activity combating oxidative stress</li>
                </ul>
                <p>
                  The 2021 Nature Metabolism study showed that PCC1 was more effective than other senolytics in some
                  contexts. Animals treated with PCC1 demonstrated significantly improved physical function and
                  increased median lifespan. Most remarkably, when looking at mice that were already 24 months old
                  (equivalent to a ~70-year-old human), their remaining lifespan was extended by over 60% compared to
                  controls.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Key Research</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 text-sm md:text-base font-light">
                  Significant studies on Procyanidin C1 and its effects.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-6 md:grid-cols-2">
              {[
                {
                  title: "The flavonoid procyanidin C1 has senotherapeutic activity and increases lifespan in mice",
                  authors: "Xu et al.",
                  journal: "Nature Metabolism",
                  year: "2021",
                  doi: "10.1038/s42255-021-00491-8",
                  description:
                    "The landmark study that first demonstrated PCC1's ability to extend lifespan in mice by approximately 9.4% overall, with a 64.2% longer post-treatment lifespan when started in aged mice.",
                },
                {
                  title: "Senolytic flavonoid procyanidin C1 rejuvenates retinal function in aging mice",
                  authors: "Liu et al.",
                  journal: "PNAS",
                  year: "2024",
                  doi: "10.1073/pnas.2312270121",
                  description:
                    "Recent study demonstrating that PCC1 can rejuvenate retinal function in aging mice by targeting senescent cells in the retina.",
                },
                {
                  title: "Procyanidin C1 attenuates pulmonary fibrosis by selectively eliminating senescent cells",
                  authors: "Shao et al.",
                  journal: "The FASEB Journal",
                  year: "2024",
                  doi: "10.1096/fj.202302043R",
                  description:
                    "Research showing that PCC1's senolytic properties can reduce pulmonary fibrosis by eliminating senescent cells in lung tissue.",
                },
                {
                  title: "Vascular endothelial function is influenced by procyanidin trimer C1 from grape seeds",
                  authors: "Park et al.",
                  journal: "Journal of Medicinal Food",
                  year: "2014",
                  doi: "10.1089/jmf.2013.0179",
                  description:
                    "Earlier research documenting PCC1's beneficial effects on vascular endothelial function, showing potential cardiovascular benefits.",
                },
              ].map((paper, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <h3 className="mb-1 text-lg font-light">{paper.title}</h3>
                  <p className="text-xs text-gray-500 font-light mb-2">
                    {paper.authors} • {paper.journal} • {paper.year}
                  </p>
                  <p className="text-sm text-gray-500 font-light mb-3">{paper.description}</p>
                  <div className="flex items-center justify-between">
                    \
