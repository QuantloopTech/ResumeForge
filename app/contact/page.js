import PageShell from "@/components/Chrome";

const SITE = process.env.NEXT_PUBLIC_SITE_NAME || "ResumeForge";
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@yourdomain.com";

export const metadata = {
  title: `Contact — ${SITE}`,
  description: `Get in touch with the ${SITE} team.`,
};

export default function Contact() {
  return (
    <PageShell>
      <div className="prose">
        <h1>Contact Us</h1>
        <p>We&apos;d love to hear from you — whether it&apos;s a question, a bug, or a billing issue.</p>

        <div className="contact-card">
          <div className="contact-row"><span>Email</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
          <div className="contact-row"><span>Company</span><span>Quantloop Technologies Pvt. Ltd.</span></div>
          <div className="contact-row"><span>CIN</span><span>U62099GJ2025PTC164816</span></div>
          <div className="contact-row"><span>Location</span><span>Ahmedabad, Gujarat, India</span></div>
        </div>

        <p>
          For billing questions, please include your Razorpay payment ID from your receipt so we can help
          faster. We aim to respond within 2 business days.
        </p>
      </div>
    </PageShell>
  );
}
