import { ContactForm } from "@/components/contact-form";
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Microscope, Hospital, FlaskConical, Pill } from 'lucide-react';
import { PageContainer, Section, PageHeader } from "@/components/layout/page-container";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | PCC1.news',
  description: 'Learn about PCC1.news and the 199 Biotechnologies group. Contact us for research collaborations and inquiries about Procyanidin C1.',
  openGraph: {
    title: 'About PCC1.news',
    description: 'Your independent source for Procyanidin C1 research and the 199 Biotechnologies group.',
    images: ['/opengraph-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image.jpg'],
  },
};

// Data for the 199 Group cards
const groupEntities = [
  {
    icon: FlaskConical,
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
    icon: Microscope,
    title: "199 Diagnostics",
    description: "Making advanced diagnostic technology accessible, measuring key aging markers like NAD metabolism and environmental toxins.",
    url: "https://www.agequant.com/"
  },
  {
    icon: Pill,
    title: "199 Health",
    description: "Developing scientifically validated supplements, including Procyanidin C1 (PCC1), with novel delivery methods.",
    url: "https://www.199longevity.com/"
  }
];

export default function AboutPage() {
  return (
    <PageContainer>
      {/* Centered Hero Section */}
      <Section background="gradient" className="py-12 md:py-16">
        <div className="text-center">
          <PageHeader
            title="PCC1.news"
            description="Your independent source for curated news, research summaries, and discussions focused on Procyanidin C1 (PCC1) and its role in healthspan and longevity science. We aim to provide clear, accessible information based on the latest scientific findings."
          />
        </div>
      </Section>

      {/* Two-Column Contact Section */}
      <Section className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Left Column: Text */}
          <div className="space-y-4">
             <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl flex items-center gap-2">
               <Mail className="h-6 w-6 text-teal-600" />
               Contact Us
             </h2>
            <p className="text-gray-600 text-sm md:text-base font-light">
              For support or inquiries, please email us at <a href="mailto:support@pcc1.news" className="text-teal-600 hover:underline">support@pcc1.news</a> or use the form below.
            </p>
          </div>
          {/* Right Column: Form */}
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* About 199 Group Section - Card Layout */}
      <Section background="light" className="py-12 md:py-16">
        <h2 className="text-2xl font-extralight tracking-tight sm:text-3xl text-center mb-8 md:mb-12">
          The 199 Ecosystem
        </h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {groupEntities.map((entity) => (
            <Link href={entity.url} key={entity.title} target="_blank" rel="noopener noreferrer" className="group block">
              <Card className="h-full transition-all duration-200 group-hover:shadow-md group-hover:border-teal-200">
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
      </Section>
    </PageContainer>
  )
}
