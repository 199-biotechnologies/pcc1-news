import { ContactForm } from "@/components/contact-form";

export default function AboutPage() {
  return (
    <>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-xs text-teal-800 font-light">
                  About
                </div>
                <h1 className="text-3xl font-extralight tracking-tight sm:text-4xl">PCC1.news</h1>
                <p className="text-gray-500 text-sm md:text-base font-light">
                  Your independent source for curated news, research summaries, and discussions focused on Procyanidin C1 (PCC1) and its role in healthspan and longevity science. We aim to provide clear, accessible information based on the latest scientific findings.
                </p>
              </div>
              {/* Image removed as per plan */}
            </div>
          </div>
        </section>

        {/* Sections removed as per plan */}

        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <div className="space-y-4">
               <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl text-center">Contact Us</h2>
               <p className="text-gray-500 text-sm md:text-base font-light text-center">
                 For support or inquiries, please email us at <a href="mailto:support@pcc1.news" className="text-teal-600 hover:underline">support@pcc1.news</a> or use the form below.
               </p>
               <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
