import PageShell from "@/components/Chrome";

const SITE = process.env.NEXT_PUBLIC_SITE_NAME || "ResumeForge";

export const metadata = {
  title: `Privacy Policy — ${SITE}`,
  description: `How ${SITE} handles your data.`,
};

export default function Privacy() {
  return (
    <PageShell>
      <div className="prose">
        <h1>Privacy Policy</h1>
        <p className="prose-meta">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

        <p>
          This Privacy Policy explains how <strong>Quantloop Technologies Pvt. Ltd.</strong> (&ldquo;we&rdquo;),
          operator of {SITE}, handles information in connection with the Service.
        </p>

        <h2>1. Information you provide</h2>
        <p>
          To build your résumé you enter details such as your name, contact information, work history,
          education, and skills. This information stays in your browser to render your résumé. We do not
          require you to create an account.
        </p>

        <h2>2. AI processing</h2>
        <p>
          If you use the AI writing feature, the details you submit for that request are sent to our AI
          provider (Anthropic or OpenAI) solely to generate your résumé text, and the result is returned to
          you. We do not use your résumé content to train models.
        </p>

        <h2>3. Payment information</h2>
        <p>
          Payments are handled by Razorpay. We never see or store your full card or bank details. Razorpay
          processes your payment under its own privacy policy.
        </p>

        <h2>4. Analytics &amp; cookies</h2>
        <p>
          We may use privacy-respecting analytics to understand aggregate usage (for example, how many people
          view a page). If you add third-party analytics, disclose them here.
        </p>

        <h2>5. Data retention</h2>
        <p>
          Because your résumé content is kept in your browser rather than in our database, clearing your
          browser data removes it. Payment records are retained by Razorpay and by us as required for
          accounting and legal compliance.
        </p>

        <h2>6. Your rights</h2>
        <p>
          You may request information about, or deletion of, any personal data we hold about you by contacting
          us. See the <a href="/contact">Contact page</a>.
        </p>

        <h2>7. Contact</h2>
        <p>
          For privacy questions, reach us via our <a href="/contact">Contact page</a>.
        </p>
      </div>
    </PageShell>
  );
}
