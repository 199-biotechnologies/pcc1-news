import Link from "next/link"; // Keep Link for potential future use

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
              {/* Add more introductory content or call-to-action if needed */}
            </div>
          </div>
        </section>

        {/* Placeholder for Comprehensive Review Content */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <article className="prose prose-lg prose-gray max-w-3xl mx-auto dark:prose-invert prose-p:font-light prose-headings:font-light">
              <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Comprehensive Review</h2>
              <p>
                Detailed scientific review content will be added here. This section will cover mechanisms of action, key studies, potential applications, and ongoing research related to PCC1.
              </p>
              {/* TODO: Add detailed content */}
            </article>
          </div>
        </section>

      </main>
    </>
  )
}