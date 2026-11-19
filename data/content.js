/**
 * All expandable content lives here.
 * To add more scenes, quotes, or AIs later, just append to the arrays.
 */

export const SCENES = [
  {
    id: "forest-morning",
    name: "Forest Morning",
    type: "forest",
    gradient: "linear-gradient(160deg, #1a2f1a 0%, #0d1f14 40%, #0a1510 100%)",
    accent: "#4a7c59",
    elements: "tall pines · soft light · a quiet path"
  },
  {
    id: "beach-dusk",
    name: "Beach at Dusk",
    type: "beach",
    gradient: "linear-gradient(160deg, #2a1f3d 0%, #1a1528 45%, #0f0d18 100%)",
    accent: "#c4a882",
    elements: "low tide · distant lights · one footprint"
  },
  {
    id: "city-park",
    name: "City Park",
    type: "park",
    gradient: "linear-gradient(160deg, #1e2a2e 0%, #141c20 50%, #0d1316 100%)",
    accent: "#6b8f71",
    elements: "old trees · a bench · one piece of litter someone missed"
  },
  {
    id: "mountain-clear",
    name: "Mountain Clear",
    type: "mountain",
    gradient: "linear-gradient(160deg, #1c2333 0%, #121820 45%, #0a0e14 100%)",
    accent: "#7a9bb8",
    elements: "cold air · long view · a single trail marker"
  },
  {
    id: "lakeside",
    name: "Lakeside",
    type: "water",
    gradient: "linear-gradient(160deg, #1a2832 0%, #111c24 50%, #0a1218 100%)",
    accent: "#5b8a9a",
    elements: "still water · reeds · a distant dock"
  },
  {
    id: "desert-evening",
    name: "Desert Evening",
    type: "desert",
    gradient: "linear-gradient(160deg, #2c2118 0%, #1c1610 45%, #120e0a 100%)",
    accent: "#c4956a",
    elements: "long shadows · quiet sand · one distant road"
  }
];

export const QUOTES = [
  {
    text: "Agency is built in the small decisions no one else sees.",
    author: null
  },
  {
    text: "You do not have to feel ready to take the next honest step.",
    author: null
  },
  {
    text: "Discipline is remembering what you want more than what you want right now.",
    author: null
  },
  {
    text: "The work of becoming someone who keeps going is mostly quiet.",
    author: null
  },
  {
    text: "Learning on limited tools teaches a different kind of strength.",
    author: null
  },
  {
    text: "A single clear page is worth more than a perfect plan you never start.",
    author: null
  },
  {
    text: "Self-respect grows every time you keep a small promise to yourself.",
    author: null
  },
  {
    text: "You are allowed to move slowly as long as you keep moving.",
    author: null
  },
  {
    text: "The most useful knowledge is the kind you can actually use on the machine in front of you.",
    author: null
  },
  {
    text: "Rest is not the opposite of progress. Sometimes it is what makes the next move possible.",
    author: null
  },
  {
    text: "Metacognition begins when you notice what you are doing while you are doing it.",
    author: null
  },
  {
    text: "Stack enough ordinary days and they become extraordinary capacity.",
    author: null
  }
];

export const AI_LINKS = [
  {
    name: "Grok",
    url: "https://grok.x.ai",
    note: "That’s me"
  },
  {
    name: "Maple AI",
    url: "https://maple.ai",
    note: "Privacy-focused, open models"
  },
  {
    name: "Duck.ai",
    url: "https://duck.ai",
    note: "DuckDuckGo · anonymized · no account needed"
  },
  {
    name: "Gemini",
    url: "https://gemini.google.com",
    note: "Google"
  },
  {
    name: "Claude",
    url: "https://claude.ai",
    note: "Anthropic"
  },
  {
    name: "ChatGPT",
    url: "https://chatgpt.com",
    note: "OpenAI"
  }
];

export const DEFAULT_CHECKBOXES = [
  "Drank water",
  "Moved my body a little",
  "One small learning step",
  "Looked at the sky or a window"
];
