import { Metadata } from 'next';
import Image from 'next/image'; // Import Next.js Image component
import Link from "next/link"; // Keep Link for potential future use
import { CheckCircle, HeartPulse, ShieldCheck, Activity, TrendingUp } from 'lucide-react'; // Import icons for benefits list

export const metadata: Metadata = {
  title: "The Science of PCC1 | PCC1.news",
  description: "A comprehensive overview of the research, mechanisms, and potential of Procyanidin C1 (PCC1) in healthspan and longevity.",
};

export default function SciencePage() {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-3">
              <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-xs text-teal-800 font-light">
                Science
              </div>
              <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl">The Science of Procyanidin C1 (PCC1)</h1>
              <p className="text-gray-500 text-sm md:text-base font-light">
                A comprehensive overview of the research, mechanisms, and potential of PCC1 in healthspan and longevity.
              </p>
            </div>
          </div>
        </section>

        {/* Placeholder for Comprehensive Review Content & Intro */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <article className="prose prose-lg prose-gray max-w-3xl mx-auto dark:prose-invert prose-p:font-light prose-headings:font-light">
              <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Comprehensive Review</h2>
              {/* Intro Paragraph */}
              <p>
                The 2021 Nature Metabolism study showed that PCC1 was more effective than other senolytics in some contexts. Animals treated with PCC1 demonstrated significantly improved physical function and increased median lifespan. Most remarkably, when looking at mice that were already 24 months old (equivalent to a ~70-year-old human), their remaining lifespan was extended by over 60% compared to controls.
              </p>
              <p>
                Further detailed scientific review content will be added here. This section will cover mechanisms of action, key studies, potential applications, and ongoing research related to PCC1.
              </p>
              {/* TODO: Add detailed content */}
            </article>
          </div>
        </section>

        {/* Key Lifespan Study Section */}
        <section className="w-full py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl text-center">Key Lifespan Extension Study</h2>

              {/* Figures Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Figure A */}
                <div className="space-y-2">
                  <Image
                    src="/pcc1-figure-a.png"
                    alt="Lifespan curve showing PCC1 vs control group"
                    width={500}
                    height={300} // Adjust height as needed based on image aspect ratio
                    className="mx-auto overflow-hidden rounded-lg object-contain border" // Use object-contain and add border
                  />
                  <p className="text-xs text-gray-500 text-center font-light">
                    Fig 1a: Survival curves of aged mice (24-27 months old) treated with PCC1 or vehicle control. The blue line represents PCC1-treated mice and shows significantly improved survival compared to controls (black line).
                  </p>
                </div>
                {/* Figure B */}
                <div className="space-y-2">
                  <Image
                    src="/pcc1-figure-b.png"
                    alt="Mortality hazard graph for PCC1 treatment"
                    width={500}
                    height={300} // Adjust height as needed
                    className="mx-auto overflow-hidden rounded-lg object-contain border" // Use object-contain and add border
                  />
                  <p className="text-xs text-gray-500 text-center font-light">
                    Fig 1b: Mortality hazard analysis showing 65% reduction in mortality risk with biweekly PCC1 administration compared to the control group.
                  </p>
                </div>
              </div>

              {/* Key Finding Text */}
              <div className="space-y-2 pt-4">
                <h3 className="text-lg font-light">Key Finding:</h3>
                <p className="text-sm text-gray-500 font-light">
                  Mice receiving PCC1 administration (once every two weeks or biweekly) starting at 24–27 months of age (roughly equivalent to an age of 75–90 years in humans) had a 64.2% longer median post-treatment lifespan (or 9.4% longer overall lifespan) and lower mortality hazard (65.0%, P &lt; 0.0001) than the vehicle-treated group, as shown in the figures above.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Human-Relevant Research Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl text-center">Human-Relevant Research & Benefits</h2>
              <p className="text-gray-500 text-sm md:text-base font-light text-center">
                Unlike many experimental compounds, procyanidins have a long history of human consumption and safety. Research has demonstrated several concrete benefits of PCC1:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-light">Improved physical function in aged animal models</span>
                </li>
                <li className="flex items-start gap-3">
                  <HeartPulse className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-light">Enhanced cardiovascular parameters</span>
                </li>
                 <li className="flex items-start gap-3">
                   <ShieldCheck className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                   <span className="text-sm text-gray-700 font-light">Reduced biomarkers of inflammation (IL-6, IL-8, TNF-α)</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                   <span className="text-sm text-gray-700 font-light">Improved cellular stress resistance</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <TrendingUp className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                   <span className="text-sm text-gray-700 font-light">Extended lifespan in animal models by approximately 9-11%</span>
                 </li>
              </ul>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}