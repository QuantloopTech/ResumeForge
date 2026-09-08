"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TEMPLATES, getTemplate, CATEGORIES } from "@/lib/templates";
import { emptyResume, sampleResume } from "@/lib/sampleResume";
import ResumePreview from "@/components/ResumePreview";
import EditorForm from "@/components/EditorForm";
import AIModal from "@/components/AIModal";
import PayModal from "@/components/PayModal";

const SITE = process.env.NEXT_PUBLIC_SITE_NAME || "ResumeForge";

function EditorClient() {
  const params = useSearchParams();
  const router = useRouter();
  const initialId = params.get("t") || TEMPLATES[0].id;

  const [templateId, setTemplateId] = useState(initialId);
  const [resume, setResume] = useState(emptyResume);
  const [paid, setPaid] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [toast, setToast] = useState("");
  const [scale, setScale] = useState(1);
  const [hydrated, setHydrated] = useState(false);
  const paneRef = useRef(null);

  const template = useMemo(() => getTemplate(templateId), [templateId]);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rf_resume");
      if (saved) setResume(JSON.parse(saved));
      if (localStorage.getItem("rf_paid")) setPaid(true);
    } catch {}
    setHydrated(true);
  }, []);

  // persist resume
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("rf_resume", JSON.stringify(resume));
    } catch {}
  }, [resume, hydrated]);

  // fit preview to pane
  useEffect(() => {
    const el = paneRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth - 44;
      setScale(Math.min(1, w / 794));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const flash = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2600);
  };

  const onPaid = (token) => {
    setPaid(true);
    try {
      localStorage.setItem("rf_paid", token || "1");
    } catch {}
    setShowPay(false);
    flash("Payment successful — downloading your résumé…");
    setTimeout(doDownload, 700);
  };

  const doDownload = () => {
    try {
      localStorage.setItem("rf_print", JSON.stringify({ resume, templateId }));
    } catch {}
    window.open("/print", "_blank");
  };

  const handleDownload = () => {
    if (paid) doDownload();
    else setShowPay(true);
  };

  return (
    <>
      {/* top bar */}
      <nav className="nav no-print">
        <div className="container nav-inner" style={{ maxWidth: "100%", padding: "0 18px" }}>
          <div className="logo" style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
            <span className="dot" /> {SITE}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <select
              className="btn btn-ghost"
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              style={{ padding: "10px 12px", fontWeight: 600 }}
            >
              {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                <optgroup label={cat} key={cat}>
                  {TEMPLATES.filter((t) => t.category === cat).map((t) => (
                    <option value={t.id} key={t.id}>
                      {t.name} — {t.category}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <button className="btn btn-ghost" onClick={() => { setResume(sampleResume); flash("Loaded example content"); }}>
              Try example
            </button>
            <button className="btn btn-ghost" onClick={() => setShowAI(true)} style={{ borderColor: "var(--brand)", color: "var(--brand)" }}>
              ✨ AI write
            </button>
            <button className="btn btn-primary" onClick={handleDownload}>
              {paid ? "⬇ Download PDF" : "Download · $3"}
            </button>
          </div>
        </div>
      </nav>

      <div className="editor-shell">
        <div className="editor-panel no-print">
          <EditorForm resume={resume} setResume={setResume} />
        </div>

        <div className="preview-pane" ref={paneRef}>
          <div className="preview-stage" style={{ transform: `scale(${scale})`, width: 794 }}>
            <div className="paper">
              {!paid && (
                <div className="watermark">
                  <span>{SITE.toUpperCase()} · PREVIEW</span>
                </div>
              )}
              <ResumePreview resume={resume} template={template} />
            </div>
          </div>
        </div>
      </div>

      {showAI && <AIModal onClose={() => setShowAI(false)} onApply={(r) => { setResume(r); flash("AI résumé ready — review and tweak below"); }} />}
      {showPay && (
        <PayModal
          onClose={() => setShowPay(false)}
          onPaid={onPaid}
          resume={resume}
          templateName={template.name}
        />
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading editor…</div>}>
      <EditorClient />
    </Suspense>
  );
}
