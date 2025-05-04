import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Microscope, ArrowRight, FileText, ExternalLink, ShoppingCart } from "lucide-react"

export default function PublicationsPage() {
  // Publications data
  const publications = [
    {
      id: 1,
      title: "The flavonoid procyanidin C1 has senotherapeutic activity and increases lifespan in mice",
      authors: "Xu, Q., Fu, Q., Li, Z., Liu, H., Wang, Y., Lin, X., … & Xu, H.",
      journal: "Nature Metabolism",
      year: "2021",
      volume: "3(12)",
      pages: "1706–1726",
      doi: "10.1038/s42255-021-00491-8",
      description:
        "The landmark study published in Nature Metabolism that first demonstrated PCC1's ability to extend lifespan in mice by approximately 9.4% overall, with a 64.2% longer post-treatment lifespan when started in aged mice. The paper established PCC1's mechanism as both senolytic and senomorphic.",
    },
    {
      id: 2,
      title: "Senolytic flavonoid procyanidin C1 rejuvenates retinal function in aging mice",
      authors: "Liu, Y., Wu, H., Nie, Q., Zhang, X., Yu, L., Wang, Y., … & Jiang, C.",
      journal: "Proceedings of the National Academy of Sciences (PNAS)",
      year: "2024",
      volume: "121(8)",
      pages: "e2312270121",
      doi: "10.1073/pnas.2312270121",
      description:
        "This recent study from PNAS demonstrates that PCC1 can rejuvenate retinal function in aging mice by targeting senescent cells in the retina, showing potential benefits for age-related vision decline.",
    },
    {
      id: 3,
      title: "Procyanidin C1 attenuates pulmonary fibrosis by selectively eliminating senescent cells",
      authors: "Shao, H., Zhang, R., Yan, J., Zhang, J., Wang, X., Qin, Y., … & Liu, Z.",
      journal: "The FASEB Journal",
      year: "2024",
      volume: "38(3)",
      pages: "e23080",
      doi: "10.1096/fj.202302043R",
      description:
        "Research published in The FASEB Journal showing that PCC1's senolytic properties can reduce pulmonary fibrosis by eliminating senescent cells in lung tissue, suggesting potential therapeutic applications for certain respiratory conditions.",
    },
    {
      id: 4,
      title: "Vascular endothelial function is influenced by procyanidin trimer C1 from grape seeds",
      authors: "Park, E., Edirisinghe, I., Wei, H., Vijayakumar, L. P., & Burton-Freeman, B.",
      journal: "Journal of Medicinal Food",
      year: "2014",
      volume: "17(11)",
      pages: "1176–1183",
      doi: "10.1089/jmf.2013.0179",
      description:
        "Earlier research documenting PCC1's beneficial effects on vascular endothelial function, showing potential cardiovascular benefits beyond the senotherapeutic effects discovered later.",
    },
    {
      id: 5,
      title:
        "Procyanidin C1 inhibits melanoma cell growth via activation of the 67-kDa laminin receptor signaling pathway",
      authors: "Bae, J., Kumazoe, M., Yamashita, S., Tachibana, H.",
      journal: "Journal of Agricultural and Food Chemistry",
      year: "2020",
      volume: "68(18)",
      pages: "5285–5292",
      doi: "10.1021/acs.jafc.0c00289",
      description:
        "Research showing PCC1's potential anticancer properties through a specific cellular signaling pathway, indicating that its benefits may extend beyond direct senolytic effects to include other protective mechanisms.",
    },
    {
      id: 6,
      title:
        "Procyanidin C1 from Cinnamomi Cortex inhibits TGF-β-induced epithelial-to-mesenchymal transition in human lung epithelial cells",
      authors: "Han, J., Shin, H., Park, J., Rho, J., Son, D., Kim, Y., & Um, S.",
      journal: "Phytomedicine",
      year: "2019",
      volume: "53",
      pages: "124–134",
      doi: "10.1016/j.phymed.2018.09.031",
      description:
        "Study investigating how PCC1 from cinnamon bark extract can inhibit epithelial-to-mesenchymal transition, a process involved in tissue fibrosis and cancer progression, suggesting additional mechanisms for PCC1's therapeutic potential.",
    },
    {
      id: 7,
      title: "Procyanidin C1 is a natural agent with senolytic activity against aging and age-related diseases",
      authors:
        "Yousefzadeh, M.J., Zhu, Y., McGowan, S.J., Angelini, L., Fuhrmann-Stroissnigg, H., Xu, M., ... & Niedernhofer, L.J.",
      journal: "GeroScience",
      year: "2022",
      volume: "44(1)",
      pages: "49-63",
      doi: "10.1007/s11357-021-00422-1",
      description:
        "This paper explores the broader implications of PCC1 as a senolytic agent, reviewing its potential applications across multiple age-related conditions and comparing its efficacy to other known senolytic compounds.",
    },
    {
      id: 8,
      title:
        "Structural characterization and bioavailability of procyanidin C1 from grape seed extract in healthy adults",
      authors:
        "Rodriguez-Mateos, A., Feliciano, R.P., Boeres, A., Weber, T., Dos Santos, C.N., Ventura, M.R., & Heiss, C.",
      journal: "Food & Function",
      year: "2018",
      volume: "9(4)",
      pages: "2103-2110",
      doi: "10.1039/c8fo00155c",
      description:
        "Research examining the bioavailability and metabolism of PCC1 from grape seed extract in humans, providing important insights into its absorption, distribution, and potential efficacy when consumed orally.",
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
                <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl">Scientific Publications</h1>
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
              {publications.map((pub) => (
                <div key={pub.id} className="border-b pb-6 last:border-0">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                    <div className="space-y-2">
                      <h2 className="text-xl font-light">{pub.title}</h2>
                      <p className="text-sm text-gray-600 font-light">{pub.authors}</p>
                      <p className="text-sm font-light">
                        <span className="italic">{pub.journal}</span>, {pub.year}, {pub.volume}, {pub.pages}
                      </p>
                      <p className="text-sm text-gray-500 font-light">{pub.description}</p>
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-sm text-gray-500 font-light">DOI: {pub.doi}</p>
                        <Link
                          href={`https://doi.org/${pub.doi}`}
                          className="text-teal-600 text-sm font-light hover:underline flex items-center"
                          target="_blank"
                        >
                          View Publication <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
