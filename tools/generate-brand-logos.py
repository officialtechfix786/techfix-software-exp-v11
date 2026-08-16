#!/usr/bin/env python3
"""
Guarantees every brand in the catalog has a real logo asset to show.

Problem: only ~16 of the catalog's 77 brand names had a hand-made SVG in
assets/images/brands/. Any other brand (Alcatel, HTC, Meizu, Sony, ZTE,
Lenovo, ...) fell back to a generic placeholder instead of showing its
own name -- "every brand's logo must show" wasn't actually true.

This script reads database/catalog/pages/meta.json (built by
build-catalog.py) and, for every brand name that doesn't already have
assets/images/brands/<slug>.svg, generates one: same visual style as the
existing hand-made brand badges (rounded rect + brand name), colored from
a fixed rotating palette so results look deliberate, not random.
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
META_PATH = os.path.join(ROOT, "database", "catalog", "pages", "meta.json")
BRANDS_DIR = os.path.join(ROOT, "assets", "images", "brands")

PALETTE = [
    "#3b6dff", "#8b5cf6", "#d946ef", "#22c55e", "#f97316",
    "#0ea5e9", "#ef4444", "#14b8a6", "#a855f7", "#eab308",
]


def slugify(value):
    value = (value or "").strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "brand"


def make_svg(name, color):
    label = name.upper() if len(name) <= 10 else name
    size = 30 if len(label) <= 8 else (24 if len(label) <= 14 else 19)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" role="img" aria-label="{name}">'
        f'<rect width="240" height="80" rx="12" fill="{color}"/>'
        f'<text x="120" y="51" fill="#fff" font-family="Arial, sans-serif" '
        f'font-size="{size}" font-weight="700" text-anchor="middle">{label}</text></svg>\n'
    )


def main():
    if not os.path.exists(META_PATH):
        print("No catalog meta.json found -- run build-catalog.py first.")
        return 1

    brands = json.load(open(META_PATH, encoding="utf-8")).get("brands", [])
    os.makedirs(BRANDS_DIR, exist_ok=True)

    created, skipped = 0, 0
    for i, brand in enumerate(brands):
        slug = slugify(brand)
        path = os.path.join(BRANDS_DIR, slug + ".svg")
        if os.path.exists(path):
            skipped += 1
            continue
        color = PALETTE[i % len(PALETTE)]
        with open(path, "w", encoding="utf-8") as f:
            f.write(make_svg(brand, color))
        created += 1

    print(f"Brand logos: {created} generated, {skipped} already existed "
          f"(total {len(brands)} brands covered).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
