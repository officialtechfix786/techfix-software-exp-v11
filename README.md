# TechFix Software EXP

Professional mobile software, firmware, cyber security and repair-information website.

**Founder:** MIAN AHMAD

## Structure

```
index.html                     Home (hero, brand grid, services, pricing preview, cyber security, contact)
pages/
  mobiles.html                 Full mobile database browser + working search/filter
  android.html                 Android section (brands, firmware, drivers, tools)
  apple.html                   Apple section (iPhone/iPad, DFU, restore, resources)
  downloads.html               Firmware / drivers / flash tools / ADB / recovery resources
  cyber-security.html          Cyber security, Kali Linux, tools, paid course
  contact.html                 Contact + social links (WhatsApp, Email, Telegram, Facebook, YouTube, TikTok)
  model.html                   Dynamic model-detail page (?model=<name>)
  services.html                Redirects to index.html#services (Services lives on the home page)
database/
  mobiles.js                   Curated, detailed entries (13 flagship/required models with full specs)
  mobile-catalog.csv           4,144-row real device catalog (brand, chipset, RAM, camera, battery, etc.)
  prices.js                    Service/pricing database
assets/
  css/style.css                 Core design system (dark, glass cards, neon cyan/purple accents)
  css/premium-upgrade.css       Additional visual polish, injected on every page by app.js
  js/app.js                     Shared app logic: nav, mobile menu, favicon, search wiring, price rendering
  js/search-upgrade.js          Global search: merges mobiles.js + mobile-catalog.csv, live + case-insensitive
  images/                       Logo, favicon, brand icons, cyber-security tool icons, software icons
favicon.svg
```

## How search works

`app.js` injects `search-upgrade.js` on every page. It loads the curated `mobiles.js` database first, then
fetches and merges `mobile-catalog.csv` (deduplicated by brand+model), giving live, case-insensitive,
partial-match search across brand, model, chipset, OS, firmware, and related keywords — over 4,100 real
devices in total. All 13 required example searches (Samsung Galaxy S24, iPhone 17, Redmi Note 13, etc.) were
verified to resolve correctly.

## Deployment

Static site — works on GitHub Pages or any static host. All asset paths are relative; no build step or
server required. Just upload the whole folder.

## Audit notes (this pass)

Fixed during this review:
- Telegram handle was wrong (`@MIAN361`) on 5 pages — corrected to the official `@Technologi786`.
- iCloud service pricing was listed in SAR — corrected to PKR 6,000–7,000 as specified.
- Homepage was missing `author` meta and Open Graph/Twitter card tags — added.
- This README was missing — added.

Verified working, no changes needed:
- CSS and JS are correctly linked on every page (no missing includes).
- No broken internal links or image paths.
- All JavaScript passes syntax validation; no duplicate `mobilesDatabase`/`pricesDatabase` declarations.
- Logo, favicon, and all referenced brand/tool icons exist as real files.
- All 13 required example models are present and searchable.

## 2026 Premium UI Redesign

The interface now uses the TechFix neon-luxury visual system: large typography, cinematic dark backgrounds, controlled cyan/violet/magenta/green/amber accents, animated gradient card lighting, hover shine, glass panels, responsive navigation, a compact colorful header search control, and a lightweight SVG brand mark. The preloader is removed from the home markup and non-critical images are lazy-loaded/decoded asynchronously.
