"use strict";

/*
    TECHFIX SOFTWARE EXP
    AUTO LOGO / ICON SYSTEM

    Purpose:
    - Automatically shows a colorful icon/logo on every
      software card and mobile brand card WITHOUT needing
      any uploaded image files.
    - Reads the card's title text, matches it against a
      keyword dictionary, and injects a Font Awesome icon
      inside a colorful gradient badge.
*/

const AutoLogos = {

    // keyword -> { icon class, gradient colors }
    rules: [
        // Mobile Brands
        { match: ["apple", "iphone", "ios", "imazing", "3utools", "icloud", "itunes"], icon: "fa-brands fa-apple", colors: ["#e6e6e6", "#8b8b8b"] },
        { match: ["android", "pixel", "google"], icon: "fa-brands fa-google", colors: ["#34d399", "#059669"] },
        { match: ["samsung"], icon: "fa-solid fa-mobile-screen-button", colors: ["#1d4ed8", "#3b82f6"] },
        { match: ["xiaomi", "redmi", "poco", "mi "], icon: "fa-solid fa-mobile-screen-button", colors: ["#f97316", "#ea580c"] },
        { match: ["oneplus"], icon: "fa-solid fa-mobile-screen-button", colors: ["#ef4444", "#b91c1c"] },
        { match: ["oppo"], icon: "fa-solid fa-mobile-screen-button", colors: ["#22c55e", "#15803d"] },
        { match: ["vivo"], icon: "fa-solid fa-mobile-screen-button", colors: ["#3b82f6", "#1e40af"] },
        { match: ["realme"], icon: "fa-solid fa-mobile-screen-button", colors: ["#facc15", "#ca8a04"] },
        { match: ["tecno"], icon: "fa-solid fa-mobile-screen-button", colors: ["#06b6d4", "#0e7490"] },
        { match: ["infinix"], icon: "fa-solid fa-mobile-screen-button", colors: ["#a855f7", "#7e22ce"] },

        // Software / Tools categories
        { match: ["adb", "fastboot", "platform tool"], icon: "fa-solid fa-terminal", colors: ["#00eaff", "#0891b2"] },
        { match: ["flash", "firmware"], icon: "fa-solid fa-bolt", colors: ["#facc15", "#f97316"] },
        { match: ["unlock", "frp", "bypass"], icon: "fa-solid fa-lock-open", colors: ["#8b5cf6", "#6d28d9"] },
        { match: ["security", "network", "audit", "cyber", "vpn", "firewall"], icon: "fa-solid fa-shield-halved", colors: ["#00ff88", "#059669"] },
        { match: ["driver"], icon: "fa-solid fa-microchip", colors: ["#60a5fa", "#2563eb"] },
        { match: ["repair", "service", "servicing"], icon: "fa-solid fa-screwdriver-wrench", colors: ["#f472b6", "#db2777"] },
        { match: ["backup", "restore"], icon: "fa-solid fa-clock-rotate-left", colors: ["#38bdf8", "#0284c7"] },
        { match: ["music"], icon: "fa-solid fa-music", colors: ["#fb7185", "#e11d48"] },
        { match: ["tv"], icon: "fa-solid fa-tv", colors: ["#a78bfa", "#7c3aed"] },
        { match: ["chimera", "octoplus", "sigma", "miracle", "gcpro", "hydra", "pandora", "z3x"], icon: "fa-solid fa-wand-magic-sparkles", colors: ["#00eaff", "#8b5cf6"] },
        { match: ["wifi", "wireless"], icon: "fa-solid fa-wifi", colors: ["#22d3ee", "#0891b2"] },
        { match: ["download"], icon: "fa-solid fa-download", colors: ["#34d399", "#059669"] }
    ],

    // fallback icon when nothing matches
    fallback: { icon: "fa-solid fa-toolbox", colors: ["#00eaff", "#8b5cf6"] },

    findRule(text) {
        const t = text.toLowerCase();
        for (const rule of this.rules) {
            for (const keyword of rule.match) {
                if (t.includes(keyword)) {
                    return rule;
                }
            }
        }
        return this.fallback;
    },

    buildBadge(text) {
        const rule = this.findRule(text);
        const badge = document.createElement("div");
        badge.className = "auto-logo-badge";
        badge.style.background =
            `linear-gradient(135deg, ${rule.colors[0]}, ${rule.colors[1]})`;
        badge.innerHTML = `<i class="${rule.icon}"></i>`;
        return badge;
    },

    injectInto(card, titleSelector) {
        if (card.querySelector(".auto-logo-badge")) return;

        const titleEl = titleSelector ?
            card.querySelector(titleSelector) :
            card;

        const text = (titleEl ? titleEl.textContent : card.textContent).trim();
        if (!text) return;

        const badge = this.buildBadge(text);
        card.insertBefore(badge, card.firstChild);
        card.classList.add("has-auto-logo");
    },

    run() {
        document.querySelectorAll(".service-card").forEach(card => {
            this.injectInto(card, "h3");
        });

        document.querySelectorAll(".brand-card").forEach(card => {
            this.injectInto(card, null);
        });

        document.querySelectorAll(".software-card").forEach(card => {
            this.injectInto(card, "h3");
        });

        document.querySelectorAll(".mobile-card").forEach(card => {
            this.injectInto(card, "h3");
        });
    }

};

document.addEventListener("DOMContentLoaded", () => {
    AutoLogos.run();
});

window.AutoLogos = AutoLogos;
