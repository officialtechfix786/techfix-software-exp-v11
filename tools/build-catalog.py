#!/usr/bin/env python3
"""
TechFix catalog build step.

Problem this solves
--------------------
database/mobile-catalog.csv is a 4.3MB, 86-column, 4,145-row file that was
being fetched and parsed *in full, synchronously, in the browser* just to
power global search / the mobiles catalog. That is the single biggest
contributor to slow page loads.

This script pre-processes that CSV, once, at build time, into:

  database/catalog/index.json
      One small record per model (id, brand, model, chipset, os, image,
      slug) -- just enough for search-as-you-type. Nothing else. This is
      what every page loads (async, after first paint) to power the
      header search box.

  database/catalog/pages/page-1.json, page-2.json, ...
      The full catalog, paginated (40 models per page) with the fuller
      field set needed to render a browse card (image, ram, storage,
      network, release date, price). pages/mobiles.html fetches ONE page
      at a time as the user pages through, instead of the whole catalog.

  database/catalog/brands/<brand-slug>.json
      All models for a single brand, with full detail fields. Model
      detail pages fetch only their own brand's file instead of waiting
      on (or polling for) the entire catalog.

Run: python3 tools/build-catalog.py
"""
import csv
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(ROOT, "database", "mobile-catalog.csv")
OUT_DIR = os.path.join(ROOT, "database", "catalog")
PAGE_SIZE = 40


def slugify(value):
    value = (value or "").strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "model"


def pick(row, *keys):
    for key in keys:
        value = (row.get(key) or "").strip()
        if value:
            return value
    return ""


def main():
    if not os.path.exists(CSV_PATH):
        print("No mobile-catalog.csv found, nothing to build.", file=sys.stderr)
        return 1

    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    index = []
    pages = []
    by_brand = {}
    seen_ids = {}

    for row in rows:
        brand = pick(row, "brand")
        model = pick(row, "model")
        if not brand or not model:
            continue

        slug = slugify(brand + " " + model)
        # de-duplicate identical slugs (e.g. two rows for the same model)
        if slug in seen_ids:
            seen_ids[slug] += 1
            slug = f"{slug}-{seen_ids[slug]}"
        else:
            seen_ids[slug] = 0

        os_version = pick(row, "operating_system", "os_version")
        chipset = pick(row, "chipset")
        image = pick(row, "image_url")

        # Lightweight record -- this is what ships to EVERY page for search.
        # Keys are deliberately short (id/b/m/c/o/i) since this array repeats
        # ~4,100 times; short keys measurably shrink the download.
        index.append({
            "id": slug,
            "b": brand,
            "m": model,
            "c": chipset,
            "o": os_version,
            "i": image,
        })

        full = {
            "id": slug,
            "brand": brand,
            "model": model,
            "device_type": pick(row, "device_type"),
            "release_date": pick(row, "release_date"),
            "status": pick(row, "status"),
            "chipset": chipset,
            "cpu": pick(row, "cpu"),
            "gpu": pick(row, "gpu"),
            "os": os_version,
            "ram": pick(row, "ram"),
            "storage": pick(row, "internal_storage"),
            "network": pick(row, "network"),
            "display": pick(row, "display_type"),
            "screen_size": pick(row, "screen_size"),
            "battery": pick(row, "battery_capacity"),
            "camera": pick(row, "primary_camera_resolution"),
            "price": pick(row, "price_official", "price_unofficial"),
            "image": image,
            "detail_url": pick(row, "detail_url"),
        }

        pages.append(full)
        by_brand.setdefault(brand, []).append(full)

    os.makedirs(OUT_DIR, exist_ok=True)
    pages_dir = os.path.join(OUT_DIR, "pages")
    brands_dir = os.path.join(OUT_DIR, "brands")
    os.makedirs(pages_dir, exist_ok=True)
    os.makedirs(brands_dir, exist_ok=True)

    # 1) search index
    index_path = os.path.join(OUT_DIR, "index.json")
    with open(index_path, "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, separators=(",", ":"))

    # 2) paginated browse chunks
    total_pages = max(1, (len(pages) + PAGE_SIZE - 1) // PAGE_SIZE)
    for i in range(total_pages):
        chunk = pages[i * PAGE_SIZE: (i + 1) * PAGE_SIZE]
        with open(os.path.join(pages_dir, f"page-{i + 1}.json"), "w", encoding="utf-8") as f:
            json.dump(chunk, f, ensure_ascii=False, separators=(",", ":"))

    meta = {
        "total": len(pages),
        "pageSize": PAGE_SIZE,
        "totalPages": total_pages,
        "brands": sorted(by_brand.keys()),
    }
    with open(os.path.join(pages_dir, "meta.json"), "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, separators=(",", ":"))

    # 3) per-brand detail files
    for brand, items in by_brand.items():
        with open(os.path.join(brands_dir, slugify(brand) + ".json"), "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, separators=(",", ":"))

    def size_kb(path):
        return round(os.path.getsize(path) / 1024, 1)

    print(f"Source CSV:      {size_kb(CSV_PATH)} KB, {len(rows)} rows")
    print(f"index.json:      {size_kb(index_path)} KB, {len(index)} records (loaded on every page)")
    print(f"Browse pages:    {total_pages} files, {PAGE_SIZE}/page, "
          f"~{size_kb(os.path.join(pages_dir, 'page-1.json'))} KB each")
    print(f"Brand files:     {len(by_brand)} files in database/catalog/brands/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
