import { PageContainer, Section, PageHeader } from "@/components/layout/page-container";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press & Media | PCC1.news',
  description: 'Press information, media coverage, and contact details for journalists covering PCC1.news and 199 Biotechnologies.',
  openGraph: {
    title: 'Press & Media Centre',
    description: 'Official press information for PCC1.news and the 199 group.',
    images: ['/opengraph-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image.jpg'],
  },
};

export default function PressPage() {
  return (
    <PageContainer>
      <Section background="gradient">
        <PageHeader 
          title="Press & Media Centre – pcc1.news"
          description="Official press information for pcc1.news and the 199 group."
        />
      </Section>

      <Section>
        <div className="prose prose-gray max-w-3xl mx-auto dark:prose-invert prose-p:text-sm prose-p:font-light prose-headings:font-light prose-h3:font-light prose-h3:text-lg prose-h4:font-light prose-h4:text-base">
          <p>
            Welcome to the official press page for <strong>pcc1.news</strong>, the news and research arm of the 199 group. Here you will find authoritative background information on our founder, a record of featured media coverage and clear contact details for interview or comment requests.
          </p>

          <hr className="my-6" />

          <h4>Contact for journalists</h4>
          <p>
            Email <a href="mailto:support@pcc1.news">support@pcc1.news</a><br />
            Postal address: 199 Longevity Ltd, 199 Gloucester Terrace, London W2 6LD, United Kingdom
          </p>

          <hr className="my-6" />

          <h4>About the founder</h4>
          <p><strong>Boris Djordjevic – CEO, Founder, Investor</strong></p>
          <p>
            Boris Djordjevic established the <em>199</em> group of companies to accelerate translational longevity science.
          </p>
          <ul>
            <li><strong>199 Biotechnologies Ltd</strong> develops partial cellular re-programming and epigenetic therapies aimed at reversing ageing and treating aggressive cancers such as glioblastoma.</li>
            <li><strong>199 Clinic Ltd</strong> and <strong>London Longevity Clinic Ltd</strong> deliver accessible preventive medicine and concierge longevity services.</li>
            <li><strong>199 Diagnostics</strong> offers advanced tests—including AgeQuant™ NAD⁺-metabolism kits and micro-plastics exposure assessments—while <strong>199 Health</strong> develops patent-pending nutraceuticals that feature Procyanidin C1 (PCC1) in novel phytosomal delivery formats.</li>
          </ul>
          <p>
            An active investor and futurist, Boris focuses on innovations that will reshape human health, biotechnology and extended lifespan.
          </p>

          <hr className="my-6" />

          <h4>Selected media coverage</h4>
          <ul>
            <li><strong>Longevity.Technology</strong> – interview: <em>&ldquo;Yamanaka factors are a biological cheat code&rdquo;</em> (profile of 199 Biotechnologies and CEO Boris Djordjevic) (<a href="https://longevity.technology/news/yamanaka-factors-are-a-biological-cheat-code/" target="_blank" rel="noopener noreferrer">Longevity Technology</a>)</li>
            <li><strong>EurekAlert!</strong> – press announcement: <em>&ldquo;199 Biotechnologies to sponsor ARDD 2024, the world&apos;s largest conference on ageing research&rdquo;</em> (<a href="https://www.eurekalert.org/news-releases/1050907" target="_blank" rel="noopener noreferrer">EurekAlert!</a>)</li>
            <li><strong>Aging Research & Drug Discovery Meeting (ARDD) – Speakers list 2024</strong> – Boris Djordjevic featured as conference speaker on epigenetic therapeutics (<a href="https://agingpharma.org/speakers2024" target="_blank" rel="noopener noreferrer">ARDD 2025</a>)</li>
            <li><strong>Live Forever Club</strong> – company profile: 199 Biotechnologies recognised as a leading rejuvenation-therapy developer (<a href="https://liveforever.club/resources/199-biotechnologies" target="_blank" rel="noopener noreferrer">Live Forever Club</a>)</li>
          </ul>
          <p>
            For additional quotes or background materials, please email the press contact above.
          </p>

          <hr className="my-6" />

          <h4>Trademarks</h4>
          <p>
            <em>PCC1</em>™ and <em>199</em>™ are registered trademarks or trademarks of 199 Longevity Ltd in the United Kingdom and other jurisdictions. All other marks belong to their respective owners.
          </p>

          <hr className="my-6" />

          <p>
            High-resolution logos, executive photographs (including a studio portrait of Boris Djordjevic) and brand-usage guidelines are available on request.
          </p>
        </div>
      </Section>
    </PageContainer>
  );
}