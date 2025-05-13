import { PageContainer, Section, PageHeader } from "@/components/layout/page-container";

export default function PrivacyPage() {
  return (
    <PageContainer>
      <Section background="gradient">
        <PageHeader 
          title="Privacy Policy"
          description={
            <span className="text-xs text-gray-500 font-light">
              Effective date: 4 May 2025 – Last updated: 4 May 2025
            </span>
          }
        />
      </Section>

      <Section>
        <div className="prose prose-gray max-w-3xl mx-auto dark:prose-invert prose-p:text-sm prose-p:font-light prose-headings:font-light prose-h3:font-light prose-h3:text-lg prose-table:text-sm prose-table:font-light prose-td:p-2 prose-th:p-2 prose-th:font-light">
          <h3>1 Who we are</h3>
          <p>
            pcc1.news is an online platform that publishes news, commentary and peer-review highlights about procyanidin, and operates a boutique shop offering pcc1 products. The site is owned and run by <strong>199 Longevity Ltd</strong>, a company registered in England and Wales (No. 16267409). For the purposes of the UK GDPR and the EU GDPR, 199 Longevity Ltd is the <strong>Data Controller</strong>.
          </p>
          <p>
            You can reach our Data Protection Office at <a href="mailto:support@pcc1.news">support@pcc1.news</a> or by post to 199 Longevity Ltd, 199 Gloucester Terrace, London W2 6LD, United Kingdom.
          </p>

          <hr className="my-6" />

          <h3>2 Personal data we collect</h3>
          <h4>2.1 Data you provide directly</h4>
          <ul>
            <li><strong>Account details</strong> – email address, password (bcrypt-hashed) and display name when you open a site account.</li>
            <li><strong>Shop checkout information</strong> – name, billing and delivery addresses, phone number, items purchased, special instructions.</li>
            <li><strong>Payment data</strong> – the last four digits of your card or a transaction ID. Full card numbers never touch our servers; they are handled by our payment service provider.</li>
            <li><strong>Comments and reviews</strong> – any information you include in comment fields or product-review boxes.</li>
            <li><strong>Communication records</strong> – emails you send to <a href="mailto:support@pcc1.news">support@pcc1.news</a> or messages submitted through contact forms.</li>
          </ul>

          <h4>2.2 Data collected automatically</h4>
          <ul>
            <li><strong>Server logs</strong> – IP address, date and time, requested URL, referrer, user-agent string.</li>
            <li><strong>Cookies and similar technologies</strong>:
              <ul>
                <li>Essential cookies that keep you signed in and remember cart contents (GDPR Art. 6 (1)(f)).</li>
                <li>Analytics cookies set by our self-hosted Matomo instance, loaded only after opt-in consent (Art. 6 (1)(a)).</li>
                <li>Preference cookies that store language choice or hide the cookie banner once you have responded.</li>
              </ul>
            </li>
          </ul>

          <hr className="my-6" />

          <h3>3 Why we use your data and legal bases</h3>
          <table>
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Legal basis</th>
                <th>Typical retention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Creating and managing your account</td>
                <td>Performance of a contract (Art. 6 (1)(b))</td>
                <td>Until you delete the account or 24 months of inactivity</td>
              </tr>
              <tr>
                <td>Fulfilling and shipping orders, processing returns and warranties</td>
                <td>Performance of a contract</td>
                <td>Seven years, to meet tax-record duties</td>
              </tr>
              <tr>
                <td>Processing payments and fraud screening</td>
                <td>Legitimate interest in secure commerce (Art. 6 (1)(f))</td>
                <td>PSP keeps data per its own statutory obligations (see § 4)</td>
              </tr>
              <tr>
                <td>Email newsletters and product-launch updates</td>
                <td>Consent (Art. 6 (1)(a))</td>
                <td>Until you unsubscribe</td>
              </tr>
              <tr>
                <td>Publishing comments or product reviews</td>
                <td>Consent</td>
                <td>While the item/page remains online, unless you ask us to erase it</td>
              </tr>
              <tr>
                <td>Site analytics and performance tuning</td>
                <td>Legitimate interest & consent (split by cookie type)</td>
                <td>Raw logs 14 days; aggregated Matomo stats 26 months</td>
              </tr>
            </tbody>
          </table>

          <hr className="my-6" />

          <h3>4 Who we share data with</h3>
          <ul>
            <li><strong>Payment Service Provider (PSP)</strong> – currently Stripe Payments Europe Ltd; receives checkout token, amount and billing postcode to authorise the transaction under PCI-DSS.</li>
            <li><strong>Courier services</strong> – Royal Mail, DPD or UPS receive your delivery address and phone/email for tracking notices.</li>
            <li><strong>Email infrastructure</strong> – Mailgun (EU zone) delivers order confirmations and newsletters.</li>
            <li><strong>Anti-spam and DDoS protection</strong> – Cloudflare processes IP addresses and HTTP headers as our website proxy.</li>
          </ul>
          <p>
            All service partners act under written Data-Processing Agreements that incorporate the European Commission's 2021 Standard Contractual Clauses where required. We never sell or rent your personal data to advertisers.
          </p>

          <hr className="my-6" />

          <h3>5 International transfers</h3>
          <p>
            Some processors operate outside the UK/EU. Transfers rely on SCCs (Art. 46 GDPR) plus technical safeguards such as TLS 1.3 encryption, at-rest AES-256 encryption and least-privilege API keys.
          </p>

          <hr className="my-6" />

          <h3>6 Your rights</h3>
          <p>You may at any time:</p>
          <ul>
            <li>access the personal data we hold about you;</li>
            <li>ask us to correct inaccurate or incomplete data;</li>
            <li>request deletion of data that is no longer required;</li>
            <li>restrict processing while a challenge is investigated;</li>
            <li>object to direct marketing or other processing based on legitimate interests;</li>
            <li>receive a structured, machine-readable copy of data you provided;</li>
            <li>withdraw any consent you have given, without affecting prior lawful processing.</li>
          </ul>
          <p>
            To exercise any right, email <a href="mailto:support@pcc1.news">support@pcc1.news</a> with "Data-rights request" in the subject line. We must respond within one calendar month (Art. 12 (3) GDPR).
          </p>
          <p>
            If you believe we have acted unlawfully, you may complain to the UK Information Commissioner's Office or to your local EEA supervisory authority.
          </p>

          <hr className="my-6" />

          <h3>7 Security measures</h3>
          <p>We protect personal data with:</p>
          <ul>
            <li>full-site HTTPS using TLS 1.3;</li>
            <li>bcrypt-hashed passwords with per-user salts;</li>
            <li>tokenised payments processed only by the PSP;</li>
            <li>daily encrypted off-site backups;</li>
            <li>multi-factor authentication for administrator accounts;</li>
            <li>Web Application Firewall, rate-limiting and automated patch management.</li>
          </ul>
          <p>
            These measures align with GDPR Art. 32 (security of processing).
          </p>

          <hr className="my-6" />

          <h3>8 Children</h3>
          <p>
            pcc1.news is directed at users aged 16 and over. We do not knowingly collect data from anyone under that age. If you think a minor has provided personal data, please contact us so we can delete it.
          </p>

          <hr className="my-6" />

          <h3>9 Changes to this policy</h3>
          <p>
            We may revise this notice to reflect legal or operational changes. The "Last updated" line shows the latest version. Material amendments will be announced on the home page and, where appropriate, emailed to registered users at least seven days before they take effect. Continued use after that date constitutes acceptance of the revised policy.
          </p>

          <hr className="my-6" />

          <h3>10 Contact us</h3>
          <p>
            For any question or concern about privacy at pcc1.news, write to <a href="mailto:support@pcc1.news">support@pcc1.news</a> or to the Data Protection Office, 199 Longevity Ltd, 199 Gloucester Terrace, London W2 6LD, United Kingdom.
          </p>
        </div>
      </Section>
    </PageContainer>
  );
}