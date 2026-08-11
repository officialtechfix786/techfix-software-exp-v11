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
        var lines = text.split(/\r?\n/), headers = lines.shift().split(",");
        return lines.map(function (line) { var values = line.match(/("[^"]*(?:""[^"]*)*"|[^,]*)(?:,|$)/g) || []; var row = {}; headers.forEach(function (key, index) { row[key] = String(values[index] || "").replace(/^"|"[,]?$/g, "").replace(/""/g, '"'); }); return row; });
    }
    function attach() {
        var input = document.querySelector("#global-search,#search-input,.global-search-input");
        var results = document.querySelector("#search-results,.search-results");
        var panel = document.querySelector("#global-search-panel");
        var open = document.querySelector("#search-button"), close = document.querySelector("#close-search");
        if (!input || !results) return;
        function toggle(show) { if (panel) { panel.hidden = !show; panel.classList.toggle("is-open", show); } if (show) setTimeout(function () { input.focus(); }, 0); }
        function search() {
            var terms = normalize(input.value).split(" ").filter(Boolean);
            if (!terms.length) { results.innerHTML = '<div class="search-empty">Search 4,000+ mobile models and technical information.</div>'; return; }
            var found = (window.mobilesDatabase || []).filter(function (item) {
                var text = normalize([item.id,item.brand,item.model,item.aliases,item.androidVersion,item.chipset,item.cpu,item.gpu,item.firmware,item.flash,item.frp,item.drivers,item.network,item.description].join(" "));
                return terms.every(function (term) { return text.includes(term); });
            }).slice(0, 24);
            results.innerHTML = found.length ? found.map(function (item) {
                var page = location.pathname.includes("/pages/") ? "model.html" : "pages/model.html";
                return '<a class="search-result-item" href="' + page + '?model=' + encodeURIComponent(item.model) + '"><span>MODEL</span><strong>' + item.brand + ' ' + item.model + '</strong><small>' + (item.chipset || item.androidVersion || "Technical information") + '</small></a>';
            }).join("") : '<div class="search-empty">No matching model found. Try a brand, model, chipset or firmware term.</div>';
        }
        if (open) open.addEventListener("click", function () { toggle(true); });
        if (close) close.addEventListener("click", function () { toggle(false); });
        input.addEventListener("input", search);
        document.addEventListener("keydown", function (event) { if (event.key === "Escape") toggle(false); });
        search();
    }
    loadMobiles().then(function () { return fetch(base + "database/mobile-catalog.csv"); }).then(function (response) { return response.text(); }).then(function (text) {
        var db = window.mobilesDatabase || [], seen = new Set(db.map(function (item) { return normalize(item.brand + " " + item.model); }));
        parseCsv(text).forEach(function (row) { var key = normalize(row.brand + " " + row.model); if (row.brand && row.model && !seen.has(key)) { seen.add(key); db.push({id:key.replace(/ /g,"-"),brand:row.brand,model:row.model,aliases:[row.model],androidVersion:row.operating_system||row.os_version,chipset:row.chipset,cpu:row.cpu,gpu:row.gpu,firmware:"Check official source",flash:"Professional assessment",frp:"Service assessment",drivers:"Check manufacturer support",network:row.network}); } });
        window.mobilesDatabase = db; attach();
    }).catch(attach);
}());
