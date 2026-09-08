"use client";
import { useEffect, useRef, useState } from "react";
import ResumePreview from "./ResumePreview";
import { sampleResume } from "@/lib/sampleResume";

// Renders a full résumé scaled down to fit a card frame.
export default function TemplateThumb({ template }) {
  const frameRef = useRef(null);
  const [scale, setScale] = useState(0.33);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / 794);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="thumb-frame" ref={frameRef}>
      <div
        className="thumb-scale"
        style={{ transform: `scale(${scale})`, width: 794, height: 1123 }}
      >
        <ResumePreview resume={sampleResume} template={template} />
      </div>
    </div>
  );
}
