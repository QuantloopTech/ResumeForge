"use client";
import { useState } from "react";

export default function AIModal({ onClose, onApply }) {
  const [mode, setMode] = useState("guided");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // guided fields
  const [g, setG] = useState({
    name: "",
    targetRole: "",
    years: "",
    current: "",
    skills: "",
    achievements: "",
    education: "",
  });
  const setGF = (k, v) => setG((x) => ({ ...x, [k]: v }));

  // improve fields
  const [pasted, setPasted] = useState("");
  const [targetRole, setTargetRole] = useState("");

  async function run() {
    setError("");
    if (mode === "guided" && !g.targetRole.trim()) {
      setError("Please tell us the role you're targeting.");
      return;
    }
    if (mode === "improve" && pasted.trim().length < 40) {
      setError("Please paste your current résumé or LinkedIn text (at least a few lines).");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "guided"
            ? { mode, payload: g }
            : { mode, payload: { text: pasted, targetRole } }
        ),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      onApply(data.resume);
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
        <button className="modal-x" onClick={onClose}>✕</button>
        <div className="modal-head">
          <h3>✨ Let AI write your résumé</h3>
          <p>Answer a few prompts, or paste what you have. AI fills in every section.</p>
        </div>
        <div className="modal-body">
          <div className="tabs" style={{ marginBottom: 18 }}>
            <div className={`tab ${mode === "guided" ? "active" : ""}`} onClick={() => setMode("guided")}>
              From a few questions
            </div>
            <div className={`tab ${mode === "improve" ? "active" : ""}`} onClick={() => setMode("improve")}>
              Improve my old résumé
            </div>
          </div>

          {mode === "guided" ? (
            <>
              <div className="row2">
                <div className="field"><label>Your name</label>
                  <input value={g.name} onChange={(e) => setGF("name", e.target.value)} placeholder="Priya Nair" /></div>
                <div className="field"><label>Role you want *</label>
                  <input value={g.targetRole} onChange={(e) => setGF("targetRole", e.target.value)} placeholder="Marketing Manager" /></div>
              </div>
              <div className="row2">
                <div className="field"><label>Years of experience</label>
                  <input value={g.years} onChange={(e) => setGF("years", e.target.value)} placeholder="5" /></div>
                <div className="field"><label>Current / recent job</label>
                  <input value={g.current} onChange={(e) => setGF("current", e.target.value)} placeholder="Sr. Exec at Acme" /></div>
              </div>
              <div className="field"><label>Top skills (comma separated)</label>
                <input value={g.skills} onChange={(e) => setGF("skills", e.target.value)} placeholder="SEO, Content, Analytics, Ads" /></div>
              <div className="field"><label>Key achievements (rough notes are fine)</label>
                <textarea rows={3} value={g.achievements} onChange={(e) => setGF("achievements", e.target.value)} placeholder="Grew organic traffic 3x, ran ₹50L ad budget, led team of 4..." /></div>
              <div className="field"><label>Education</label>
                <input value={g.education} onChange={(e) => setGF("education", e.target.value)} placeholder="MBA, IIM Ahmedabad, 2019" /></div>
            </>
          ) : (
            <>
              <div className="field"><label>Target role (optional — tailors the rewrite)</label>
                <input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="Product Manager" /></div>
              <div className="field"><label>Paste your current résumé or LinkedIn text</label>
                <textarea rows={9} value={pasted} onChange={(e) => setPasted(e.target.value)} placeholder="Paste everything you have — messy is fine. AI will clean it up, rewrite the bullets, and structure it." /></div>
            </>
          )}

          {error && <div style={{ color: "#dc2626", fontSize: 13.5, marginBottom: 10 }}>{error}</div>}

          <button className="btn btn-primary btn-block btn-lg" onClick={run} disabled={loading}>
            {loading ? <><span className="spinner" /> Writing your résumé…</> : "Generate résumé"}
          </button>
          <div className="note">
            Takes ~10–20 seconds. You can edit everything afterwards.
          </div>
        </div>
      </div>
    </div>
  );
}
