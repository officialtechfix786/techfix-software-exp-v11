/* =========================================================
   TechFix Software EXP v11
   Global Application JavaScript
   ========================================================= */

"use strict";

// Every page loads this shared script. Add one local favicon without relying
// on a root-level /favicon.ico request (important for GitHub Pages projects).
if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    favicon.href = location.pathname.includes("/pages/")
        ? "../favicon.svg"
        : "favicon.svg";
    document.head.appendChild(favicon);
}

// The home preloader had no release logic, which left it covering the hero.
// Hide it as soon as the deferred application script runs instead of waiting
// for external resources such as web fonts.
const initialPreloader = document.getElementById("preloader");
if (initialPreloader) {
    initialPreloader.hidden = true;
    initialPreloader.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {

    /* Keep the published official social destinations consistent on every page. */
    const officialSocialLinks = {
        youtube: "https://youtube.com/@techfixsoftwareexp?si=5WDDCAeIeMO1RYxZ",
        facebook: "https://www.facebook.com/share/1BPnTyc7Gm/",
        tiktok: "https://www.tiktok.com/@techfixexp?_r=1&_t=ZP-983oUpkYdEl"
    };

    document.querySelectorAll('a[href*="youtube.com"], a[href*="facebook.com"], a[href*="tiktok.com"]').forEach((link) => {
        const href = link.href;
        if (href.includes("youtube.com")) link.href = officialSocialLinks.youtube;
        if (href.includes("facebook.com")) link.href = officialSocialLinks.facebook;
        if (href.includes("tiktok.com")) link.href = officialSocialLinks.tiktok;
    });

    document.querySelectorAll('a[href^="http"]')
        .forEach((link) => {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        });

    /* =====================================================
       DOWNLOAD AND CYBERSECURITY CARD SEARCH
       ===================================================== */

    const configureCardSearch = ({ inputId, clearId, containerId, countId, logos }) => {
        const input = document.getElementById(inputId);
        const clearButton = document.getElementById(clearId);
        const container = document.getElementById(containerId);
        const count = document.getElementById(countId);

        if (!input || !container) return;

        const cards = Array.from(container.querySelectorAll(".tool-card"));

        cards.forEach((card) => {
            const heading = card.querySelector("h3");
            const name = heading ? heading.textContent.trim() : "";
            const logo = logos[name];

            if (logo && !card.querySelector(".tool-logo")) {
                const image = document.createElement("img");
                image.className = "tool-logo";
                image.src = logo;
                image.alt = `${name} logo`;
                image.width = 160;
                image.height = 48;
                image.loading = "lazy";
                image.decoding = "async";
                heading.before(image);
            }
        });

        const filterCards = () => {
            const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
            let visible = 0;

            cards.forEach((card) => {
                const matches = terms.every((term) => card.textContent.toLowerCase().includes(term));
                card.hidden = !matches;
                if (matches) visible += 1;
            });

            if (count) {
                count.textContent = `${visible} ${visible === 1 ? "Resource" : "Resources"}`;
            }
        };

        input.addEventListener("input", filterCards);

        if (clearButton) {
            clearButton.addEventListener("click", () => {
                input.value = "";
                filterCards();
                input.focus();
            });
        }

        filterCards();
    };

    configureCardSearch({
        inputId: "download-search",
        clearId: "clear-download-search",
        containerId: "software-results",
        countId: "software-count",
        logos: {
            "3uTools": "../assets/images/software/3utools.svg",
            "iMazing": "../assets/images/software/imazing.svg",
            "iTunes": "../assets/images/software/itunes.svg",
            "Android Platform Tools": "../assets/images/software/android-platform-tools.svg"
        }
    });

    configureCardSearch({
        inputId: "cyber-search",
        clearId: "clear-cyber-search",
        containerId: "cyber-tools",
        countId: "cyber-tool-count",
        logos: {
            "Burp Suite": "../assets/images/cyber/burp-suite.svg",
            "Metasploit": "../assets/images/cyber/metasploit.svg",
            "Nmap": "../assets/images/cyber/nmap.svg",
            "Wireshark": "../assets/images/cyber/wireshark.svg",
            "Hashcat": "../assets/images/cyber/hashcat.svg",
            "Aircrack-ng": "../assets/images/cyber/aircrack-ng.svg",
            "John the Ripper": "../assets/images/cyber/john-the-ripper.svg",
            "Gobuster": "../assets/images/cyber/gobuster.svg",
            "FFUF": "../assets/images/cyber/ffuf.svg",
            "Nikto": "../assets/images/cyber/nikto.svg"
        }
    });

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton =
        document.querySelector(".mobile-menu-button");

    const mainNav =
        document.querySelector(".main-nav");

    if (menuButton && mainNav) {

        menuButton.addEventListener("click", () => {

            const opened =
                mainNav.classList.toggle("mobile-open");

            menuButton.setAttribute(
                "aria-expanded",
                String(opened)
            );

        });

        mainNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("mobile-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });
    }


    /* =====================================================
       HEADER SCROLL
       ===================================================== */

    const header =
        document.querySelector(".site-header");

    const updateHeader = () => {

        if (!header) return;

        header.classList.toggle(
            "header-scrolled",
            window.scrollY > 40
        );

    };

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       GLOBAL SEARCH
       ===================================================== */

    const searchInput =
        document.querySelector(
            "#global-search, #search-input, .global-search-input"
        );

    const searchResults =
        document.querySelector(
            "#search-results, .search-results"
        );


    /*
     * Detect database variables automatically.
     */

    const mobiles =
        Array.isArray(window.mobilesDatabase)
            ? window.mobilesDatabase
            : Array.isArray(window.mobileDatabase)
                ? window.mobileDatabase
                : [];

    const prices =
        Array.isArray(window.pricesDatabase)
            ? window.pricesDatabase
            : Array.isArray(window.priceDatabase)
                ? window.priceDatabase
                : [];


    function normalize(value) {

        return String(value ?? "")
            .trim()
            .toLowerCase();

    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function searchDatabase(query) {

        const term =
            normalize(query);

        if (!term) {
            return [];
        }


        const mobileResults =
            mobiles
                .filter((mobile) => {

                    const text = [

                        mobile.brand,
                        mobile.model,
                        mobile.androidVersion,
                        mobile.chipset,
                        mobile.bootType,
                        mobile.frp,
                        mobile.firmware,
                        mobile.flash,
                        mobile.imeiRepair,
                        mobile.networkRepair,
                        mobile.unlock,
                        mobile.drivers,
                        mobile.description

                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();

                    return text.includes(term);

                })
                .map((mobile) => ({

                    type: "Mobile",

                    title:
                        mobile.model || "Unknown Model",

                    subtitle:
                        mobile.brand || "Mobile",

                    url:
                        `pages/model.html?model=${encodeURIComponent(
                            mobile.model || ""
                        )}`

                }));


        const priceResults =
            prices
                .filter((item) => {

                    const text = [

                        item.service,
                        item.model,
                        item.category,
                        item.platform,
                        item.description

                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();

                    return text.includes(term);

                })
                .map((item) => ({

                    type: "Service",

                    title:
                        item.service || "TechFix Service",

                    subtitle:
                        item.price
                            ? `Price: ${item.price}`
                            : "Contact TechFix",

                    url:
                        "pages/contact.html"

                }));


        return [
            ...mobileResults,
            ...priceResults
        ].slice(0, 20);

    }


    function showResults(results) {

        if (!searchResults) {
            return;
        }


        if (!results.length) {

            searchResults.innerHTML = `
                <div class="search-empty">
                    No results found in TechFix database.
                </div>
            `;

            return;
        }


        searchResults.innerHTML =
            results
                .map((result) => {

                    return `
                        <a
                            class="search-result-item"
                            href="${result.url}"
                        >
                            <span>
                                ${escapeHTML(result.type)}
                            </span>

                            <strong>
                                ${escapeHTML(result.title)}
                            </strong>

                            <small>
                                ${escapeHTML(result.subtitle)}
                            </small>
                        </a>
                    `;

                })
                .join("");

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                showResults(
                    searchDatabase(
                        searchInput.value
                    )
                );

            }
        );

    }


    /* =====================================================
       IMAGE FALLBACK
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.addEventListener(
                "error",
                () => {

                    const fallback =
                        "/techfix-software-exp-v11/assets/images/logo/techfix-logo.png";

                    if (
                        image.src.includes(
                            "techfix-logo.png"
                        )
                    ) {
                        return;
                    }

                    image.src = fallback;

                },
                {
                    once: true
                }
            );

        });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    document
        .querySelectorAll(".main-nav a")
        .forEach((link) => {

            const href =
                link.getAttribute("href") || "";

            const linkPage =
                href.split("/").pop();


            if (linkPage === currentPage) {

                link.classList.add("active");

            }

        });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    document
        .querySelectorAll("[data-current-year]")
        .forEach((element) => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =====================================================
       GLOBAL TECHFIX OBJECT
       ===================================================== */

    window.TechFixApp = {

        version: "v11",

        mobiles,

        prices,

        searchDatabase

    };


    console.log(
        "TechFix Software EXP v11 loaded successfully."
    );

});
