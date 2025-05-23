import { PageContainer, Section, PageHeader } from "@/components/layout/page-container";

export default function TermsPage() {
  return (
    <PageContainer>
      <Section background="gradient">
        <PageHeader 
          title="Terms of Service"
          description={
            <span className="text-xs text-gray-600 font-light">
              Effective date: 4 May 2025 – Last updated: 4 May 2025
            </span>
          }
        />
      </Section>

      <Section>
        <div className="prose prose-gray max-w-3xl mx-auto dark:prose-invert prose-p:text-sm prose-p:font-light prose-headings:font-light prose-h3:font-light prose-h3:text-lg prose-table:text-sm prose-table:font-light prose-td:p-2 prose-th:p-2 prose-th:font-light">
          <h3>1 Your agreement with us</h3>
          <p>
            By visiting, browsing, creating an account or making a purchase on pcc1.news (the "Site") you enter a binding contract with <strong>199 Longevity Ltd</strong>, a company registered in England and Wales under no. 16267409 ("199 Longevity", "we", "our", "us"). If you do not accept every provision of these Terms of Service ("Terms") you must stop using the Site.
          </p>

          <hr className="my-6" />

          <h3>2 Eligibility</h3>
          <p>
            The Site is intended for individuals who are at least sixteen (16) years old and capable of forming legally-binding contracts in their jurisdiction. By using the Site you confirm that you meet these criteria.
          </p>

          <hr className="my-6" />

          <h3>3 Informational nature of editorial content – no medical advice</h3>
          <p>
            The Site publishes news reports, commentary and digests of peer-reviewed research concerning procyanidin, as well as product listings. All editorial content is provided for general information. Nothing on the Site is medical advice, nor a substitute for advice from a qualified healthcare professional. Always consult a doctor or pharmacist before acting on information obtained here. You rely on our content entirely at your own risk.
          </p>

          <hr className="my-6" />

          <h3>4 Account registration and security</h3>
          <p>
            Opening an account requires a valid e-mail address and a password. You are responsible for keeping your password confidential and for all activity that occurs under your credentials. Notify us immediately at <a href="mailto:support@pcc1.news">support@pcc1.news</a> if you suspect unauthorised access. We may close, suspend or restrict accounts that are inactive for twenty-four months or that violate these Terms.
          </p>

          <hr className="my-6" />

          <h3>5 Intellectual-property rights</h3>
          <p>
            Unless a specific article states otherwise, all text, graphics, photographs, audio, video and code on the Site ("Content") are the intellectual property of 199 Longevity or its licensors and are protected by UK and international copyright, trade-mark and database-right laws. You may view pages and print or download extracts for your own personal, non-commercial use provided you keep intact all proprietary notices. Any other reproduction, republication, distribution or commercial exploitation requires our prior written consent.
          </p>

          <hr className="my-6" />

          <h3>6 User-generated content</h3>
          <p>When you submit a comment, product review or any other material ("User Content"):</p>
          <ul>
            <li>you grant us an irrevocable, worldwide, royalty-free, perpetual licence to use, reproduce, modify, publish, translate, distribute and display that content in any media, including the right to sub-license;</li>
            <li>you warrant that you own or otherwise control all rights in the User Content and that posting it does not infringe any third-party rights;</li>
            <li>you must ensure it is lawful, respectful and relevant and does not contain defamation, confidential information, personal data of others, commercial solicitations or malicious code;</li>
            <li>we may remove or decline to display any User Content at our discretion and without notice.</li>
          </ul>
          <p>You alone are responsible for the User Content you post and for any loss or damage arising from it.</p>

          <hr className="my-6" />

          <h3>7 E-commerce terms</h3>
          <h4>7.1 Formation of the contract</h4>
          <p>
            Your order is an offer to purchase goods from us. A binding contract is formed only when we email you a dispatch confirmation. We reserve the right to decline any order.
          </p>
          <h4>7.2 Prices, taxes and payment</h4>
          <p>
            Prices are shown in pounds sterling inclusive of UK VAT (where applicable). You authorise our payment service provider (currently Stripe) to charge the total amount, including shipping and any taxes or duties that apply to your destination.
          </p>
          <h4>7.3 Product descriptions and availability</h4>
          <p>
            We try to ensure that product information, images and stock levels are accurate; however, minor variations may occur and availability cannot be guaranteed. If we cannot supply an item we will refund you promptly.
          </p>
          <h4>7.4 Shipping and delivery</h4>
          <p>
            Estimated dispatch and delivery times are provided for guidance only. Title to goods passes when you receive them; risk of loss passes on delivery.
          </p>
          <h4>7.5 Right to cancel and returns</h4>
          <p>
            Consumers resident in the UK or EEA may cancel an online purchase within 14 days of receiving the goods, without giving a reason, under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013. You must tell us in writing within that period and return the goods within a further 14 days. We will refund all payments, including the least-cost outbound postage option, within 14 days of receiving the goods back or proof of return. Damaged or opened sealed items that cannot be resold for hygiene or health-protection reasons may be refused or subject to a deduction for diminished value. (<a href="https://www.legislation.gov.uk/uksi/2013/3134" target="_blank" rel="noopener noreferrer">Legislation.gov.uk</a>, <a href="https://www.legislation.gov.uk/uksi/2013/3134/regulation/30" target="_blank" rel="noopener noreferrer">Legislation.gov.uk</a>)
          </p>
          <h4>7.6 Faulty or mis-described goods</h4>
          <p>
            Our products come with the statutory rights laid down in the Consumer Rights Act 2015. If an item is faulty or not as described you are entitled to a repair, replacement or refund, depending on the circumstances and the time that has elapsed since delivery. (<a href="https://www.businesscompanion.info/en/quick-guides/digital/digital-content" target="_blank" rel="noopener noreferrer">Business Companion</a>, <a href="https://www.citizensadvice.org.uk/about-us/information/the-consumer-rights-act-2015/" target="_blank" rel="noopener noreferrer">Citizens Advice</a>)
          </p>
          <h4>7.7 Supplement disclaimer</h4>
          <p>
            Supplements sold on the Site are not medicines. They are not intended to diagnose, treat, cure or prevent any disease, and statements about their benefits have not been evaluated by the UK Medicines and Healthcare products Regulatory Agency or by the US FDA. Always follow the directions on the label and consult a healthcare professional before use.
          </p>

          <hr className="my-6" />

          <h3>8 Acceptable use</h3>
          <p>You agree not to:</p>
          <ul>
            <li>use the Site for any purpose that is unlawful or prohibited by these Terms;</li>
            <li>attempt to gain unauthorised access to any part of the Site, its servers or connected databases;</li>
            <li>introduce viruses, trojans, worms or other malicious code;</li>
            <li>use automated systems (including scraping tools, bots or spiders) to access the Site without our prior written consent;</li>
            <li>interfere with the proper working of the Site or any transaction conducted on it.</li>
          </ul>

          <hr className="my-6" />

          <h3>9 Third-party links and resources</h3>
          <p>
            Links to external sites and embedded resources are provided for your convenience. We have no control over the content or practices of those sites and accept no liability for any loss or damage arising from your use of them.
          </p>

          <hr className="my-6" />

          <h3>10 Disclaimer of warranties</h3>
          <p>
            The Site, its Content and all goods and services are provided "as is" and "as available". To the fullest extent permitted by law we disclaim all warranties, express or implied, including, without limitation, any implied warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy or availability. We do not warrant that the Site will be uninterrupted, secure or free of viruses.
          </p>

          <hr className="my-6" />

          <h3>11 Limitation of liability</h3>
          <p>Nothing in these Terms excludes or limits liability that cannot be limited under law, including liability for death or personal injury caused by negligence or for fraud. Subject to that:</p>
          <ul>
            <li>we shall not be liable for any loss of profit, revenue, business, data, goodwill or any indirect or consequential loss;</li>
            <li>our total liability arising out of or in connection with the Site, the Content or any contract for sale, whether in contract, tort (including negligence) or otherwise, is limited to the amount you paid for the relevant goods or one hundred pounds sterling (£100) if no purchase is involved.</li>
          </ul>

          <hr className="my-6" />

          <h3>12 Indemnity</h3>
          <p>
            You agree to indemnify and hold harmless 199 Longevity, its officers, directors, employees and agents from and against any claims, liabilities, damages, losses and expenses (including reasonable legal fees) arising from your breach of these Terms or your misuse of the Site.
          </p>

          <hr className="my-6" />

          <h3>13 Termination</h3>
          <p>
            We may suspend or terminate your account or access to the Site immediately and without notice if you breach these Terms or applicable law. Upon termination the licence granted to you under section 5 ends immediately, but sections 5, 10, 11, 12 and 17 survive.
          </p>

          <hr className="my-6" />

          <h3>14 Changes to these Terms</h3>
          <p>
            We may revise these Terms from time to time. The "Last updated" date at the top shows the latest version. Material changes will be announced on the home page and, where appropriate, emailed to registered users at least seven days before they take effect. Continued use after a revision signifies acceptance of the updated Terms.
          </p>

          <hr className="my-6" />

          <h3>15 Governing law and jurisdiction</h3>
          <p>
            These Terms, and any dispute or claim arising from them (including non-contractual disputes), are governed by the law of England and Wales. The courts of England and Wales have exclusive jurisdiction, although we retain the right to bring proceedings against you in your country of residence or any other relevant jurisdiction.
          </p>

          <hr className="my-6" />

          <h3>16 Miscellaneous</h3>
          <p>
            If any provision of these Terms is found invalid or unenforceable, the remaining provisions remain in full force. Our failure to enforce any right or provision is not a waiver. You may not assign or transfer your rights under these Terms without our prior written consent; we may assign our rights at any time. Neither party is liable for delay or failure caused by events beyond reasonable control (force majeure). These Terms, together with our Privacy Policy, constitute the entire agreement between you and 199 Longevity regarding the Site and supersede all prior understandings.
          </p>

          <hr className="my-6" />

          <h3>17 Contact</h3>
          <p>
            Questions about these Terms should be sent to <a href="mailto:support@pcc1.news">support@pcc1.news</a> or by post to:<br />
            Data Protection & Legal, 199 Longevity Ltd, 199 Gloucester Terrace, London W2 6LD, United Kingdom.
          </p>
        </div>
      </Section>
    </PageContainer>
  );
}