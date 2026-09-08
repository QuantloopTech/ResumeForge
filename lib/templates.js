// ============================================================
//  TEMPLATE CATALOG
//  Every template = a LAYOUT (structure) + ACCENT (color) + FONT theme.
//  A handful of well-built layouts combined with curated color/typography
//  presets produces a large catalog of genuinely distinct-looking résumés.
//
//  To ADD MORE templates: just add entries to `presets` below. No code
//  changes needed — the renderer (components/ResumePreview.js) reads these.
// ============================================================

// Layout families the renderer knows how to draw.
export const LAYOUTS = [
  "classic",
  "modern",
  "sidebar-left",
  "sidebar-right",
  "header-band",
  "minimal",
  "compact",
  "timeline",
  "elegant",
  "techgrid",
];

// Accent colors (used for headings, rules, sidebars).
const ACCENTS = [
  { key: "navy", color: "#1f3a5f" },
  { key: "teal", color: "#0e7490" },
  { key: "emerald", color: "#0f766e" },
  { key: "burgundy", color: "#7b2d3b" },
  { key: "forest", color: "#2f5d3a" },
  { key: "indigo", color: "#3730a3" },
  { key: "slate", color: "#334155" },
  { key: "plum", color: "#5b2a86" },
  { key: "crimson", color: "#b23a48" },
  { key: "bronze", color: "#8a5a2b" },
  { key: "ocean", color: "#0b6e99" },
  { key: "charcoal", color: "#1f2937" },
  { key: "rose", color: "#9d174d" },
  { key: "royal", color: "#2b3a8c" },
  { key: "graphite", color: "#111827" },
];

// Font themes. These families are loaded in app/layout.js via Google Fonts.
const FONTS = [
  { key: "inter", body: "'Inter', system-ui, sans-serif", heading: "'Inter', system-ui, sans-serif" },
  { key: "poppins", body: "'Inter', system-ui, sans-serif", heading: "'Poppins', sans-serif" },
  { key: "lora", body: "'Lora', Georgia, serif", heading: "'Lora', Georgia, serif" },
  { key: "sourceSerif", body: "'Source Serif 4', Georgia, serif", heading: "'Source Serif 4', Georgia, serif" },
  { key: "plex", body: "'IBM Plex Sans', system-ui, sans-serif", heading: "'IBM Plex Sans', system-ui, sans-serif" },
  { key: "space", body: "'Inter', system-ui, sans-serif", heading: "'Space Grotesk', sans-serif" },
  { key: "merri", body: "'Merriweather', Georgia, serif", heading: "'Merriweather', Georgia, serif" },
  { key: "roboto", body: "'Roboto', system-ui, sans-serif", heading: "'Roboto', system-ui, sans-serif" },
];

const CATEGORY_BY_LAYOUT = {
  classic: "Professional",
  modern: "Modern",
  "sidebar-left": "Creative",
  "sidebar-right": "Creative",
  "header-band": "Modern",
  minimal: "Minimal",
  compact: "Professional",
  timeline: "Creative",
  elegant: "Elegant",
  techgrid: "Technical",
};

// 50 curated names.
const NAMES = [
  "Onyx", "Meridian", "Atlas", "Nova", "Quartz", "Vertex", "Slate", "Aria",
  "Cobalt", "Ember", "Harbor", "Ivory", "Juno", "Kestrel", "Lumen", "Marlow",
  "Nimbus", "Orbit", "Pinnacle", "Quill", "Ridge", "Solstice", "Terra", "Umbra",
  "Vantage", "Willow", "Zephyr", "Axiom", "Beacon", "Cardinal", "Drift", "Echo",
  "Forge", "Grove", "Halcyon", "Indigo", "Juniper", "Keystone", "Lattice", "Monarch",
  "Noble", "Onward", "Prism", "Quorum", "Rune", "Summit", "Tangent", "Verve",
  "Wren", "Zenith",
];

// Build the catalog. We cycle through layouts, accents and fonts with different
// step sizes so each preset is a distinct combination.
function buildCatalog() {
  const list = [];
  for (let i = 0; i < NAMES.length; i++) {
    const layout = LAYOUTS[i % LAYOUTS.length];
    const accent = ACCENTS[(i * 3 + 1) % ACCENTS.length];
    const font = FONTS[(i * 2) % FONTS.length];
    const density = i % 5 === 0 ? "compact" : "normal";
    list.push({
      id: NAMES[i].toLowerCase(),
      name: NAMES[i],
      category: CATEGORY_BY_LAYOUT[layout],
      layout,
      accent: accent.color,
      accentKey: accent.key,
      fontBody: font.body,
      fontHeading: font.heading,
      fontKey: font.key,
      density,
    });
  }
  return list;
}

export const TEMPLATES = buildCatalog();

export const CATEGORIES = ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.category)))];

export function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
}

export const PRICE_LABEL = "$3";
