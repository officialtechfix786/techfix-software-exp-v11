/* TechFix Software EXP: local, source-attributed device catalogue loader.
 * The CSV is a local copy of the public Global Smartphone Database 2025
 * dataset (Kaggle: rajibdab/global-smartphone-database-2025, scraped 2025-07-29).
 * Fields absent from the source deliberately remain blank.
 */
(function () {
    "use strict";
    var csvUrl = (location.pathname.indexOf("/pages/") !== -1 ? "../" : "") + "database/mobile-catalog.csv";
    function cell(row, key) { return String(row[key] || "").trim(); }
    function slug(value) { return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
    function parseCsv(text) {
        var rows = [], row = [], field = "", quote = false, i, ch;
        for (i = 0; i < text.length; i += 1) {
            ch = text[i];
            if (ch === '"') { if (quote && text[i + 1] === '"') { field += '"'; i += 1; } else { quote = !quote; } }
            else if (ch === "," && !quote) { row.push(field); field = ""; }
            else if ((ch === "\n" || ch === "\r") && !quote) { if (ch === "\r" && text[i + 1] === "\n") i += 1; row.push(field); if (row.length > 1) rows.push(row); row = []; field = ""; }
            else { field += ch; }
        }
        if (field || row.length) { row.push(field); rows.push(row); }
        var headers = rows.shift();
        return rows.map(function (values) { var result = {}; headers.forEach(function (header, index) { result[header] = values[index] || ""; }); return result; });
    }
    function aliases(brand, model) {
        return [model, model.replace(/\([^)]*\)/g, "").trim(), brand + " " + model.replace(/\([^)]*\)/g, "").trim()].filter(Boolean);
    }
    fetch(csvUrl).then(function (response) { if (!response.ok) throw new Error("catalog unavailable"); return response.text(); }).then(function (text) {
        var existing = window.mobilesDatabase || [], seen = new Set(existing.map(function (item) { return slug(item.brand + " " + item.model); }));
        parseCsv(text).forEach(function (row) {
            var brand = cell(row, "brand"), model = cell(row, "model"), key = slug(brand + " " + model);
            if (!brand || !model || seen.has(key)) return;
            seen.add(key);
            existing.push({
                id: key, brand: brand, model: model, aliases: aliases(brand, model), series: model.split(/\s+/).slice(0, 2).join(" "),
                releaseYear: (cell(row, "release_date").match(/\b(19|20)\d{2}\b/) || [""])[0],
                androidVersion: cell(row, "operating_system") || cell(row, "os_version"), chipset: cell(row, "chipset"), cpu: cell(row, "cpu"), gpu: cell(row, "gpu"),
                ram: cell(row, "ram"), storage: cell(row, "internal_storage"), display: cell(row, "screen_size"), battery: cell(row, "battery_capacity"), camera: cell(row, "primary_camera_resolution"), network: cell(row, "network"),
                firmware: "Check official source", flash: "Professional assessment", frp: "Service assessment", drivers: "Check manufacturer support", image: "", source: "Global Smartphone Database 2025"
            });
        });
        window.TechFixMobileDatabaseInfo = { totalModels: existing.length, brands: Array.from(new Set(existing.map(function (item) { return item.brand; }))).sort(), source: "Local CSV catalogue" };
        window.dispatchEvent(new CustomEvent("techfixcatalogready", { detail: window.TechFixMobileDatabaseInfo }));
    }).catch(function (error) { console.warn("TechFix catalogue loader:", error.message); });
}());
