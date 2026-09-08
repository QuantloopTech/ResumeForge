// Default sample résumé used for template thumbnails and as the editor starting point.
export const sampleResume = {
  basics: {
    name: "Ananya Sharma",
    title: "Senior Product Designer",
    email: "ananya.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    website: "ananyasharma.design",
    linkedin: "linkedin.com/in/ananyasharma",
    summary:
      "Product designer with 8+ years crafting intuitive B2B SaaS experiences. I turn complex workflows into clean, usable interfaces and lead cross-functional teams from research to launch. Passionate about design systems, accessibility, and shipping fast without cutting corners.",
  },
  experience: [
    {
      company: "Fintech Labs",
      role: "Senior Product Designer",
      location: "Bengaluru",
      start: "2021",
      end: "Present",
      bullets: [
        "Led the redesign of the core payments dashboard, lifting task-completion rate by 34% and cutting support tickets by 22%.",
        "Built and maintained a 60-component design system adopted by 4 product squads, reducing design-to-dev handoff time by half.",
        "Mentored 3 junior designers and introduced a weekly critique ritual that raised design quality scores across the team.",
      ],
    },
    {
      company: "Nimbus Software",
      role: "Product Designer",
      location: "Remote",
      start: "2018",
      end: "2021",
      bullets: [
        "Owned end-to-end design for the mobile app, growing DAU from 12k to 90k over two years.",
        "Ran 40+ usability sessions that reshaped the onboarding flow and improved activation by 28%.",
      ],
    },
    {
      company: "PixelWorks Studio",
      role: "UI/UX Designer",
      location: "Pune",
      start: "2016",
      end: "2018",
      bullets: [
        "Designed 20+ client websites and web apps across fintech, health, and e-commerce.",
        "Collaborated with developers to ship pixel-accurate, responsive interfaces.",
      ],
    },
  ],
  education: [
    {
      school: "National Institute of Design",
      degree: "B.Des, Interaction Design",
      location: "Ahmedabad",
      start: "2012",
      end: "2016",
      details: "Graduated with distinction. President, Design Club.",
    },
  ],
  skills: [
    "Product Design",
    "Design Systems",
    "User Research",
    "Figma",
    "Prototyping",
    "Interaction Design",
    "Accessibility",
    "Design Ops",
    "HTML/CSS",
    "Usability Testing",
  ],
  projects: [
    {
      name: "OpenKit UI",
      description: "Open-source React component library. 3.2k GitHub stars.",
      link: "github.com/ananya/openkit",
    },
    {
      name: "Accessibility Playbook",
      description: "A practical WCAG guide read by 15k designers.",
      link: "a11yplaybook.com",
    },
  ],
  certifications: [
    { name: "Google UX Design Certificate", issuer: "Google", year: "2021" },
    { name: "Certified Usability Analyst", issuer: "HFI", year: "2019" },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Hindi", level: "Native" },
    { name: "Gujarati", level: "Conversational" },
  ],
};

// Empty template for "start from scratch".
export const emptyResume = {
  basics: {
    name: "Your Name",
    title: "Your Title",
    email: "you@email.com",
    phone: "+91 00000 00000",
    location: "City, Country",
    website: "",
    linkedin: "",
    summary: "A short 2–3 line summary of who you are and what you do best.",
  },
  experience: [
    {
      company: "Company Name",
      role: "Your Role",
      location: "City",
      start: "2022",
      end: "Present",
      bullets: ["What you did and the result you drove.", "Another key achievement with a number."],
    },
  ],
  education: [
    {
      school: "University / College",
      degree: "Your Degree",
      location: "City",
      start: "2018",
      end: "2022",
      details: "",
    },
  ],
  skills: ["Skill one", "Skill two", "Skill three", "Skill four"],
  projects: [],
  certifications: [],
  languages: [{ name: "English", level: "Fluent" }],
};
