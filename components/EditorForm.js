"use client";
import { useState } from "react";

function Chevron() {
  return (
    <svg className="acc-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function Accordion({ title, defaultOpen, children }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={`acc ${open ? "open" : ""}`}>
      <div className="acc-head" onClick={() => setOpen((o) => !o)}>
        <span>{title}</span>
        <Chevron />
      </div>
      {open && <div className="acc-body">{children}</div>}
    </div>
  );
}

export default function EditorForm({ resume, setResume }) {
  // ---- helpers ----
  const setBasics = (field, val) =>
    setResume((r) => ({ ...r, basics: { ...r.basics, [field]: val } }));

  const setItem = (section, idx, field, val) =>
    setResume((r) => {
      const arr = [...r[section]];
      arr[idx] = { ...arr[idx], [field]: val };
      return { ...r, [section]: arr };
    });

  const addItem = (section, blank) =>
    setResume((r) => ({ ...r, [section]: [...r[section], blank] }));

  const removeItem = (section, idx) =>
    setResume((r) => ({ ...r, [section]: r[section].filter((_, i) => i !== idx) }));

  const setBullet = (idx, bIdx, val) =>
    setResume((r) => {
      const exp = [...r.experience];
      const bullets = [...exp[idx].bullets];
      bullets[bIdx] = val;
      exp[idx] = { ...exp[idx], bullets };
      return { ...r, experience: exp };
    });
  const addBullet = (idx) =>
    setResume((r) => {
      const exp = [...r.experience];
      exp[idx] = { ...exp[idx], bullets: [...exp[idx].bullets, ""] };
      return { ...r, experience: exp };
    });
  const removeBullet = (idx, bIdx) =>
    setResume((r) => {
      const exp = [...r.experience];
      exp[idx] = { ...exp[idx], bullets: exp[idx].bullets.filter((_, i) => i !== bIdx) };
      return { ...r, experience: exp };
    });

  // skills
  const [skillInput, setSkillInput] = useState("");
  const addSkill = () => {
    const v = skillInput.trim();
    if (!v) return;
    setResume((r) => ({ ...r, skills: [...r.skills, v] }));
    setSkillInput("");
  };
  const removeSkill = (i) => setResume((r) => ({ ...r, skills: r.skills.filter((_, x) => x !== i) }));

  return (
    <div className="editor-scroll">
      <Accordion title="Personal details" defaultOpen>
        <div className="field">
          <label>Full name</label>
          <input value={resume.basics.name} onChange={(e) => setBasics("name", e.target.value)} />
        </div>
        <div className="field">
          <label>Headline / title</label>
          <input value={resume.basics.title} onChange={(e) => setBasics("title", e.target.value)} />
        </div>
        <div className="row2">
          <div className="field">
            <label>Email</label>
            <input value={resume.basics.email} onChange={(e) => setBasics("email", e.target.value)} />
          </div>
          <div className="field">
            <label>Phone</label>
            <input value={resume.basics.phone} onChange={(e) => setBasics("phone", e.target.value)} />
          </div>
        </div>
        <div className="row2">
          <div className="field">
            <label>Location</label>
            <input value={resume.basics.location} onChange={(e) => setBasics("location", e.target.value)} />
          </div>
          <div className="field">
            <label>Website</label>
            <input value={resume.basics.website} onChange={(e) => setBasics("website", e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>LinkedIn</label>
          <input value={resume.basics.linkedin} onChange={(e) => setBasics("linkedin", e.target.value)} />
        </div>
      </Accordion>

      <Accordion title="Summary" defaultOpen>
        <div className="field">
          <label>Professional summary</label>
          <textarea
            rows={4}
            value={resume.basics.summary}
            onChange={(e) => setBasics("summary", e.target.value)}
          />
        </div>
      </Accordion>

      <Accordion title="Experience" defaultOpen>
        {resume.experience.map((e, i) => (
          <div className="item-card" key={i}>
            <div className="item-head">
              <span className="item-label">Position {i + 1}</span>
              <button className="mini-btn" onClick={() => removeItem("experience", i)}>Remove</button>
            </div>
            <div className="row2">
              <div className="field"><label>Role</label>
                <input value={e.role} onChange={(ev) => setItem("experience", i, "role", ev.target.value)} /></div>
              <div className="field"><label>Company</label>
                <input value={e.company} onChange={(ev) => setItem("experience", i, "company", ev.target.value)} /></div>
            </div>
            <div className="row2">
              <div className="field"><label>Location</label>
                <input value={e.location} onChange={(ev) => setItem("experience", i, "location", ev.target.value)} /></div>
              <div className="field"><label>Dates</label>
                <div className="row2">
                  <input placeholder="Start" value={e.start} onChange={(ev) => setItem("experience", i, "start", ev.target.value)} />
                  <input placeholder="End" value={e.end} onChange={(ev) => setItem("experience", i, "end", ev.target.value)} />
                </div>
              </div>
            </div>
            <label className="field" style={{ display: "block" }}><span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".04em" }}>Achievements</span></label>
            {e.bullets.map((b, bi) => (
              <div className="bullet-row" key={bi}>
                <textarea rows={2} value={b} onChange={(ev) => setBullet(i, bi, ev.target.value)} />
                <button className="mini-btn" onClick={() => removeBullet(i, bi)}>✕</button>
              </div>
            ))}
            <button className="mini-add" onClick={() => addBullet(i)}>+ Add achievement</button>
          </div>
        ))}
        <button className="mini-add" onClick={() => addItem("experience", { company: "", role: "", location: "", start: "", end: "", bullets: [""] })}>
          + Add position
        </button>
      </Accordion>

      <Accordion title="Education">
        {resume.education.map((e, i) => (
          <div className="item-card" key={i}>
            <div className="item-head">
              <span className="item-label">Education {i + 1}</span>
              <button className="mini-btn" onClick={() => removeItem("education", i)}>Remove</button>
            </div>
            <div className="field"><label>Degree</label>
              <input value={e.degree} onChange={(ev) => setItem("education", i, "degree", ev.target.value)} /></div>
            <div className="field"><label>School</label>
              <input value={e.school} onChange={(ev) => setItem("education", i, "school", ev.target.value)} /></div>
            <div className="row2">
              <div className="field"><label>Location</label>
                <input value={e.location} onChange={(ev) => setItem("education", i, "location", ev.target.value)} /></div>
              <div className="field"><label>Dates</label>
                <div className="row2">
                  <input placeholder="Start" value={e.start} onChange={(ev) => setItem("education", i, "start", ev.target.value)} />
                  <input placeholder="End" value={e.end} onChange={(ev) => setItem("education", i, "end", ev.target.value)} />
                </div>
              </div>
            </div>
            <div className="field"><label>Details (optional)</label>
              <input value={e.details} onChange={(ev) => setItem("education", i, "details", ev.target.value)} /></div>
          </div>
        ))}
        <button className="mini-add" onClick={() => addItem("education", { school: "", degree: "", location: "", start: "", end: "", details: "" })}>
          + Add education
        </button>
      </Accordion>

      <Accordion title="Skills">
        <div className="chips-input">
          {resume.skills.map((s, i) => (
            <span className="chip-edit" key={i}>
              {s}
              <button className="chip-x" onClick={() => removeSkill(i)}>✕</button>
            </span>
          ))}
        </div>
        <div className="bullet-row" style={{ marginTop: 8 }}>
          <input
            placeholder="Type a skill and press Enter"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
          />
          <button className="mini-btn" onClick={addSkill} style={{ color: "var(--brand)" }}>Add</button>
        </div>
      </Accordion>

      <Accordion title="Projects">
        {resume.projects.map((p, i) => (
          <div className="item-card" key={i}>
            <div className="item-head">
              <span className="item-label">Project {i + 1}</span>
              <button className="mini-btn" onClick={() => removeItem("projects", i)}>Remove</button>
            </div>
            <div className="field"><label>Name</label>
              <input value={p.name} onChange={(ev) => setItem("projects", i, "name", ev.target.value)} /></div>
            <div className="field"><label>Link (optional)</label>
              <input value={p.link} onChange={(ev) => setItem("projects", i, "link", ev.target.value)} /></div>
            <div className="field"><label>Description</label>
              <textarea rows={2} value={p.description} onChange={(ev) => setItem("projects", i, "description", ev.target.value)} /></div>
          </div>
        ))}
        <button className="mini-add" onClick={() => addItem("projects", { name: "", description: "", link: "" })}>
          + Add project
        </button>
      </Accordion>

      <Accordion title="Certifications">
        {resume.certifications.map((c, i) => (
          <div className="item-card" key={i}>
            <div className="item-head">
              <span className="item-label">Certification {i + 1}</span>
              <button className="mini-btn" onClick={() => removeItem("certifications", i)}>Remove</button>
            </div>
            <div className="field"><label>Name</label>
              <input value={c.name} onChange={(ev) => setItem("certifications", i, "name", ev.target.value)} /></div>
            <div className="row2">
              <div className="field"><label>Issuer</label>
                <input value={c.issuer} onChange={(ev) => setItem("certifications", i, "issuer", ev.target.value)} /></div>
              <div className="field"><label>Year</label>
                <input value={c.year} onChange={(ev) => setItem("certifications", i, "year", ev.target.value)} /></div>
            </div>
          </div>
        ))}
        <button className="mini-add" onClick={() => addItem("certifications", { name: "", issuer: "", year: "" })}>
          + Add certification
        </button>
      </Accordion>

      <Accordion title="Languages">
        {resume.languages.map((l, i) => (
          <div className="item-card" key={i}>
            <div className="item-head">
              <span className="item-label">Language {i + 1}</span>
              <button className="mini-btn" onClick={() => removeItem("languages", i)}>Remove</button>
            </div>
            <div className="row2">
              <div className="field"><label>Language</label>
                <input value={l.name} onChange={(ev) => setItem("languages", i, "name", ev.target.value)} /></div>
              <div className="field"><label>Level</label>
                <input value={l.level} onChange={(ev) => setItem("languages", i, "level", ev.target.value)} /></div>
            </div>
          </div>
        ))}
        <button className="mini-add" onClick={() => addItem("languages", { name: "", level: "" })}>
          + Add language
        </button>
      </Accordion>
    </div>
  );
}
