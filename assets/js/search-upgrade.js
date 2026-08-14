/* =========================================================
   TechFix global model search
   ---------------------------------------------------------
   Loads database/catalog/index.json (~745KB / ~100KB gzip,
   4,100+ models reduced to just the fields search needs) in
   the background, AFTER first paint. It never touches the
   4.3MB source CSV in the browser -- that file is only read
   once, at build time, by tools/build-catalog.py.

   window.TechFixCatalogReady resolves with the merged search
   array once the background fetch finishes. Nothing on the
   page waits for it; pages that want full detail for one
   model fetch database/catalog/brands/<brand>.json instead
   (see pages/model.html).
   ========================================================= */
(function () {
    "use strict";

    var base = location.pathname.includes("/pages/") ? "../" : "";

    function normalize(value) {
        return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    }

    function loadMobiles() {
        if (Array.isArray(window.mobilesDatabase)) return Promise.resolve(window.mobilesDatabase);
        return new Promise(function (resolve) {
            var script = document.createElement("script");
            script.src = base + "database/mobiles.js";
            script.onload = function () { resolve(window.mobilesDatabase || []); };
            script.onerror = function () { resolve([]); };
            document.head.appendChild(script);
        });
    }

    function debounce(fn, wait) {
        var timer = null;
        return function () {
            var args = arguments, ctx = this;
            clearTimeout(timer);
            timer = setTimeout(function () { fn.apply(ctx, args); }, wait);
        };
    }

    function wireSearchBox(input, results, opts) {
        opts = opts || {};

        function render() {
            var terms = normalize(input.value).split(" ").filter(Boolean);
            if (!terms.length) {
                results.innerHTML = '<div class="search-empty">' +
                    (opts.emptyText || "Search 4,000+ mobile models and technical information.") +
                    '</div>';
                return;
            }

            var source = window.TechFixSearchIndex || window.mobilesDatabase || [];
            var found = source.filter(function (item) {
                var text = normalize([
                    item.id, item.brand, item.model, item.aliases,
                    item.androidVersion, item.chipset, item.cpu, item.gpu,
                    item.firmware, item.flash, item.frp, item.drivers,
                    item.network, item.description
                ].join(" "));
                return terms.every(function (term) { return text.includes(term); });
            }).slice(0, opts.limit || 24);

            results.innerHTML = found.length ? found.map(function (item) {
                var page = location.pathname.includes("/pages/") ? "model.html" : "pages/model.html";
                var subtitle = item.chipset || item.androidVersion || "Technical information";
                return '<a class="search-result-item" href="' + page + '?id=' + encodeURIComponent(item.id) +
                    '&brand=' + encodeURIComponent(item.brand) +
                    '"><span>MODEL</span><strong>' + item.brand + ' ' + item.model +
                    '</strong><small>' + subtitle + '</small></a>';
            }).join("") : '<div class="search-empty">No matching model found. Try a brand, model, chipset or firmware term.</div>';
        }

        var debounced = debounce(render, 120);
        input.addEventListener("input", debounced);
        render();
        return render;
    }

    function attach() {
        var input = document.querySelector("#global-search,#search-input,.global-search-input");
        var results = document.querySelector("#search-results,.search-results");
        var panel = document.querySelector("#global-search-panel");
        var open = document.querySelector("#search-button"), close = document.querySelector("#close-search");

        function toggle(show) {
            if (panel) { panel.hidden = !show; panel.classList.toggle("open", show); }
            if (show) setTimeout(function () { if (input) input.focus(); }, 0);
        }
        if (open) open.addEventListener("click", function () { toggle(true); });
        if (close) close.addEventListener("click", function () { toggle(false); });
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

    // Curated list attaches search immediately so the box is usable right
    // away; the full 4,100+ model index merges in a moment later without
    // blocking anything.
    loadMobiles().then(function () {
        attach();
        return fetch(base + "database/catalog/index.json");
    }).then(function (response) {
        if (!response.ok) throw new Error("Catalog index HTTP " + response.status);
        return response.json();
    }).then(function (rows) {
        window.TechFixSearchIndex = rows.map(function (row) {
            return {
                id: row.id, brand: row.b, model: row.m,
                chipset: row.c, androidVersion: row.o, image: row.i
            };
        });
        return window.TechFixSearchIndex;
    }).catch(function (error) {
        console.warn("TechFix catalog index unavailable, search limited to curated models:", error);
        window.TechFixSearchIndex = window.mobilesDatabase || [];
        return window.TechFixSearchIndex;
    }).then(function (index) {
        window.TechFixCatalogReady = Promise.resolve(index);
        // Re-render any already-typed query now that the full index is in.
        document.querySelectorAll("#global-search,#search-input,.global-search-input,#home-search-input")
            .forEach(function (input) { input.dispatchEvent(new Event("input")); });
    });
}());
