# TechNex Labs

A static website for TechNex Labs, founded by MIAN AHMAD. It uses HTML, CSS, vanilla JavaScript, and JSON, and is designed for a GitHub Pages project site.

## Run locally

Serve this directory over HTTP; browser fetch() does not load JSON databases from a file:// page.

    py -m http.server 8000

Open http://localhost:8000 from this directory.

## Pages and working features

- Home: laptop software installation illustration, service-price preview, global search, and featured current mobile models.
- Mobiles: 33 records across 18 manufacturer families, brand/platform filters, text search, sorting, query-linked details, source links, and related references.
- Android: owner recovery, device identification, backup, ADB/Fastboot, official Pixel flashing references, manufacturer support, bootloop triage, and chipset cautions.
- Apple: backup, recovery/restore, Apple Account and Activation Lock owner support, diagnostics, and jailbreak safety/compatibility guidance.
- Services: PKR starting prices for computer setup and official firmware, owner-first recovery policy, and official support links.
- Downloads: searchable 30-entry publisher directory with separate Apple, Android, and computer filters. Ethical security tools stay on their own page; installers are not hosted.
- Cyber Security: 15 curated project tools and six safe learning/practice guides.
- Contact: founder email and the supplied TikTok and Facebook accounts. Email opens the visitor's mail app; there is no backend contact form.
- Shared responsive navigation/footer, keyboard focus indicators, reduced-motion support, a custom 404 page, and eight accent palettes chosen at random and changed every eight seconds.

## Data and image licensing

Data is stored in database/. The catalog has 33 device records; 13 have model-specific locally bundled Commons photographs with attribution; 20 use original TechNex Labs vector illustrations. Image credits and license notes are in ASSET_CREDITS.md. Records are a curated starter set, not a complete list of supported devices. Some records have verified specifications; seven have a region-specific identifier reference. Exact regional variants, firmware compatibility matrices, and current software version claims are not inferred.

Resource links point to manufacturer, publisher, or project pages. A product page is not proof of firmware compatibility. Verify the exact model, region, build, and prerequisites before servicing.

## Safety

Only work on devices you own or are authorized to service. Back up before recovery, restore, unlocking, or flashing; these actions can erase data or make a device unusable. Resolve FRP, Apple Account, and Activation Lock protections through the account owner and official support. Practice cybersecurity only in isolated labs, on systems you own, or within documented authorization.

## GitHub Pages publication

The intended repository is [MIAN361/TechNex](https://github.com/MIAN361/TechNex). The workflow at .github/workflows/pages.yml is manual-only and deploys the repository root. Configure GitHub Pages to use GitHub Actions, then run the workflow after the complete site is committed. Canonical URLs and absolute sitemap entries should be added after the live Pages URL is confirmed. The site source is committed to the repository. The live Pages deployment is pending configuration and verification.

## QA and known limits

Local checks cover JavaScript syntax, JSON parsing and record consistency, unique IDs, image/source presence, and internal page/asset references. A DOM-mock interaction run exercises global search, catalogue filtering/details, and software search. A live headless browser/visual run could not be completed because no Playwright browser executable was available and the in-app browser did not load local/localhost URLs. The requested viewport widths (320, 375, 425, 768, 1024, 1440, and 1920 px) therefore remain unverified. Static checks are not browser or device compatibility certification.

This is a curated service reference, not an exhaustive repair knowledge base: full device coverage, every regional specification/identifier, device-specific firmware matrices, and every procedure/tool have not been verified. Missing data is intentionally labeled rather than fabricated.
