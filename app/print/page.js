"use client";
import { useEffect, useState } from "react";
import { getTemplate } from "@/lib/templates";
import { emptyResume } from "@/lib/sampleResume";
import ResumePreview from "@/components/ResumePreview";

export default function PrintPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("rf_print");
      if (raw) setData(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (!data) return;
    // give fonts a moment, then open the print dialog
    const t = setTimeout(() => window.print(), 600);
    return () => clearTimeout(t);
  }, [data]);

  if (!data) {
    return <div style={{ padding: 40, fontFamily: "Inter, sans-serif" }}>Preparing your PDF…</div>;
  }

  const template = getTemplate(data.templateId);
  const resume = data.resume || emptyResume;

  return (
    <div className="print-root" style={{ display: "flex", justifyContent: "center", background: "#e9ecf3", padding: 20 }}>
      <div className="paper" style={{ boxShadow: "0 10px 40px rgba(0,0,0,.15)" }}>
        <ResumePreview resume={resume} template={template} />
      </div>
    </div>
  );
}
