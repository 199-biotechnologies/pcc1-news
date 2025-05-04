import { ContactForm } from "@/components/contact-form";
import Link from 'next/link'; // Added Link import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Added Card imports
import { Mail, Microscope, Hospital, FlaskConical, Pill } from 'lucide-react'; // Added Icon imports

// Data for the 199 Group cards
const groupEntities = [
  {
    icon: FlaskConical, // Swapped icon
    title: "199 Biotechnologies",
    description: "Working on partial reprogramming to tackle cellular aging and address diseases like glioblastoma.",
    url: "https://www.199.bio/"
  },
  {
    icon: Hospital,
    title: "199 Clinic",
    description: "An integrative longevity clinic offering personalized care and concierge health services.",
    url: "https://www.199.clinic/"
  },
  {
    icon: Microscope, // Swapped icon
    title: "199 Diagnostics",
    description: "Making advanced diagnostic technology accessible, measuring key aging markers like NAD metabolism and environmental toxins.",
    url: "https://www.agequant.com/"
  },
  {
    icon: Pill,
    title: "199 Health",
    description: "Developing scientifically validated supplements, including Procyanidin C1 (PCC1), with novel delivery methods.",
    url: "https://www.199longevity.com/" // Using the URL from fetched data
  }
];

export default function AboutPage() {
  return (
    <>
      <main className="flex-1">
        {/* Centered Hero Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-3">
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
            {/* Changed to items-center for better vertical alignment */}
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              {/* Left Column: Text */}
              <div className="space-y-4">
                 <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl flex items-center gap-2"> {/* Added flex container for icon */}
                   <Mail className="h-6 w-6 text-teal-600" /> {/* Added Mail icon */}
                   Contact Us
                 </h2>
                <p className="text-gray-500 text-sm md:text-base font-light">
                  For support or inquiries, please email us at <a href="mailto:support@pcc1.news" className="text-teal-600 hover:underline">support@pcc1.news</a> or use the form below.
                </p>
              </div>
              {/* Right Column: Form */}
              <div className="w-full">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* New "About 199 Group" Section - Card Layout */}
        <section className="w-full py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl text-center mb-8 md:mb-12">
              The 199 Ecosystem
            </h2>
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"> {/* 2-column grid */}
              {groupEntities.map((entity) => (
                <Link href={entity.url} key={entity.title} target="_blank" rel="noopener noreferrer" className="group block">
                  <Card className="h-full transition-all duration-200 group-hover:shadow-md group-hover:border-teal-200"> {/* Added hover effect */}
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <entity.icon className="h-8 w-8 text-teal-600" />
                      <CardTitle className="text-lg font-semibold">{entity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm font-light">{entity.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
