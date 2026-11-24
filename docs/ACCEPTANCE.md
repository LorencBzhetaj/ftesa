# Acceptance gates
- M1: screenshot at 390×844 and desktop; approved envelope fidelity, realistic folds and seal, smooth opening, keyboard/touch, repeat-tap guard, skip/reduced-motion. User approval required.
- M2: capture intro-to-palace sequence; curtains and fountain convincing, no layout jump, fallback works. User approval required.
- M3: full-scroll screenshots at 320, 390, 430 and 1440 px; no horizontal overflow; no RSVP/menu; Dushkaj image correct; all text readable; actual maps link only when configured; optional photos/music gracefully omitted.
- M4: run lint, typecheck, build, automated browser smoke tests (Playwright suggested), test Chromium/WebKit and real iPhone if available. Record device/browser, load and frame metrics, console errors, accessibility checks. Do not claim physical-device tests unless performed.
- M5: verify names/date/time/address/timeline with user, check asset rights and privacy, obtain approval before deployment. Provide exact local commands and screenshots; report all unresolved issues.
