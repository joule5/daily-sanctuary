/**
 * Expandable content.
 * To add more scenes or quotes later, just append to the arrays.
 */

export const SCENES = [
  {
    id: "forest-morning",
    name: "Forest Morning",
    gradient: "linear-gradient(165deg, #1e3a2f 0%, #0f241c 45%, #0a1812 100%)",
    elements: "tall pines · soft light · a quiet path"
  },
  {
    id: "beach-dusk",
    name: "Beach at Dusk",
    gradient: "linear-gradient(165deg, #2d1f3d 0%, #1a1428 50%, #100c18 100%)",
    elements: "low tide · distant lights · one footprint"
  },
  {
    id: "city-park",
    name: "City Park",
    gradient: "linear-gradient(165deg, #1e2c30 0%, #141e22 50%, #0c1418 100%)",
    elements: "old trees · a bench · one piece of litter someone missed"
  },
  {
    id: "mountain-clear",
    name: "Mountain Clear",
    gradient: "linear-gradient(165deg, #1c2838 0%, #121a26 50%, #0a1018 100%)",
    elements: "cold air · long view · a single trail marker"
  },
  {
    id: "lakeside",
    name: "Lakeside",
    gradient: "linear-gradient(165deg, #1a2c36 0%, #111e28 50%, #0a141c 100%)",
    elements: "still water · reeds · a distant dock"
  },
  {
    id: "desert-evening",
    name: "Desert Evening",
    gradient: "linear-gradient(165deg, #2e2218 0%, #1c1610 50%, #120e0a 100%)",
    elements: "long shadows · quiet sand · one distant road"
  }
];

export const QUOTES = [
  // Original
  { text: "Agency is built in the small decisions no one else sees.", author: null },
  { text: "You do not have to feel ready to take the next honest step.", author: null },
  { text: "The work of becoming someone who keeps going is mostly quiet.", author: null },
  { text: "Learning on limited tools teaches a different kind of strength.", author: null },
  { text: "A single clear page is worth more than a perfect plan you never start.", author: null },
  { text: "Self-respect grows every time you keep a small promise to yourself.", author: null },
  { text: "You are allowed to move slowly as long as you keep moving.", author: null },
  { text: "Rest is not the opposite of progress. Sometimes it is what makes the next move possible.", author: null },
  { text: "Metacognition begins when you notice what you are doing while you are doing it.", author: null },
  { text: "Stack enough ordinary days and they become extraordinary capacity.", author: null },

  // Real humans
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese proverb" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln (attributed)" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" }
];

export const AI_LINKS = [
  { name: "Grok", url: "https://grok.x.ai", note: "That’s me" },
  { name: "Maple AI", url: "https://maple.ai", note: "Privacy-focused, open models" },
  { name: "Duck.ai", url: "https://duck.ai", note: "DuckDuckGo · anonymized · no account needed" },
  { name: "Gemini", url: "https://gemini.google.com", note: "Google" },
  { name: "Claude", url: "https://claude.ai", note: "Anthropic" },
  { name: "ChatGPT", url: "https://chatgpt.com", note: "OpenAI" }
];

export const DEFAULT_HABITS = [
  "Drank water",
  "Moved my body a little",
  "One small learning step",
  "Looked at the sky or a window"
];
