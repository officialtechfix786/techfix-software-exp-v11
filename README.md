# TechFix Software EXP

Founder: MIAN AHMAD

A premium, static technology platform for mobile software resources, device search, Android/Apple resources, downloads, pricing and authorized cyber-security education.

## Structure
- `index.html` — premium home
- `mobiles.html` — searchable device database
- `model.html` — dynamic model details
- `android.html` — Android hub
- `apple.html` — Apple hub
- `downloads.html` — official-first resources
- `cyber-security.html` — security education and Kali Linux
- `contact.html` — social/contact channels
- `samsung.html`, `xiaomi.html`, `oppo.html`, `vivo.html` — brand hubs
- `css/style.css` — shared premium design system
- `js/icons.js` — icons and social data
- `js/app.js` — shared header/footer/UI
- `js/database.js` — database loader and search
- `data/models.json` — structured device data
- `data/prices.json` — service pricing data
- `data/downloads.json` — resource links
- `assets/` — local logos, favicon and visuals

## Running locally
Because browsers restrict `fetch()` from `file://`, use a small local HTTP server, for example:
`python -m http.server 8000`
Then open `http://localhost:8000/`.

## Deployment
This project is suitable for GitHub Pages/static hosting. Keep relative paths intact.

## Data
Add or edit devices in `data/models.json`. Keep IDs unique.
Add or edit service prices in `data/prices.json`.

## Security
Cyber-security content is for legal, authorized learning and testing only.
