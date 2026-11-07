# Personal Website

<a> andreig.dev </a>

The current site is in `site/` (React, TypeScript, Vite). The old Create React App site is still at the repo root (`src/`, `public/`, `package.json`). The new site doesn't use any of it.

## Running it

```sh
cd site
npm install
npm run dev       # dev server
npm run build     # type-checks, builds and prerenders to site/dist
npm run preview   # serves site/dist
```

`npm run build` writes a static site to `site/dist`. The build prerenders the page, so the content is in the HTML and works without JavaScript.

## Adding or editing a project

Edit `site/src/content/projects.json`. Project rows, the entry count and the timeline are all generated from it. Row numbers come from the order in the file.

To use real images, put them in `site/public/assets/` and set the paths in the JSON:

- Thumbnail: `"thumb": { ..., "src": "/assets/foo.png", "alt": "..." }`
- Image slots: `"images": [{ "label": "...", "src": "/assets/foo.png", "alt": "..." }]`

Your name, the About section and friends' links are in the same file (`name`, `about`, `friends`). The rest of the intro and the contact copy are in `site/src/App.tsx`. The page title and social preview text are in `site/index.html`.

## Placeholders to fill in

Files to add to `site/public/assets/`:

- [ ] `Andrei-Ghita-CV.pdf`: the Download CV button already points here, so it's broken until the file exists.
- [ ] `og.png`: the social preview image. The current file is a generated stand-in (1200×630).

In `site/src/content/projects.json`:

- [ ] Links, shown as text until they have a real URL: `[PAPER LINK]`, `[PDF LINK]`, `[DEMO LINK]`, `[VIDEO LINK]`
- [ ] Project images: `[THROUGHPUT CHART]`, `[ARCHITECTURE DIAGRAM]`, `[SCREENSHOT]`, `[BENCHMARK]`, `[GAMEPLAY GIF]`, `[CHAT SCREENSHOT]`, `[MEMORY DIAGRAM]`, `[VR SCREENSHOT]`, `[TRAILER STILL]`, `[PLATFORM SCREENSHOT]`
- [ ] Thumbnails: every project still shows its coloured tile
- [ ] uxn-on-gpu: `[ADD: the key finding or benchmark result]`
- [ ] plane-game: `[ADD: what the game is, and what you built in the team]`
- [ ] XR Pirate Purgatory: `[ADD: team size and what you were responsible for]`
- [ ] neuro_arcade: `[ADD: what the platform does and your part in it]`
