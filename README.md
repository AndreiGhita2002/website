# Personal Website

<a> andreig.dev </a>

The current site is in `site/` (React, TypeScript, Vite). The old Create React App site is in `old/`, with its own `package.json`. The new site doesn't use any of it.

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

All the site's text and links are in that same file:

- `name`: your name
- `site`: browser tab title and social preview text
- `links`: CV, GitHub, LinkedIn and email (label and URL)
- `sections`: each section's `name` on the scroll rail and its `label` on the page
- `ui`: small labels such as `STACK` and the project count
- `intro`, `about`, `contact`, `timeline`, `friends`: each section's content

To replace the CV, put the new PDF in `site/public/assets/` and update `links.cv.href`. Only the `+`, `−`, `↗` and `·` symbols and the numbers on rows and the rail stay in the code.

## Removing your phone number from a CV

Everything in `site/public/` is published, so keep the original CV somewhere else and publish a stripped copy. From the repo root:

```sh
uv run site/scripts/strip_cv_phone.py path/to/original.pdf site/public/assets/Andrei_Ghita_CV.pdf
```

This deletes the number from the PDF rather than covering it, and writes nothing if a number survives. It's written for LaTeX PDFs, so run it again whenever you recompile the CV. Requires [uv](https://docs.astral.sh/uv/).

## Placeholders to fill in

Files to add to `site/public/assets/`:

- [ ] `og.png`: the social preview image. The current file is a generated stand-in (1200×630).

In `site/src/content/projects.json`:

- [ ] Links, shown as text until they have a real URL: `[PAPER LINK]`, `[PDF LINK]`, `[DEMO LINK]`, `[VIDEO LINK]`
- [ ] Project images: `[THROUGHPUT CHART]`, `[ARCHITECTURE DIAGRAM]`, `[SCREENSHOT]`, `[BENCHMARK]`, `[GAMEPLAY GIF]`, `[CHAT SCREENSHOT]`, `[MEMORY DIAGRAM]`, `[VR SCREENSHOT]`, `[TRAILER STILL]`, `[PLATFORM SCREENSHOT]`
- [ ] Thumbnails: every project still shows its coloured tile
- [ ] uxn-on-gpu: `[ADD: the key finding or benchmark result]`
- [ ] plane-game: `[ADD: what the game is, and what you built in the team]`
- [ ] XR Pirate Purgatory: `[ADD: team size and what you were responsible for]`
- [ ] neuro_arcade: `[ADD: what the platform does and your part in it]`
