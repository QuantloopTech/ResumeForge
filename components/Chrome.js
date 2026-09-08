// Server-safe shared header + footer (plain links, no hooks) so legal/SEO pages
// stay statically rendered for SEO.

const SITE = process.env.NEXT_PUBLIC_SITE_NAME || "ResumeForge";

export function SiteNav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="logo" href="/">
          <span className="dot" /> {SITE}
        </a>
        <div className="nav-links">
          <a href="/#templates">Templates</a>
          <a href="/#how">How it works</a>
          <a className="btn btn-primary" href="/editor">Build my résumé</a>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@yourdomain.com";
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/#templates">Templates</a>
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/refund">Refund Policy</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-meta">
          © {new Date().getFullYear()} {SITE}. Questions? {email}
        </div>
      </div>
    </footer>
  );
}

// Simple wrapper for content pages.
export default function PageShell({ children }) {
  return (
    <>
      <SiteNav />
      <main className="page">{children}</main>
      <SiteFooter />
    </>
  );
}
