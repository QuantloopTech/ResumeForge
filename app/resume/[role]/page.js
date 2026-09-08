import { notFound } from "next/navigation";
import PageShell from "@/components/Chrome";
import TemplateThumb from "@/components/TemplateThumb";
import { getRole, ROLE_SLUGS } from "@/lib/seoRoles";
import { TEMPLATES } from "@/lib/templates";

const SITE = process.env.NEXT_PUBLIC_SITE_NAME || "ResumeForge";

export function generateStaticParams() {
  return ROLE_SLUGS.map((role) => ({ role }));
}

export function generateMetadata({ params }) {
  const r = getRole(params.role);
  if (!r) return { title: `Résumé Template — ${SITE}` };
  const title = `${r.role} Résumé Template (Free to Build) — ${SITE}`;
  const description = `Build a professional ${r.role.toLowerCase()} résumé in minutes with AI. 50 templates, ATS-friendly PDF, just $3 to download. Free to try.`;
  return {
    title,
    description,
    openGraph: { title, description },
    alternates: { canonical: `/resume/${r.slug}` },
  };
}

export default function RolePage({ params }) {
  const r = getRole(params.role);
  if (!r) notFound();

  // pick 3 recommended templates deterministically
  const start = r.slug.length % TEMPLATES.length;
  const recs = [0, 1, 2].map((i) => TEMPLATES[(start + i * 7) % TEMPLATES.length]);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: r.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="lp">
        <div className="lp-hero">
          <span className="lp-kicker">{r.role} Résumé</span>
          <h1>{r.role} résumé template — built with AI in minutes</h1>
          <p>{r.intro}</p>
          <a className="btn btn-primary btn-lg" href="/editor">
            Build my {r.role.toLowerCase()} résumé →
          </a>
          <div className="lp-trust">Free to build &amp; preview · $3 to download · ATS-friendly PDF</div>
        </div>

        <section className="lp-section">
          <h2>What a strong {r.role.toLowerCase()} résumé includes</h2>
          <p>Use achievement-focused bullet points that lead with a strong verb and end with a number. Examples:</p>
          <ul className="lp-bullets">
            {r.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>

        <section className="lp-section">
          <h2>Skills employers look for</h2>
          <div className="lp-chips">
            {r.skills.map((s, i) => (
              <span className="lp-chip" key={i}>{s}</span>
            ))}
          </div>
        </section>

        <section className="lp-section">
          <h2>Recommended templates for this role</h2>
          <div className="lp-recs">
            {recs.map((t) => (
              <a className="tcard" href={`/editor?t=${t.id}`} key={t.id}>
                <TemplateThumb template={t} />
                <div className="tcard-body">
                  <div>
                    <div className="tcard-name">{t.name}</div>
                    <div className="tcard-cat">{t.category}</div>
                  </div>
                  <div className="tcard-price">$3</div>
                </div>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <a className="btn btn-ghost" href="/#templates">See all 50 templates →</a>
          </div>
        </section>

        <section className="lp-section">
          <h2>{r.role} résumé — FAQ</h2>
          <div className="faq">
            {r.faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="lp-cta">
          <h2>Ready to build your {r.role.toLowerCase()} résumé?</h2>
          <p>Pick a template, let AI write it, download a polished PDF for $3.</p>
          <a className="btn btn-primary btn-lg" href="/editor">Start now — it&apos;s free to try</a>
        </section>
      </div>
    </PageShell>
  );
}
