import PageShell from "@/components/Chrome";

const SITE = process.env.NEXT_PUBLIC_SITE_NAME || "ResumeForge";

export const metadata = {
  title: `Terms of Service — ${SITE}`,
  description: `Terms of Service for ${SITE}, an AI résumé builder.`,
};

export default function Terms() {
  return (
    <PageShell>
      <div className="prose">
        <h1>Terms of Service</h1>
        <p className="prose-meta">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

        <p>
          Welcome to {SITE} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), a service operated by
          <strong> Quantloop Technologies Pvt. Ltd.</strong> (CIN: U62099GJ2025PTC164816), Ahmedabad,
          Gujarat, India. By accessing or using our website and services (the &ldquo;Service&rdquo;), you agree
          to these Terms of Service. If you do not agree, please do not use the Service.
        </p>

        <h2>1. The Service</h2>
        <p>
          {SITE} lets you create a résumé by selecting a template, entering your information (or using our
          AI assistance), previewing the result, and — after a one-time payment — downloading a PDF.
        </p>

        <h2>2. Payments &amp; pricing</h2>
        <p>
          Downloading a finished résumé requires a one-time payment of the price shown at checkout (for
          example, $3 or the equivalent in local currency). Payments are processed securely by our payment
          partner, Razorpay. We do not store your card or banking details. Prices may change at any time,
          but the price shown at the moment of purchase is the price you pay for that purchase.
        </p>

        <h2>3. Your content</h2>
        <p>
          You retain all rights to the information you enter (your name, work history, and other résumé
          details). You are responsible for the accuracy and legality of that information. Your résumé data
          is processed to generate your document and is not sold to third parties. See our{" "}
          <a href="/privacy">Privacy Policy</a> for details.
        </p>

        <h2>4. AI-generated content</h2>
        <p>
          Our AI assistance produces suggested text based on the inputs you provide. AI output may contain
          errors or generic phrasing. You must review, edit, and verify all content before using your résumé.
          You are solely responsible for the final document you submit to employers.
        </p>

        <h2>5. Acceptable use</h2>
        <p>
          You agree not to misuse the Service, including by submitting unlawful content, attempting to bypass
          payment, reverse-engineering the Service, or using automated means to abuse it. We may suspend
          access for violations.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          The templates, design, and software are owned by Quantloop Technologies Pvt. Ltd. Upon payment you
          receive a license to use your generated résumé document for your personal job-search purposes. You
          may not resell or redistribute our templates as your own product.
        </p>

        <h2>7. Disclaimers</h2>
        <p>
          The Service is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee that using a
          résumé created with the Service will result in interviews or employment.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, our total liability for any claim relating to the Service is
          limited to the amount you paid for the specific purchase giving rise to the claim.
        </p>

        <h2>9. Governing law</h2>
        <p>
          These Terms are governed by the laws of India. Any disputes are subject to the exclusive
          jurisdiction of the courts of Ahmedabad, Gujarat.
        </p>

        <h2>10. Contact</h2>
        <p>
          Questions about these Terms? Reach us via our <a href="/contact">Contact page</a>.
        </p>
      </div>
    </PageShell>
  );
}
