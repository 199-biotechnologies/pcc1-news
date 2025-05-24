import { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle, HeartPulse, ShieldCheck, Activity, TrendingUp, Microscope, Leaf, Beaker, Target, Grape, Apple, Sprout, Coffee, Bean } from 'lucide-react';
import { PageContainer, Section, PageHeader } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "The Science of PCC1 | PCC1.news",
  description: "A comprehensive overview of the research, mechanisms, and potential of Procyanidin C1 (PCC1) in healthspan and longevity.",
};

export default function SciencePage() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <Section background="gradient" className="py-12 md:py-16">
        <PageHeader
          title="The Science of Procyanidin C1 (PCC1)"
          description="A comprehensive overview of the research, mechanisms, and potential of PCC1 in healthspan and longevity."
          tag="Science"
        />
      </Section>

        {/* What is PCC1 Section */}
        <Section>
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl text-center mb-8">What is Procyanidin C1?</h2>
              <p>
                Procyanidin C1 (PCC1) is a natural polyphenolic compound classified as a B-type proanthocyanidin. It's specifically a trimer consisting of three epicatechin molecules linked together (epicatechin-(4β-8)-epicatechin-(4β-8)-epicatechin). As a member of the flavonoid superfamily, PCC1 has a complex molecular structure (C<sub>45</sub>H<sub>38</sub>O<sub>18</sub>) that contributes to its unique biological properties.
              </p>
              <p>
                PCC1 is found naturally in several plant sources:
              </p>
              
              {/* Natural Sources Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-6">
                <div className="bg-white border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <Grape className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-light">Grape Seeds & GSE</p>
                </div>
                <div className="bg-white border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <Apple className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-light">Unripe Apples</p>
                </div>
                <div className="bg-white border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <Sprout className="h-8 w-8 text-amber-700 mx-auto mb-2" />
                  <p className="text-sm font-light">Cinnamon</p>
                </div>
                <div className="bg-white border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <Coffee className="h-8 w-8 text-amber-900 mx-auto mb-2" />
                  <p className="text-sm font-light">Cocoa Beans</p>
                </div>
                <div className="bg-white border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <Bean className="h-8 w-8 text-gray-800 mx-auto mb-2" />
                  <p className="text-sm font-light">Black Soybean</p>
                </div>
              </div>
              <p>
                While procyanidins in general have been studied for their antioxidant properties, PCC1 has emerged as particularly noteworthy for its powerful effects on senescent cells and potential impact on aging processes.
              </p>

              <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl mt-8">Dual Mechanism of Action</h2>
              <p>
                What makes PCC1 especially interesting is its dual mode of action on senescent cells, functioning as both a senolytic and senomorphic agent:
              </p>

              <div className="bg-teal-50 p-4 rounded-lg my-4">
                <h3 className="text-lg font-light text-teal-800">Senolytic Activity</h3>
                <p className="text-sm text-gray-700">
                  At higher concentrations, PCC1 acts as a senolytic agent, selectively eliminating senescent cells through programmed cell death (apoptosis) while sparing healthy cells.
                </p>
              </div>

              <div className="bg-cyan-50 p-4 rounded-lg my-4">
                <h3 className="text-lg font-light text-cyan-800">Senomorphic Effects</h3>
                <p className="text-sm text-gray-700">
                  At lower concentrations, PCC1 functions as a senomorphic agent, modifying the behavior of senescent cells to reduce their harmful secretions (the senescence-associated secretory phenotype or SASP).
                </p>
              </div>

              <p>
                This dual functionality gives PCC1 an advantage over many other senotherapeutic compounds that typically only target one of these pathways. The ability to both modify and eliminate senescent cells allows for a more comprehensive approach to addressing age-related cellular damage.
              </p>
            </div>
        </Section>

        {/* Molecular Mechanisms Section */}
        <Section background="light" className="py-12 md:py-16">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl text-center">Molecular Mechanisms</h2>
              <p className="text-gray-600 text-sm md:text-base font-light text-center">
                PCC1 affects multiple cellular pathways to target senescent cells
              </p>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-800 mb-3 mx-auto">
                    <Target className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-light text-center">Selective Targeting</h3>
                  <p className="text-sm text-gray-600 text-center font-light">
                    Targets senescent cells' depolarized plasma membranes and elevated H+ concentrations, making them more susceptible to PCC1 action than healthy cells.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-800 mb-3 mx-auto">
                    <Beaker className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-light text-center">Mitochondrial Pathway</h3>
                  <p className="text-sm text-gray-600 text-center font-light">
                    Impairs mitochondrial membrane potential (Δψm) and increases reactive oxygen species (ROS) production in senescent cells, triggering apoptosis.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-800 mb-3 mx-auto">
                    <Microscope className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-light text-center">Pro-apoptotic Factors</h3>
                  <p className="text-sm text-gray-600 text-center font-light">
                    Upregulates expression of pro-apoptotic factors NOXA and PUMA, which critically promote senescent cell death.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-800 mb-3 mx-auto">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-light text-center">Signaling Pathways</h3>
                  <p className="text-sm text-gray-600 text-center font-light">
                    Modulates AKT kinase, JAK1/2, and p38 MAPK signaling pathways involved in senescent cell maintenance and survival.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-light mb-2">Broad Spectrum Activity</h3>
                <p className="text-sm text-gray-600 font-light">
                  Unlike many other senolytic compounds that only work on specific cell types, PCC1 demonstrates efficacy against senescent cells from multiple origins, including:
                </p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>Human stromal cells and fibroblasts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>Human umbilical vein endothelial cells (HUVECs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>Mesenchymal stem cells (MSCs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>Cells made senescent by various stressors (replication, oncogenes, radiation, chemotherapy)</span>
                  </li>
                </ul>
                <p className="mt-3 text-sm text-gray-600 font-light">
                  This broad spectrum activity makes PCC1 especially promising compared to more selective senolytics like fisetin, dasatinib, or ABT-263.
                </p>
              </div>
            </div>
        </Section>

        {/* Key Lifespan Study Section */}
        <Section className="py-12 md:py-16">
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
                    height={300}
                    className="mx-auto overflow-hidden rounded-lg object-contain border"
                  />
                  <p className="text-xs text-gray-600 text-center font-light">
                    Fig 1a: Survival curves of aged mice (24-27 months old) treated with PCC1 or vehicle control. The blue line represents PCC1-treated mice and shows significantly improved survival compared to controls (black line).
                  </p>
                </div>
                {/* Figure B */}
                <div className="space-y-2">
                  <Image
                    src="/pcc1-figure-b.png"
                    alt="Mortality hazard graph for PCC1 treatment"
                    width={500}
                    height={300}
                    className="mx-auto overflow-hidden rounded-lg object-contain border"
                  />
                  <p className="text-xs text-gray-600 text-center font-light">
                    Fig 1b: Mortality hazard analysis showing 65% reduction in mortality risk with biweekly PCC1 administration compared to the control group.
                  </p>
                </div>
              </div>

              {/* Key Finding Text */}
              <div className="space-y-2 pt-4">
                <h3 className="text-lg font-light">Key Finding:</h3>
                <p className="text-sm text-gray-600 font-light">
                  In the landmark 2021 Nature Metabolism study, mice receiving PCC1 administration (once every two weeks) starting at 24–27 months of age (roughly equivalent to 75–90 years in humans) had a 64.2% longer median post-treatment lifespan (or 9.4% longer overall lifespan) and lower mortality hazard (65.0%, P &lt; 0.0001) than the vehicle-treated group, as shown in the figures above.
                </p>
                <p className="text-sm text-gray-600 font-light">
                  This is particularly significant because the intervention was started very late in life and still produced substantial benefits, suggesting that even elderly individuals might benefit from PCC1 administration.
                </p>
              </div>
            </div>
        </Section>

        {/* Tissue-Specific Effects Section */}
        <Section background="light" className="py-12 md:py-16">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl text-center">Tissue-Specific Rejuvenation</h2>
              <p className="text-gray-600 text-sm md:text-base font-light text-center">
                Recent research has identified specific tissues and systems that benefit from PCC1 treatment
              </p>
              
              <div className="grid gap-6 md:grid-cols-2 mt-8">
                <div className="bg-white p-5 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-light mb-3">Retinal Function</h3>
                  <p className="text-sm text-gray-600 font-light">
                    A 2024 PNAS study demonstrated that PCC1 alleviates structural and functional decline in the aged retina. Through high-throughput single-cell RNA sequencing, researchers showed that PCC1 treatment:
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-600 font-light">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 text-lg leading-none">•</span>
                      <span>Reduced accumulation of senescent cells in retinal tissue</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 text-lg leading-none">•</span>
                      <span>Decreased inflammatory secretory factors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 text-lg leading-none">•</span>
                      <span>Improved visual function in aged mice</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-light mb-3">Immune System Rejuvenation</h3>
                  <p className="text-sm text-gray-600 font-light">
                    A 2025 study in npj Aging revealed that long-term PCC1 treatment has geroprotective effects on the hematopoietic and immune system (HIS), including:
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-600 font-light">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 text-lg leading-none">•</span>
                      <span>Increased proportions of B cells and hematopoietic stem cells</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 text-lg leading-none">•</span>
                      <span>Suppression of senescence-associated markers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 text-lg leading-none">•</span>
                      <span>Restoration of normal immune processes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 text-lg leading-none">•</span>
                      <span>Improved grip strength in aged mice</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border mt-6">
                <h3 className="text-lg font-light mb-3">Tumor Microenvironment</h3>
                <p className="text-sm text-gray-600 font-light">
                  Beyond its direct effects on aging, PCC1 shows promise in cancer treatment by depleting senescent cells in the treatment-damaged tumor microenvironment (TME). Research has shown that PCC1:
                </p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>Enhances therapeutic efficacy when combined with chemotherapy in preclinical assays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>Reduces treatment-induced inflammation that can promote tumor growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>Potentially helps overcome treatment resistance in cancer therapy</span>
                  </li>
                </ul>
              </div>
            </div>
        </Section>

        {/* Human-Relevant Research Section */}
        <Section className="py-12 md:py-16">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl text-center">Human-Relevant Research & Bioavailability</h2>
              <p className="text-gray-600 text-sm md:text-base font-light text-center">
                Unlike many experimental compounds, procyanidins have a long history of human consumption and safety studies.
              </p>
              
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-light">Natural Sources & Safety Profile</h3>
                <p className="text-sm text-gray-600 font-light">
                  Procyanidin C1 is naturally present in foods like grape seeds, apples, cocoa, and cinnamon. Procyanidins in general are known to be non-toxic and non-carcinogenic with a long history of human consumption. While direct clinical trials of purified PCC1 in humans are still needed, the compound's presence in common foods suggests a favorable safety profile.
                </p>

                <h3 className="text-lg font-light pt-4">Bioavailability Considerations</h3>
                <p className="text-sm text-gray-600 font-light">
                  One challenge with PCC1 is its bioavailability. As a trimeric procyanidin, its absorption is lower than that of monomeric flavonoids like epicatechin. Studies show that after oral administration:
                </p>
                <ul className="space-y-2 text-sm text-gray-600 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>A portion of PCC1 can be absorbed from the small intestine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>In plasma, absorbed procyanidins exist mainly as conjugates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 text-lg leading-none">•</span>
                    <span>In tissues, PCC1 distributes widely, primarily in its free form</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 font-light pt-2">
                  Future pharmaceutical development may focus on enhancing PCC1 delivery systems to improve its bioavailability and efficacy in humans.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-light">Demonstrated Benefits</h3>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start gap-3">
                    <Activity className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-light">Improved physical function in aged animal models, including increased grip strength and mobility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HeartPulse className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-light">Enhanced cardiovascular parameters and reduced markers of cardiovascular aging</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-light">Reduced biomarkers of inflammation (IL-6, IL-8, TNF-α) that typically increase with age</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-light">Improved cellular stress resistance and reduced oxidative damage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-light">Extended post-treatment lifespan in aged animals by approximately 64% (and overall lifespan by 9.4%)</span>
                  </li>
                </ul>
              </div>
            </div>
        </Section>

        {/* Future Research Section */}
        <Section background="light" className="py-12 md:py-16">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl text-center">Future Research Directions</h2>
              <p className="text-gray-600 text-sm md:text-base font-light text-center">
                While PCC1 shows remarkable promise as a senotherapeutic agent, several areas of research are still developing:
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
                <ol className="space-y-4 text-sm text-gray-600 font-light list-decimal pl-5">
                  <li>
                    <span className="font-medium text-gray-700">Human Clinical Trials:</span> Initial clinical trials to establish safety, dosage, and efficacy of PCC1 in humans are a critical next step.
                  </li>
                  <li>
                    <span className="font-medium text-gray-700">Improved Delivery Methods:</span> Developing enhanced delivery systems to improve the bioavailability of PCC1 and optimize its therapeutic effects.
                  </li>
                  <li>
                    <span className="font-medium text-gray-700">Dosing Protocols:</span> Research suggests intermittent rather than continuous administration may be most effective, but optimal dosing schedules need further investigation.
                  </li>
                  <li>
                    <span className="font-medium text-gray-700">Combination Therapies:</span> Exploring how PCC1 might work synergistically with other senotherapeutic or longevity-promoting compounds.
                  </li>
                  <li>
                    <span className="font-medium text-gray-700">Disease-Specific Applications:</span> Investigating PCC1's potential in specific age-related diseases like Alzheimer's, cardiovascular disease, and diabetes.
                  </li>
                </ol>
                <p className="mt-4 text-sm text-gray-600 font-light">
                  Given that procyanidins have a long history of use in clinics and their side effects can be monitored and managed, researchers are optimistic that PCC1 could be successfully developed as a novel senolytic agent for clinical applications.
                </p>
              </div>
            </div>
        </Section>

    </PageContainer>
  )
}