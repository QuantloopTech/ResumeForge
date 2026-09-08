// SEO landing-page content, one entry per job role.
// Add a new role here and a page auto-generates at /resume/<slug> — no code changes.
// Each targets a search term like "software engineer resume template".

export const ROLES = [
  {
    slug: "software-engineer",
    role: "Software Engineer",
    intro:
      "A strong software engineer résumé leads with impact, not just tech stacks. Hiring managers scan for the systems you built, the scale you handled, and the problems you solved — then check that the keywords match the job description so it clears the ATS.",
    bullets: [
      "Built and shipped a payments microservice handling 2M+ requests/day, cutting checkout latency by 40%.",
      "Reduced AWS spend 28% by right-sizing services and adding autoscaling, saving ₹18L/year.",
      "Led migration of a monolith to a modular service architecture adopted by 5 teams.",
      "Improved test coverage from 45% to 90%, cutting production incidents by half.",
    ],
    skills: ["Java", "Python", "React", "Node.js", "AWS", "Docker", "Kubernetes", "System Design", "SQL", "CI/CD"],
    faqs: [
      { q: "How long should a software engineer résumé be?", a: "One page for under ~8 years of experience, two pages max for senior/lead roles. Recruiters spend seconds on the first pass — keep it tight." },
      { q: "Should I list every programming language?", a: "List the ones relevant to the job and the ones you're genuinely strong in. Prioritise depth over a long, shallow list." },
      { q: "Is a résumé template ATS-friendly?", a: "Yes — every template here exports selectable text (not an image), so applicant tracking systems can read it correctly." },
    ],
  },
  {
    slug: "product-manager",
    role: "Product Manager",
    intro:
      "Great product manager résumés tell a story of outcomes: what you launched, who it served, and the metric it moved. Frame each bullet as decision → action → measurable result.",
    bullets: [
      "Launched a self-serve onboarding flow that lifted activation 34% and cut time-to-value from 5 days to 1.",
      "Prioritised a roadmap across 3 squads, shipping 12 features that grew MRR 22% in two quarters.",
      "Ran discovery with 60+ customers, killing two low-value bets and redirecting a quarter of eng effort.",
      "Defined north-star metrics and a weekly dashboard adopted by leadership.",
    ],
    skills: ["Roadmapping", "User Research", "A/B Testing", "Analytics", "SQL", "Stakeholder Management", "Figma", "Go-to-Market", "Prioritisation"],
    faqs: [
      { q: "What do PM recruiters look for first?", a: "Outcomes and ownership. Lead with launches you drove and the numbers they moved, not a list of responsibilities." },
      { q: "Do I need technical skills on a PM résumé?", a: "Enough to be credible with engineers — SQL, analytics, and comfort with system basics help. Emphasise judgment and impact." },
    ],
  },
  {
    slug: "data-analyst",
    role: "Data Analyst",
    intro:
      "A data analyst résumé should prove you turn messy data into decisions. Show the questions you answered, the tools you used, and the business action that followed.",
    bullets: [
      "Built an executive KPI dashboard in Power BI, replacing 6 hours/week of manual reporting.",
      "Analysed churn cohorts in SQL and surfaced the top driver, informing a fix that cut churn 15%.",
      "Automated an ETL pipeline in Python, reducing data-refresh time from 2 hours to 8 minutes.",
      "A/B tested pricing pages and identified the variant that raised conversion 11%.",
    ],
    skills: ["SQL", "Python", "Excel", "Power BI", "Tableau", "Statistics", "ETL", "Data Visualization", "A/B Testing"],
    faqs: [
      { q: "Should I include projects if I'm a fresher analyst?", a: "Absolutely — a portfolio project with a clear question, method, and result is strong evidence when you lack work history." },
      { q: "SQL or Python first?", a: "Lead with whichever the job emphasises. SQL is near-universal for analysts; Python signals automation and depth." },
    ],
  },
  {
    slug: "marketing-manager",
    role: "Marketing Manager",
    intro:
      "Marketing résumés win on numbers: pipeline, CAC, ROAS, growth. Tie every campaign to a business result and name the budget and channels you owned.",
    bullets: [
      "Grew organic traffic 3x in 12 months through an SEO content engine, adding ₹1.2Cr in attributed pipeline.",
      "Ran a ₹50L/quarter paid budget across Google and Meta at a 4.2x ROAS.",
      "Launched a lifecycle email programme that lifted repeat purchase rate 26%.",
      "Led a rebrand and website relaunch that improved conversion 18%.",
    ],
    skills: ["SEO", "Content Marketing", "Google Ads", "Meta Ads", "Email Marketing", "Analytics", "Brand", "CRM", "Copywriting"],
    faqs: [
      { q: "How do I quantify marketing work?", a: "Use traffic, leads, pipeline, ROAS, CAC, conversion, and revenue. Even rough, honest numbers beat vague claims." },
      { q: "Generalist or specialist résumé?", a: "Mirror the job. For a manager role, show breadth plus one or two areas of real depth." },
    ],
  },
  {
    slug: "sales-executive",
    role: "Sales Executive",
    intro:
      "Sales résumés are scored on quota and numbers. Put your targets, attainment, and deal sizes front and centre.",
    bullets: [
      "Achieved 128% of a ₹3Cr annual quota, ranking #2 of 24 reps.",
      "Closed 40+ new logos with an average deal size of ₹6L and a 3-month sales cycle.",
      "Built a territory from zero to ₹1.5Cr ARR in 18 months.",
      "Improved win rate from 19% to 27% by refining discovery and qualification.",
    ],
    skills: ["B2B Sales", "Lead Generation", "CRM (Salesforce)", "Negotiation", "Pipeline Management", "Cold Outreach", "Account Management"],
    faqs: [
      { q: "What's the #1 thing on a sales résumé?", a: "Quota attainment. Recruiters look for consistent over-performance against clear targets." },
      { q: "Should I name my employers' clients?", a: "Name industries or logo types if allowed, but avoid disclosing confidential deal details." },
    ],
  },
  {
    slug: "graphic-designer",
    role: "Graphic Designer",
    intro:
      "A designer's résumé should be clean, confident, and link to a portfolio. Balance craft with business impact — the work that shipped and what it achieved.",
    bullets: [
      "Redesigned brand identity and packaging for a D2C launch that hit ₹40L revenue in 90 days.",
      "Produced 200+ social creatives that lifted engagement 45% quarter over quarter.",
      "Built a reusable design system, cutting creative turnaround time by 30%.",
      "Led art direction for two campaign shoots from concept to delivery.",
    ],
    skills: ["Figma", "Adobe Photoshop", "Illustrator", "InDesign", "Branding", "Typography", "Layout", "Motion Basics", "Design Systems"],
    faqs: [
      { q: "Do designers need a text résumé if they have a portfolio?", a: "Yes — recruiters and ATS still need a scannable résumé. Link the portfolio prominently at the top." },
      { q: "How visual should a designer résumé be?", a: "Clean and legible beats flashy. Show restraint — the portfolio is where the visuals shine." },
    ],
  },
  {
    slug: "accountant",
    role: "Accountant",
    intro:
      "Accounting résumés reward precision. Show the books you owned, the compliance you handled, and the accuracy or savings you delivered.",
    bullets: [
      "Managed end-to-end accounting for a ₹25Cr-turnover business, closing books 3 days faster each month.",
      "Filed GST and TDS returns with 100% on-time compliance across 3 entities.",
      "Identified ₹12L in recoverable input tax credit through a ledger audit.",
      "Implemented Tally-to-Zoho migration, cutting reconciliation errors 90%.",
    ],
    skills: ["Accounting", "GST", "TDS", "Tally", "Zoho Books", "Excel", "Reconciliation", "Financial Reporting", "Auditing"],
    faqs: [
      { q: "Should I list certifications like CA/CMA?", a: "Yes, prominently — professional certifications are often a screening filter for accounting roles." },
      { q: "How do I stand out as an accountant?", a: "Quantify accuracy, savings, and compliance streaks, and name the software you're fluent in." },
    ],
  },
  {
    slug: "fresher",
    role: "Fresher / Entry-Level",
    intro:
      "With little work history, a fresher résumé wins on projects, internships, skills, and academics. Show initiative and results, even from college work.",
    bullets: [
      "Built a full-stack expense tracker (React + Node) used by 200+ classmates.",
      "Interned at a startup and automated a reporting task, saving the team 5 hours/week.",
      "Led a 4-person team to 1st place in a national hackathon among 120 teams.",
      "Completed 3 certifications relevant to the target role while maintaining an 8.4 CGPA.",
    ],
    skills: ["Communication", "Teamwork", "Problem Solving", "Python", "Excel", "Project Work", "Time Management", "Fast Learner"],
    faqs: [
      { q: "How long should a fresher résumé be?", a: "One page. Lead with education, projects, and internships, then skills and achievements." },
      { q: "No experience — what do I put?", a: "Academic projects, internships, volunteer work, certifications, and measurable achievements. Show impact, not just activities." },
    ],
  },
];

export const ROLE_SLUGS = ROLES.map((r) => r.slug);
export function getRole(slug) {
  return ROLES.find((r) => r.slug === slug) || null;
}
