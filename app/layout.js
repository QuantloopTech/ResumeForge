import "./globals.css";

export const metadata = {
  title: "ResumeForge — AI Resume Builder",
  description:
    "Pick from 50 professional résumé templates, let AI write your résumé, and download a polished PDF for $3.",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@500;600;700;800&family=Lora:wght@400;500;600;700&family=Source+Serif+4:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&family=Merriweather:wght@400;700&family=Roboto:wght@400;500;700&display=swap";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>{children}</body>
    </html>
  );
}
