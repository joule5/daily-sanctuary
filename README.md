# Daily Sanctuary

A quiet, local daily place for reflection, small habits, and continuing.

## What is here

- A nature scene that changes each day (different types: forest, beach, park, mountain, lake, desert)
- A short quote oriented toward agency, learning, and keeping going
- A simple meditation timer (5 / 10 / 15 min)
- A few self-care checkboxes that reset each day
- A private reflection box (only stored on your device)
- An “Ask an AI” menu with links to Grok, Maple AI, Duck.ai, Gemini, Claude, and ChatGPT

## Privacy

- Most of the app is fully local (IndexedDB)
- No account, no analytics, no tracking
- The AI links intentionally leave the local space and open other services
- “Wipe all data” clears everything stored on the device

## Expanding later

Scenes, quotes, and AI links all live in `data/content.js`.  
Adding more is just appending to those arrays.

## Run it

No build step.

```bash
python3 -m http.server 8080
```

Or host on any static host / GitHub Pages.

## License

Apache-2.0
