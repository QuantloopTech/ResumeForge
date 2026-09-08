import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The exact shape we want back. Keeps the editor/preview happy.
const SCHEMA_HINT = `{
  "basics": { "name": "", "title": "", "email": "", "phone": "", "location": "", "website": "", "linkedin": "", "summary": "" },
  "experience": [ { "company": "", "role": "", "location": "", "start": "", "end": "", "bullets": ["", ""] } ],
  "education": [ { "school": "", "degree": "", "location": "", "start": "", "end": "", "details": "" } ],
  "skills": ["", ""],
  "projects": [ { "name": "", "description": "", "link": "" } ],
  "certifications": [ { "name": "", "issuer": "", "year": "" } ],
  "languages": [ { "name": "", "level": "" } ]
}`;

const SYSTEM = `You are an expert résumé writer and ATS (applicant tracking system) specialist.
Return ONLY a single valid JSON object — no markdown, no code fences, no commentary — that exactly matches this schema:
${SCHEMA_HINT}

Rules:
- Write concise, achievement-focused bullet points that start with strong action verbs and quantify impact where plausible.
- 3–5 bullets per experience entry.
- Keep the summary to 2–3 punchy sentences written in first person without "I".
- Use clean, professional language suitable for the target role and for ATS parsing.
- Do NOT fabricate specific employers, dates, or degrees that weren't provided. When something is missing, use a clearly editable placeholder (e.g. "Company Name", "2020").
- 8–12 relevant skills.
- Every field in the schema must be present; use empty arrays/strings when you have nothing.`;

function buildUserPrompt(mode, payload) {
  if (mode === "improve") {
    return `Rewrite and restructure the following résumé / LinkedIn text into the JSON schema. Improve clarity, fix grammar, strengthen the bullets, and make it ATS-friendly.${
      payload.targetRole ? ` Tailor it toward this target role: "${payload.targetRole}".` : ""
    }

--- SOURCE TEXT START ---
${payload.text}
--- SOURCE TEXT END ---`;
  }
  // guided
  return `Create a complete, polished résumé as JSON from these details:
- Name: ${payload.name || "(leave placeholder)"}
- Target role: ${payload.targetRole}
- Years of experience: ${payload.years || "(unspecified)"}
- Current/recent job: ${payload.current || "(unspecified)"}
- Top skills: ${payload.skills || "(infer sensible ones for the role)"}
- Key achievements (rough notes): ${payload.achievements || "(none provided — write reasonable, clearly editable placeholders)"}
- Education: ${payload.education || "(unspecified)"}

Expand the rough notes into strong, quantified bullet points. Infer a sensible job title and 1–2 experience entries if only a target role is given, using editable placeholders for company names and dates.`;
}

function extractJSON(text) {
  if (!text) return null;
  let t = text.trim();
  // strip code fences if present
  t = t.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const first = t.indexOf("{");
  const last = t.lastIndexOf("}");
  if (first === -1 || last === -1) return null;
  try {
    return JSON.parse(t.slice(first, last + 1));
  } catch {
    return null;
  }
}

// Guarantee every field exists so the editor never crashes.
function normalize(r) {
  const b = r.basics || {};
  const arr = (x) => (Array.isArray(x) ? x : []);
  return {
    basics: {
      name: b.name || "Your Name",
      title: b.title || "",
      email: b.email || "",
      phone: b.phone || "",
      location: b.location || "",
      website: b.website || "",
      linkedin: b.linkedin || "",
      summary: b.summary || "",
    },
    experience: arr(r.experience).map((e) => ({
      company: e.company || "",
      role: e.role || "",
      location: e.location || "",
      start: e.start || "",
      end: e.end || "",
      bullets: arr(e.bullets).filter(Boolean),
    })),
    education: arr(r.education).map((e) => ({
      school: e.school || "",
      degree: e.degree || "",
      location: e.location || "",
      start: e.start || "",
      end: e.end || "",
      details: e.details || "",
    })),
    skills: arr(r.skills).filter(Boolean),
    projects: arr(r.projects).map((p) => ({
      name: p.name || "",
      description: p.description || "",
      link: p.link || "",
    })),
    certifications: arr(r.certifications).map((c) => ({
      name: c.name || "",
      issuer: c.issuer || "",
      year: c.year || "",
    })),
    languages: arr(r.languages).map((l) => ({ name: l.name || "", level: l.level || "" })),
  };
}

async function callAnthropic(userPrompt) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("Server is missing ANTHROPIC_API_KEY.");
  const model = process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-latest";
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2000,
      system: SYSTEM,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI provider error (${res.status}). ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  return data?.content?.[0]?.text || "";
}

async function callOpenAI(userPrompt) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("Server is missing OPENAI_API_KEY.");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: userPrompt },
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI provider error (${res.status}). ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || "";
}

export async function POST(req) {
  try {
    const { mode, payload } = await req.json();
    if (!mode || !payload) {
      return NextResponse.json({ error: "Missing input." }, { status: 400 });
    }
    const userPrompt = buildUserPrompt(mode, payload);
    const provider = (process.env.AI_PROVIDER || "anthropic").toLowerCase();

    const raw = provider === "openai" ? await callOpenAI(userPrompt) : await callAnthropic(userPrompt);
    const parsed = extractJSON(raw);
    if (!parsed) {
      return NextResponse.json(
        { error: "AI returned an unexpected format. Please try again." },
        { status: 502 }
      );
    }
    return NextResponse.json({ resume: normalize(parsed) });
  } catch (e) {
    return NextResponse.json({ error: e.message || "AI generation failed." }, { status: 500 });
  }
}
