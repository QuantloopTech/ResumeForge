# ResumeForge — AI Résumé Builder (your $3 side hustle)

A complete, deployable web app. Users pick from 50 templates, fill in their details
(or let AI write the résumé), preview it live, pay **$3** via Razorpay, and download a
clean, ATS-friendly PDF. **You keep the money.**

Built with Next.js 14. Runs free on Vercel. You only pay for the AI you use
(fractions of a cent per résumé) and Razorpay's small per-transaction fee.

---

## What's inside

```
app/
  page.js                 Landing page + gallery of all 50 templates
  editor/page.js          Live résumé editor (form → real-time preview)
  print/page.js           Print-optimised page → the downloadable PDF
  api/ai/route.js         AI generation (server-side — keeps your AI key safe)
  api/razorpay/order      Creates the Razorpay order
  api/razorpay/verify     Verifies the payment signature (this is what protects your money)
components/               UI: preview renderer, editor form, AI modal, pay modal
lib/templates.js          The 50 templates (add more here — no code changes needed)
lib/sampleResume.js       Default content
.env.example              Copy to .env.local and fill in your keys
```

---

## Step 1 — Run it on your own machine first (5 minutes)

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
cp .env.example .env.local     # then open .env.local and add your keys (below)
npm run dev
```

Open http://localhost:3000. The site works immediately — you can browse templates,
edit, and preview. **AI and payments stay off until you add keys.**

---

## Step 2 — Get your AI key (powers "AI write")

Pick ONE provider.

**Option A — Anthropic (recommended, what this app defaults to)**
1. Go to https://console.anthropic.com → sign up → add billing.
2. Create an API key.
3. In `.env.local`:
   ```
   AI_PROVIDER=anthropic
   ANTHROPIC_API_KEY=sk-ant-...
   ANTHROPIC_MODEL=claude-3-5-haiku-latest
   ```

**Option B — OpenAI**
1. https://platform.openai.com → add billing → create key.
2. In `.env.local`:
   ```
   AI_PROVIDER=openai
   OPENAI_API_KEY=sk-...
   OPENAI_MODEL=gpt-4o-mini
   ```

Each résumé generation costs roughly **₹0.20–₹1 (well under a cent)**. On a $3 sale
that's basically free.

---

## Step 3 — Set up Razorpay (this is how you get paid)

1. Sign up at https://razorpay.com and complete **KYC** under your Quantloop entity.
   (KYC must be approved before you can accept real/live payments — start this early,
   it can take a day or two.)
2. Dashboard → **Settings → API Keys → Generate Key**. You get:
   - **Key ID** (starts `rzp_test_...` for testing, `rzp_live_...` when live)
   - **Key Secret** (shown once — copy it)
3. In `.env.local`:
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
   RAZORPAY_KEY_SECRET=your_secret_here
   PRICE_AMOUNT=29900        # ₹299 in paise (~$3). Change to your price.
   PRICE_CURRENCY=INR
   ```
   > **Pricing note:** Razorpay charges in the **smallest unit**. For INR that's paise,
   > so `29900` = ₹299. `$3` is about ₹250–₹299 depending on the exchange rate — set
   > whatever you want. To charge in actual USD you must ask Razorpay to enable
   > **International Payments** on your account, then set `PRICE_CURRENCY=USD` and
   > `PRICE_AMOUNT=300` (300 cents = $3).

**Test it without real money:** use the `rzp_test_...` keys and Razorpay's test card
`4111 1111 1111 1111`, any future expiry, any CVV. You'll see the full pay → verify →
download flow. Switch to `rzp_live_...` keys when you're ready for real customers.

Your earnings settle to your bank account on Razorpay's normal payout schedule
(typically T+2 to T+3 working days).

---

## Step 4 — Go live on the internet (free, ~10 minutes)

1. Push this folder to a **GitHub** repo (private is fine).
2. Go to https://vercel.com → sign up → **Add New Project** → import the repo.
3. Before deploying, add every variable from your `.env.local` under
   **Settings → Environment Variables** (paste them one by one). This is critical —
   the secret keys live only on Vercel's server, never in the browser.
4. Click **Deploy**. You get a live URL like `resumeforge.vercel.app`.
5. **Custom domain:** Vercel → Settings → Domains → add your domain (e.g. a `.com` you
   buy for ~₹800/yr). Point it and you're live under your own brand.

Every time you push to GitHub, Vercel redeploys automatically.

---

## How a sale works (the money flow)

1. User edits their résumé and clicks **Download · $3**.
2. Server (`/api/razorpay/order`) creates a Razorpay order using your **secret** key.
3. Razorpay's secure popup takes the card/UPI payment — **you never touch card data.**
4. On success, the server (`/api/razorpay/verify`) checks the cryptographic signature.
   Only a genuinely-paid transaction passes this check — **this is what stops people
   from faking a payment.**
5. The watermark is removed and the print-ready PDF opens for download.
6. The money lands in your Razorpay account → paid out to your bank.

---

## Adding more templates / reaching a polished 50

Open `lib/templates.js`. The catalog is generated from three ingredients:
**layout** (10 structures the renderer knows) × **accent colour** × **font theme**.
To add or tweak a template, edit the `NAMES`, `ACCENTS`, or `FONTS` arrays, or add a
custom object to the list. No other file needs to change — the gallery, editor, and
PDF all read from here. To build a brand-new *layout* (e.g. a photo header), add a case
in `components/ResumePreview.js` and a matching block in `app/globals.css`.

---

## Honest notes & where to level up later

- **The download gate is client-side.** After a *real, verified* payment the app unlocks
  the PDF in the browser. This is standard for a $3 product and 99% of users will simply
  pay. A determined person with developer tools could bypass the download — if that ever
  matters, the upgrade is to render the PDF **on the server** (Puppeteer) behind the
  payment verification. The payment itself is always verified server-side, so you never
  get fake money.
- **PDF quality:** the app uses the browser's own "Save as PDF", which gives perfect
  fidelity **and selectable text** (important for ATS). Users click Download → the print
  dialog opens → "Save as PDF". If you'd rather have a true one-click download, that's the
  same server-side-PDF upgrade above.
- **Marketing is the real work.** The code is done; getting your first customers is the
  hustle. Ideas: SEO pages for "[job title] resume template", posting free templates on
  LinkedIn/Instagram/Reddit with a link, a "free preview, ₹299 to download" hook, and
  student/campus outreach.
- **Legal:** add a simple Terms & Refund page (Razorpay requires a refund policy link),
  and a privacy note (résumé data stays in the user's browser — this app doesn't store it).

---

Built for Vinni / Quantloop. Ship it. 🚀
