import { ROLE_SLUGS } from "@/lib/seoRoles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

export default function sitemap() {
  const now = new Date();
  const staticPages = ["", "/editor", "/terms", "/privacy", "/refund", "/contact"].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.6,
  }));
  const rolePages = ROLE_SLUGS.map((slug) => ({
    url: `${BASE}/resume/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...staticPages, ...rolePages];
}
