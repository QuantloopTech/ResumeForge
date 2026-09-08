"use client";
import { useState } from "react";

function loadRazorpay() {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function PayModal({ onClose, onPaid, resume, templateName }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setError("");
    setLoading(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) throw new Error("Couldn't load the payment window. Check your connection and retry.");

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template: templateName }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error(order.error || "Could not start checkout.");

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: process.env.NEXT_PUBLIC_SITE_NAME || "ResumeForge",
        description: `Résumé download — ${templateName || "template"}`,
        order_id: order.orderId,
        prefill: {
          name: resume?.basics?.name || "",
          email: resume?.basics?.email || "",
          contact: resume?.basics?.phone || "",
        },
        theme: { color: "#4f46e5" },
        handler: async (resp) => {
          try {
            const vres = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            });
            const v = await vres.json();
            if (!vres.ok || !v.verified) throw new Error(v.error || "Payment could not be verified.");
            onPaid(v.token);
          } catch (e) {
            setError(e.message);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });
      rzp.on("payment.failed", (r) => {
        setError(r?.error?.description || "Payment failed. Please try again.");
        setLoading(false);
      });
      rzp.open();
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: 460 }}>
        <button className="modal-x" onClick={onClose}>✕</button>
        <div className="modal-head">
          <h3>Download your résumé</h3>
        </div>
        <div className="modal-body">
          <div className="pay-price">
            <div className="amt">$3</div>
            <div className="sub">One-time payment · no subscription</div>
          </div>
          <ul className="checklist">
            <li><span className="tick">✓</span> Watermark removed</li>
            <li><span className="tick">✓</span> High-quality, print-ready PDF (A4)</li>
            <li><span className="tick">✓</span> ATS-friendly, selectable text</li>
            <li><span className="tick">✓</span> Edit &amp; re-download anytime this session</li>
          </ul>
          {error && <div style={{ color: "#dc2626", fontSize: 13.5, marginBottom: 10, textAlign: "center" }}>{error}</div>}
          <button className="btn btn-primary btn-block btn-lg" onClick={pay} disabled={loading}>
            {loading ? <><span className="spinner" /> Opening secure checkout…</> : "Pay $3 &amp; download"}
          </button>
          <div className="note">
            🔒 Payments are processed securely by Razorpay. We never see your card details.
          </div>
        </div>
      </div>
    </div>
  );
}
