import PageShell from "@/components/Chrome";

const SITE = process.env.NEXT_PUBLIC_SITE_NAME || "ResumeForge";

export const metadata = {
  title: `Refund & Cancellation Policy — ${SITE}`,
  description: `Refund and cancellation policy for ${SITE}.`,
};

export default function Refund() {
  return (
    <PageShell>
      <div className="prose">
        <h1>Refund &amp; Cancellation Policy</h1>
        <p className="prose-meta">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

        <p>
          {SITE} sells a digital product — a résumé you download immediately after payment. Because the
          product is delivered instantly and consumed on download, we handle refunds as follows.
        </p>

        <h2>1. Try before you pay</h2>
        <p>
          You can build, edit, and preview your entire résumé for free. Payment is only required to remove the
          watermark and download the final PDF, so you always know exactly what you are buying before you pay.
        </p>

        <h2>2. Refund eligibility</h2>
        <p>
          As the product is a downloadable digital file delivered instantly, purchases are generally
          non-refundable once the download has been unlocked. However, we want you to be happy. We will issue
          a full refund if:
        </p>
        <ul>
          <li>You were charged but a technical fault prevented your download, and we could not resolve it; or</li>
          <li>You were charged more than once for the same order due to an error.</li>
        </ul>

        <h2>3. How to request a refund</h2>
        <p>
          Contact us within 7 days of purchase via our <a href="/contact">Contact page</a> with your
          Razorpay payment ID (shown on your receipt). We aim to respond within 2 business days.
        </p>

        <h2>4. How refunds are issued</h2>
        <p>
          Approved refunds are processed back to your original payment method through Razorpay, typically
          within 5–7 business days depending on your bank.
        </p>

        <h2>5. Cancellations</h2>
        <p>
          Since this is a one-time purchase with instant delivery (not a subscription), there is nothing to
          cancel after purchase. There are no recurring charges.
        </p>

        <h2>6. Contact</h2>
        <p>
          For any billing question, reach us via our <a href="/contact">Contact page</a>.
        </p>
      </div>
    </PageShell>
  );
}
