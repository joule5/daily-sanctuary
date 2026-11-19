# Daily Sanctuary

A quiet, local daily place for reflection, small habits, and continuing.

## Features

- Nature scene that changes each day
- Daily quote (mix of original + real human quotes)
- Meditation timer
- **Habit stack** — fully editable by you (add / remove items)
- Private daily reflection
- **Look back** — scroll through past reflections
- Ask an AI menu (Grok, Maple, Duck.ai, Gemini, Claude, ChatGPT)

## Privacy

- Almost everything stays on your device (IndexedDB)
- No account, no analytics
- AI links intentionally leave the local space

## Expanding later

Scenes and quotes live in `data/content.js`.  
Just append new items to the arrays.

## Run

No build step. Any static host or:

```bash
python3 -m http.server 8080
```

## License

Apache-2.0
