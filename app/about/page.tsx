import { ContactForm } from "@/components/contact-form";
import ReactMarkdown from 'react-markdown'; // Import Markdown renderer
import remarkGfm from 'remark-gfm'; // Import GFM plugin

export default function AboutPage() {
  const about199GroupContent = `
### About the 199 Group

pcc1.news is part of the **199 group of companies**, founded by Boris Djordjevic to accelerate translational longevity science and extend the frontiers of human health. The group includes:

*   **199 Biotechnologies:** Working on partial reprogramming to tackle cellular aging and address diseases like glioblastoma.
*   **199 Clinic:** An integrative longevity clinic offering personalized care and concierge health services.
*   **199 Diagnostics:** Making advanced diagnostic technology accessible, measuring key aging markers like NAD metabolism and environmental toxins.
*   **199 Health:** Developing scientifically validated supplements, including Procyanidin C1 (PCC1), with novel delivery methods.
`;

  return (
    <>
      <main className="flex-1">
        {/* Centered Hero Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6 text-center"> {/* Added text-center */}
            <div className="max-w-3xl mx-auto space-y-3"> {/* Centering container */}
              <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-xs text-teal-800 font-light">
                About
              </div>
              <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl">PCC1.news</h1>
              <p className="text-gray-500 text-sm md:text-base font-light">
                Your independent source for curated news, research summaries, and discussions focused on Procyanidin C1 (PCC1) and its role in healthspan and longevity science. We aim to provide clear, accessible information based on the latest scientific findings.
              </p>
            </div>
          </div>
        </section>

        {/* Two-Column Contact Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-start"> {/* Changed to items-start */}
              {/* Left Column: Text */}
              <div className="space-y-4">
                <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl">Contact Us</h2>
                <p className="text-gray-500 text-sm md:text-base font-light">
                  For support or inquiries, please email us at <a href="mailto:support@pcc1.news" className="text-teal-600 hover:underline">support@pcc1.news</a> or use the form below.
                </p>
              </div>
              {/* Right Column: Form */}
              <div className="w-full"> {/* Container for the form */}
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* New "About 199 Group" Section */}
        <section className="w-full py-12 md:py-16 bg-gray-50"> {/* Added background for separation */}
          <div className="container px-4 md:px-6">
             {/* Apply prose styles for markdown rendering */}
             <article className="prose prose-gray max-w-3xl mx-auto dark:prose-invert prose-p:font-light prose-headings:font-light prose-h3:font-light prose-h3:text-xl prose-ul:font-light prose-li:font-light prose-strong:font-semibold">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {about199GroupContent}
                </ReactMarkdown>
             </article>
          </div>
        </section>

      </main>
    </>
  )
}
