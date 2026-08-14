/* Local, GitHub Pages-safe global model search. */
(function () {
    "use strict";
    var base = location.pathname.includes("/pages/") ? "../" : "";
    function normalize(value) { return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
    function loadMobiles() {
        if (Array.isArray(window.mobilesDatabase)) return Promise.resolve();
        return new Promise(function (resolve, reject) {
            var script = document.createElement("script");
            script.src = base + "database/mobiles.js";
            script.onload = resolve; script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    function parseCsv(text) {
        var rows = [], row = [], field = "", quoted = false;
        for (var i = 0; i < text.length; i++) {
            var ch = text[i];
            if (ch === '"') {
                if (quoted && text[i + 1] === '"') { field += '"'; i++; }
                else { quoted = !quoted; }
            } else if (ch === ',' && !quoted) { row.push(field); field = ""; }
            else if ((ch === '\n' || ch === '\r') && !quoted) {
                if (ch === '\r' && text[i + 1] === '\n') i++;
                row.push(field); rows.push(row); row = []; field = "";
            } else { field += ch; }
        }
        if (field.length || row.length) { row.push(field); rows.push(row); }
        var headers = rows.shift() || [];
        return rows.filter(function (r) { return r.some(Boolean); }).map(function (values) {
            var item = {};
            headers.forEach(function (key, index) { item[key] = String(values[index] || "").trim(); });
            return item;
        });
    }
    function wireSearchBox(input, results, opts) {
        opts = opts || {};
        function render() {
            var terms = normalize(input.value).split(" ").filter(Boolean);
            if (!terms.length) {
                results.innerHTML = '<div class="search-empty">' + (opts.emptyText || "Search 4,000+ mobile models and technical information.") + '</div>';
                return;
            }
            var found = (window.mobilesDatabase || []).filter(function (item) {
                var text = normalize([item.id,item.brand,item.model,item.aliases,item.androidVersion,item.chipset,item.cpu,item.gpu,item.firmware,item.flash,item.frp,item.drivers,item.network,item.description].join(" "));
                return terms.every(function (term) { return text.includes(term); });
            }).slice(0, opts.limit || 24);
            results.innerHTML = found.length ? found.map(function (item) {
                var page = location.pathname.includes("/pages/") ? "model.html" : "pages/model.html";
                return '<a class="search-result-item" href="' + page + '?model=' + encodeURIComponent(item.model) + '"><span>MODEL</span><strong>' + item.brand + ' ' + item.model + '</strong><small>' + (item.chipset || item.androidVersion || "Technical information") + '</small></a>';
            }).join("") : '<div class="search-empty">No matching model found. Try a brand, model, chipset or firmware term.</div>';
        }
        input.addEventListener("input", render);
        render();
        return render;
    }
    function attach() {
        var input = document.querySelector("#global-search,#search-input,.global-search-input");
        var results = document.querySelector("#search-results,.search-results");
        var panel = document.querySelector("#global-search-panel");
        var open = document.querySelector("#search-button"), close = document.querySelector("#close-search");
        if (open) open.addEventListener("click", function () { toggle(true); });
        if (close) close.addEventListener("click", function () { toggle(false); });
        function toggle(show) { if (panel) { panel.hidden = !show; panel.classList.toggle("open", show); } if (show) setTimeout(function () { input.focus(); }, 0); }
        document.addEventListener("keydown", function (event) { if (event.key === "Escape") toggle(false); });
        if (input && results) wireSearchBox(input, results);

        var homeInput = document.querySelector("#home-search-input");
        var homeResults = document.querySelector("#home-search-results");
        if (homeInput && homeResults) {
            wireSearchBox(homeInput, homeResults, {
                limit: 8,
                emptyText: "Type a brand or model — e.g. Galaxy S24, iPhone 17, Redmi Note 13."
            });
        }
    }
    window.TechFixCatalogReady = loadMobiles().then(function () { return fetch(base + "database/mobile-catalog.csv"); }).then(function (response) {
        if (!response.ok) throw new Error("Catalog HTTP " + response.status);
        return response.text();
    }).then(function (text) {
        var db = window.mobilesDatabase || [];
        var byKey = new Map(db.map(function (item) { return [normalize(item.brand + " " + item.model), item]; }));
        parseCsv(text).forEach(function (row) {
            var key = normalize(row.brand + " " + row.model);
            if (!row.brand || !row.model) return;
            var existing = byKey.get(key);
            var item = existing || { id: key.replace(/ /g, "-"), brand: row.brand, model: row.model, aliases: [row.model] };
            item.androidVersion = item.androidVersion || row.operating_system || row.os_version;
            item.chipset = item.chipset || row.chipset;
            item.cpu = item.cpu || row.cpu;
            item.gpu = item.gpu || row.gpu;
            item.network = item.network || row.network;
            item.image = item.image || row.image_url;
            item.image_url = row.image_url || item.image_url;
            item.detail_url = row.detail_url || item.detail_url;
            item.description = item.description || (row.device_type ? row.device_type + " • " + (row.release_date || "") : "");
            item.firmware = item.firmware || "Check official source";
            item.flash = item.flash || "Professional assessment";
            item.frp = item.frp || "Service assessment";
            item.drivers = item.drivers || "Check manufacturer support";
            if (!existing) { db.push(item); byKey.set(key, item); }
        });
        window.mobilesDatabase = db;
        attach();
        return db;
    }).catch(function (error) { console.warn("TechFix catalog fallback:", error); attach(); return window.mobilesDatabase || []; });
}());
