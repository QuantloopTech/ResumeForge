"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TEMPLATES, CATEGORIES } from "@/lib/templates";
import { ROLES } from "@/lib/seoRoles";
import TemplateThumb from "@/components/TemplateThumb";

const SITE = process.env.NEXT_PUBLIC_SITE_NAME || "ResumeForge";

export default function Home() {
  const router = useRouter();
  const [cat, setCat] = useState("All");

  const shown = useMemo(
    () => (cat === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === cat)),
    [cat]
  );

  const open = (id) => router.push(`/editor?t=${id}`);

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <div className="logo">
            <span className="dot" /> {SITE}
          </div>
          <div className="nav-links">
            <a href="#templates">Templates</a>
            <a href="#how">How it works</a>
            <button className="btn btn-primary" onClick={() => open(TEMPLATES[0].id)}>
              Build my résumé
            </button>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <h1>
            A standout résumé in minutes,
            <br />
            <span className="grad">written by AI</span>.
          </h1>
          <p>
            Choose from 50 professional templates, let AI write and polish your résumé,
            then download a clean, ATS-friendly PDF. One flat price — no subscriptions.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => open(TEMPLATES[0].id)}>
              Start building — it&apos;s free to try
            </button>
            <a className="btn btn-ghost btn-lg" href="#templates">
              Browse templates
            </a>
          </div>
          <div className="badge-row">
            <span className="pill">✨ AI writes it for you</span>
            <span className="pill">📄 ATS-friendly PDF</span>
            <span className="pill">
              💳 Just <b>$3</b> per download
            </span>
            <span className="pill">🔒 Secure Razorpay checkout</span>
          </div>
        </div>
      </header>

      <section id="how" className="container">
        <div className="steps">
          <div className="step">
            <div className="n">1</div>
            <h3>Pick a template</h3>
            <p>Browse 50 designs across professional, modern, creative and minimal styles.</p>
          </div>
          <div className="step">
            <div className="n">2</div>
            <h3>Add your details</h3>
            <p>Fill the form, or paste your old résumé and let AI rewrite it beautifully.</p>
          </div>
          <div className="step">
            <div className="n">3</div>
            <h3>Preview live</h3>
            <p>See your résumé update in real time. Switch templates anytime — content stays.</p>
          </div>
          <div className="step">
            <div className="n">4</div>
            <h3>Pay $3 &amp; download</h3>
            <p>Unlock a watermark-free, print-ready PDF with a secure one-time payment.</p>
          </div>
        </div>
      </section>

      <section id="templates" className="container">
        <div className="gallery-head">
          <h2>50 résumé templates</h2>
          <div className="filters">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`filter ${cat === c ? "active" : ""}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid">
          {shown.map((t) => (
            <div key={t.id} className="tcard" onClick={() => open(t.id)}>
              <div style={{ position: "relative" }}>
                <TemplateThumb template={t} />
                <div className="tcard-overlay">
                  <span className="use">Use this template →</span>
                </div>
              </div>
              <div className="tcard-body">
                <div>
                  <div className="tcard-name">{t.name}</div>
                  <div className="tcard-cat">{t.category}</div>
                </div>
                <div className="tcard-price">$3</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 700, color: "var(--ink)", marginBottom: 8, fontSize: 14 }}>
              Résumé templates by role
            </div>
            <div className="footer-links">
              {ROLES.map((r) => (
                <a key={r.slug} href={`/resume/${r.slug}`}>{r.role}</a>
              ))}
            </div>
          </div>
          <div className="footer-links">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/refund">Refund Policy</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-meta">
            © {new Date().getFullYear()} {SITE}. Built with AI. Résumés stay private to you.
          </div>
        </div>
      </footer>
    </>
  );
}
