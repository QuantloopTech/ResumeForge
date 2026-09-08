import { IconMail, IconPhone, IconPin, IconGlobe, IconLinkedin } from "./icons";

// ---------- small helpers ----------
const has = (v) => v !== undefined && v !== null && String(v).trim() !== "";
const nonEmpty = (arr) => (Array.isArray(arr) ? arr.filter(Boolean) : []);

function ContactItems({ basics, stacked }) {
  const items = [
    has(basics.email) && { icon: <IconMail />, text: basics.email },
    has(basics.phone) && { icon: <IconPhone />, text: basics.phone },
    has(basics.location) && { icon: <IconPin />, text: basics.location },
    has(basics.website) && { icon: <IconGlobe />, text: basics.website },
    has(basics.linkedin) && { icon: <IconLinkedin />, text: basics.linkedin },
  ].filter(Boolean);
  return (
    <div className={stacked ? "contact stacked" : "contact"}>
      {items.map((it, i) => (
        <span className="contact-item" key={i}>
          <span className="ci-icon">{it.icon}</span>
          <span>{it.text}</span>
        </span>
      ))}
    </div>
  );
}

function SectionTitle({ children }) {
  return <h2 className="sec-title">{children}</h2>;
}

function Experience({ items }) {
  const list = nonEmpty(items);
  if (!list.length) return null;
  return (
    <section className="block">
      <SectionTitle>Experience</SectionTitle>
      {list.map((e, i) => (
        <div className="job" key={i}>
          <div className="job-head">
            <div>
              <div className="job-role">{e.role}</div>
              <div className="job-company">
                {e.company}
                {has(e.location) ? ` · ${e.location}` : ""}
              </div>
            </div>
            <div className="job-dates">
              {e.start}
              {has(e.end) ? ` – ${e.end}` : ""}
            </div>
          </div>
          {nonEmpty(e.bullets).length > 0 && (
            <ul className="bullets">
              {nonEmpty(e.bullets).map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}

function Education({ items }) {
  const list = nonEmpty(items);
  if (!list.length) return null;
  return (
    <section className="block">
      <SectionTitle>Education</SectionTitle>
      {list.map((e, i) => (
        <div className="edu" key={i}>
          <div className="job-head">
            <div>
              <div className="job-role">{e.degree}</div>
              <div className="job-company">
                {e.school}
                {has(e.location) ? ` · ${e.location}` : ""}
              </div>
            </div>
            <div className="job-dates">
              {e.start}
              {has(e.end) ? ` – ${e.end}` : ""}
            </div>
          </div>
          {has(e.details) && <div className="edu-details">{e.details}</div>}
        </div>
      ))}
    </section>
  );
}

function Projects({ items }) {
  const list = nonEmpty(items);
  if (!list.length) return null;
  return (
    <section className="block">
      <SectionTitle>Projects</SectionTitle>
      {list.map((p, i) => (
        <div className="proj" key={i}>
          <div className="proj-head">
            <span className="proj-name">{p.name}</span>
            {has(p.link) && <span className="proj-link">{p.link}</span>}
          </div>
          {has(p.description) && <div className="proj-desc">{p.description}</div>}
        </div>
      ))}
    </section>
  );
}

function Certifications({ items }) {
  const list = nonEmpty(items);
  if (!list.length) return null;
  return (
    <section className="block">
      <SectionTitle>Certifications</SectionTitle>
      {list.map((c, i) => (
        <div className="cert" key={i}>
          <span className="cert-name">{c.name}</span>
          <span className="cert-meta">
            {[c.issuer, c.year].filter(has).join(" · ")}
          </span>
        </div>
      ))}
    </section>
  );
}

function SkillsChips({ items }) {
  const list = nonEmpty(items);
  if (!list.length) return null;
  return (
    <section className="block">
      <SectionTitle>Skills</SectionTitle>
      <div className="chips">
        {list.map((s, i) => (
          <span className="chip" key={i}>
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

function SkillsInline({ items }) {
  const list = nonEmpty(items);
  if (!list.length) return null;
  return (
    <section className="block">
      <SectionTitle>Skills</SectionTitle>
      <div className="skills-inline">{list.join("  •  ")}</div>
    </section>
  );
}

function SkillsList({ items }) {
  const list = nonEmpty(items);
  if (!list.length) return null;
  return (
    <div className="side-block">
      <h3 className="side-title">Skills</h3>
      <ul className="side-list">
        {list.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

function Languages({ items, side }) {
  const list = nonEmpty(items);
  if (!list.length) return null;
  if (side) {
    return (
      <div className="side-block">
        <h3 className="side-title">Languages</h3>
        <ul className="side-list">
          {list.map((l, i) => (
            <li key={i}>
              {l.name}
              {has(l.level) ? ` — ${l.level}` : ""}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <section className="block">
      <SectionTitle>Languages</SectionTitle>
      <div className="skills-inline">
        {list.map((l) => `${l.name}${has(l.level) ? ` (${l.level})` : ""}`).join("  •  ")}
      </div>
    </section>
  );
}

function Summary({ text }) {
  if (!has(text)) return null;
  return (
    <section className="block summary-block">
      <SectionTitle>Summary</SectionTitle>
      <p className="summary">{text}</p>
    </section>
  );
}

// ---------- header variants ----------
function HeaderCentered({ basics }) {
  return (
    <header className="rp-header centered">
      <h1 className="rp-name">{basics.name}</h1>
      {has(basics.title) && <div className="rp-title">{basics.title}</div>}
      <ContactItems basics={basics} />
    </header>
  );
}
function HeaderLeft({ basics }) {
  return (
    <header className="rp-header left">
      <h1 className="rp-name">{basics.name}</h1>
      {has(basics.title) && <div className="rp-title">{basics.title}</div>}
      <div className="rp-accent-bar" />
      <ContactItems basics={basics} />
    </header>
  );
}
function HeaderBand({ basics }) {
  return (
    <header className="rp-header band">
      <div className="band-inner">
        <h1 className="rp-name">{basics.name}</h1>
        {has(basics.title) && <div className="rp-title">{basics.title}</div>}
        <ContactItems basics={basics} />
      </div>
    </header>
  );
}
function HeaderMinimal({ basics }) {
  return (
    <header className="rp-header minimal">
      <div>
        <h1 className="rp-name">{basics.name}</h1>
        {has(basics.title) && <div className="rp-title">{basics.title}</div>}
      </div>
      <ContactItems basics={basics} stacked />
    </header>
  );
}

// ---------- sidebar column ----------
function Sidebar({ resume }) {
  const { basics, skills, languages, certifications } = resume;
  return (
    <aside className="rp-sidebar">
      <div className="side-block">
        <h3 className="side-title">Contact</h3>
        <ContactItems basics={basics} stacked />
      </div>
      <SkillsList items={skills} />
      {nonEmpty(certifications).length > 0 && (
        <div className="side-block">
          <h3 className="side-title">Certifications</h3>
          <ul className="side-list">
            {nonEmpty(certifications).map((c, i) => (
              <li key={i}>
                {c.name}
                {has(c.year) ? ` (${c.year})` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Languages items={languages} side />
    </aside>
  );
}

// ---------- main renderer ----------
export default function ResumePreview({ resume, template }) {
  const t = template;
  const styleVars = {
    "--accent": t.accent,
    "--fb": t.fontBody,
    "--fh": t.fontHeading,
  };

  const single = (
    <>
      <Summary text={resume.basics.summary} />
      <Experience items={resume.experience} />
      <Education items={resume.education} />
      <SkillsChips items={resume.skills} />
      <Projects items={resume.projects} />
      <Certifications items={resume.certifications} />
      <Languages items={resume.languages} />
    </>
  );

  const singleInlineSkills = (
    <>
      <Summary text={resume.basics.summary} />
      <Experience items={resume.experience} />
      <Education items={resume.education} />
      <SkillsInline items={resume.skills} />
      <Projects items={resume.projects} />
      <Certifications items={resume.certifications} />
      <Languages items={resume.languages} />
    </>
  );

  let inner;
  switch (t.layout) {
    case "classic":
      inner = (
        <>
          <HeaderCentered basics={resume.basics} />
          {singleInlineSkills}
        </>
      );
      break;
    case "modern":
      inner = (
        <>
          <HeaderLeft basics={resume.basics} />
          {single}
        </>
      );
      break;
    case "header-band":
      inner = (
        <>
          <HeaderBand basics={resume.basics} />
          <div className="band-body">{single}</div>
        </>
      );
      break;
    case "minimal":
      inner = (
        <>
          <HeaderMinimal basics={resume.basics} />
          {singleInlineSkills}
        </>
      );
      break;
    case "elegant":
      inner = (
        <>
          <HeaderCentered basics={resume.basics} />
          {singleInlineSkills}
        </>
      );
      break;
    case "compact":
      inner = (
        <>
          <HeaderLeft basics={resume.basics} />
          <Summary text={resume.basics.summary} />
          <Experience items={resume.experience} />
          <div className="two-col">
            <Education items={resume.education} />
            <SkillsChips items={resume.skills} />
          </div>
          <div className="two-col">
            <Projects items={resume.projects} />
            <Certifications items={resume.certifications} />
          </div>
        </>
      );
      break;
    case "timeline":
      inner = (
        <>
          <HeaderLeft basics={resume.basics} />
          <Summary text={resume.basics.summary} />
          <div className="timeline">
            <Experience items={resume.experience} />
          </div>
          <Education items={resume.education} />
          <SkillsChips items={resume.skills} />
          <Projects items={resume.projects} />
          <Languages items={resume.languages} />
        </>
      );
      break;
    case "techgrid":
      inner = (
        <>
          <HeaderLeft basics={resume.basics} />
          <Summary text={resume.basics.summary} />
          <SkillsChips items={resume.skills} />
          <Experience items={resume.experience} />
          <div className="two-col">
            <Projects items={resume.projects} />
            <Education items={resume.education} />
          </div>
          <Certifications items={resume.certifications} />
        </>
      );
      break;
    case "sidebar-right":
      inner = (
        <div className="rp-cols rp-cols-right">
          <main className="rp-main">
            <header className="rp-header left compact-head">
              <h1 className="rp-name">{resume.basics.name}</h1>
              {has(resume.basics.title) && <div className="rp-title">{resume.basics.title}</div>}
            </header>
            <Summary text={resume.basics.summary} />
            <Experience items={resume.experience} />
            <Education items={resume.education} />
            <Projects items={resume.projects} />
          </main>
          <Sidebar resume={resume} />
        </div>
      );
      break;
    case "sidebar-left":
    default:
      inner = (
        <div className="rp-cols">
          <Sidebar resume={resume} />
          <main className="rp-main">
            <header className="rp-header left compact-head">
              <h1 className="rp-name">{resume.basics.name}</h1>
              {has(resume.basics.title) && <div className="rp-title">{resume.basics.title}</div>}
            </header>
            <Summary text={resume.basics.summary} />
            <Experience items={resume.experience} />
            <Education items={resume.education} />
            <Projects items={resume.projects} />
          </main>
        </div>
      );
      break;
  }

  return (
    <div
      className={`resume layout-${t.layout} density-${t.density}`}
      style={styleVars}
      data-template={t.id}
    >
      {inner}
    </div>
  );
}
