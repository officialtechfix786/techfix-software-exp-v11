# TechFix Software EXP — Website

Founder: MIAN AHMAD

## Overview
A dark, premium technology-platform website for mobile software, firmware, drivers,
FRP/unlock service info, downloads and cyber security education.

## Folder structure
```
/
  index.html            Homepage
  mobiles.html           Full device database + search (all brands)
  android.html            Android hub (multi-brand) + search + tools
  apple.html               Apple hub + search + service info
  samsung.html / xiaomi.html / oppo.html / vivo.html   Brand-specific pages
  downloads.html          Resource/downloads library (categorized, filterable)
  cyber-security.html     Cyber security, Kali Linux, course
  contact.html             Contact + socials

  css/style.css            Shared design system (all pages)
  js/icons.js               Icon library + shared data (brands, trust, socials, nav)
  js/app.js                  Header/footer renderer + mobile menu
  js/database.js            Model DB loader, search, model cards

  data/models.json         Sample structured mobile device database
  data/downloads.json      Resource/downloads database

  assets/favicon.svg      Favicon
```

## How to run locally
Because pages `fetch()` the JSON files, opening `index.html` directly via `file://`
will block those requests in most browsers. Run a tiny local server from the project
folder instead:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080/index.html`.

## How to deploy
Works on any static host (GitHub Pages, Netlify, Vercel, shared hosting). All paths
are relative — just upload the whole folder as-is.

## How search works
Each brand/database page loads `data/models.json` once via `js/database.js`, then
filters client-side on brand, model, model number, chipset, OS and aliases —
case-insensitive, partial match, multi-word.

## How to add models
Open `data/models.json` and add a new object following the existing field pattern
(`id` must be unique). It will immediately be searchable on every page that queries
the database — no other code changes needed.

## How to add downloads/resources
Open `data/downloads.json` and add a new object with `category`, `name`,
`description`, `source`, `url`. It appears automatically on `downloads.html`.

## Notes
- All brand/social icons are hand-built inline SVG — no external logo files, so
  nothing can 404.
- The site currently ships with a sample dataset (~50 real devices across major
  brands) rather than a full 2000+ model catalog — extend `models.json` following
  the same structure to grow the database over time.
