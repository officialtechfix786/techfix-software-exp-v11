/* =========================================================
   TechFix Software EXP
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
    // Performance: keep the large catalog images out of the critical path.
    document.querySelectorAll("img:not([loading])").forEach((img) => {
        if (!img.classList.contains("brand-logo") && !img.classList.contains("footer-logo") && !img.classList.contains("home-hero-robot")) {
            img.loading = "lazy";
            img.decoding = "async";
        }
    });


    const assetBase = location.pathname.includes("/pages/") ? "../" : "";

    const premiumLogo = location.pathname.includes("/pages/")
        ? "../assets/images/logo/techfix-logo.svg"
        : "assets/images/logo/techfix-logo.svg";
    document.querySelectorAll('img[src*="techfix-logo.png"]').forEach((image) => {
        image.src = premiumLogo;
        image.alt = "TechFix Software EXP";
    });

    /* Keep the published official social destinations consistent on every page. */
    const officialSocialLinks = {
        youtube: "https://youtube.com/@techfixsoftwareexp?si=Yh2g7NzPrJ7un-Mm",
        facebook: "https://www.facebook.com/share/1BgXiWBiWg/",
        tiktok: "https://www.tiktok.com/@techfixsoft?_r=1&_t=ZS-98fviSwDtGD"
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

    document.querySelectorAll(".tool-card").forEach((card) => {
        const heading = card.querySelector("h3");
        if (!heading) return;
        const name = heading.textContent.trim();
        if (name === "Apple Devices" && !card.querySelector(".tool-logo")) {
            const image = document.createElement("img");
            image.className = "tool-logo";
            image.src = assetBase + "assets/images/software/apple-devices.svg";
            image.alt = "Apple Devices logo";
            image.width = 160; image.height = 48; image.loading = "lazy"; image.decoding = "async";
            heading.before(image);
        }
    });

    configureCardSearch({
        inputId: "cyber-search",
        clearId: "clear-cyber-search",
        containerId: "cyber-tools",
        countId: "cyber-tool-count",
        logos: {
            "Burp Suite": assetBase + "assets/images/cyber/burp-suite.svg",
            "Metasploit": assetBase + "assets/images/cyber/metasploit.svg",
            "Nmap": assetBase + "assets/images/cyber/nmap.svg",
            "Wireshark": assetBase + "assets/images/cyber/wireshark.svg",
            "Hashcat": assetBase + "assets/images/cyber/hashcat.svg",
            "Aircrack-ng": assetBase + "assets/images/cyber/aircrack-ng.svg",
            "John the Ripper": assetBase + "assets/images/cyber/john-the-ripper.svg",
            "Gobuster": assetBase + "assets/images/cyber/gobuster.svg",
            "FFUF": assetBase + "assets/images/cyber/ffuf.svg",
            "Nikto": assetBase + "assets/images/cyber/nikto.svg",
            "SQLMap": assetBase + "assets/images/cyber/sqlmap.svg",
            "Subfinder": assetBase + "assets/images/cyber/subfinder.svg"
        }
    });

    /* =====================================================
       MOBILE MENU (legacy .mobile-menu-button / .main-nav —
       only used by model.html)
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
       MOBILE MENU (drawer version — #menu-toggle /
       #mobile-drawer / #close-menu / #menu-overlay — used by
       every other page: index, mobiles, android, apple,
       downloads, cyber-security, contact.
       BUGFIX: this markup existed on 8 of 9 pages but had no
       matching JS anywhere in the codebase, so the hamburger
       button did nothing when tapped — the entire mobile nav
       was dead site-wide except on model.html.
       ===================================================== */

    const drawerToggle = document.getElementById("menu-toggle");
    const drawer = document.getElementById("mobile-drawer");
    const drawerClose = document.getElementById("close-menu");
    const drawerOverlay = document.getElementById("menu-overlay");

    if (drawerToggle && drawer) {

        const setDrawer = (open) => {
            drawer.classList.toggle("open", open);
            if (drawerOverlay) drawerOverlay.classList.toggle("open", open);
            drawerToggle.setAttribute("aria-expanded", String(open));
            document.body.style.overflow = open ? "hidden" : "";
        };

        drawerToggle.addEventListener("click", () => {
            setDrawer(!drawer.classList.contains("open"));
        });

        if (drawerClose) {
            drawerClose.addEventListener("click", () => setDrawer(false));
        }

        if (drawerOverlay) {
            drawerOverlay.addEventListener("click", () => setDrawer(false));
        }

        drawer.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setDrawer(false));
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") setDrawer(false);
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

    const getMobiles = () =>
        Array.isArray(window.mobilesDatabase)
            ? window.mobilesDatabase
            : Array.isArray(window.mobileDatabase)
                ? window.mobileDatabase
                : [];

    const getPrices = () =>
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
            getMobiles()
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
                        `${location.pathname.includes("/pages/") ? "model.html" : "pages/model.html"}?model=${encodeURIComponent(
                            mobile.model || ""
                        )}`

                }));


        const priceResults =
            getPrices()
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
                        location.pathname.includes("/pages/") ? "contact.html" : "pages/contact.html"

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
       CONTACT FORM — static-site safe
       ===================================================== */
    const contactForm = document.getElementById("contact-form");
    const contactStatus = document.getElementById("contact-form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("contact-name")?.value.trim() || "";
            const email = document.getElementById("contact-email")?.value.trim() || "";
            const subject = document.getElementById("contact-subject")?.value.trim() || "TechFix Support";
            const message = document.getElementById("contact-message")?.value.trim() || "";

            if (!name || !email || !subject || !message) {
                if (contactStatus) contactStatus.textContent = "Please complete all fields.";
                return;
            }

            const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
            const mailto = `mailto:officialtechfix786@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            if (contactStatus) contactStatus.textContent = "Opening your email app…";
            window.location.href = mailto;
        });
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
                        (location.pathname.includes("/pages/") ? "../" : "") +
                        "assets/images/logo/techfix-logo.png";

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

        version: "TechFix Software EXP",

        mobiles: getMobiles(),

        prices: getPrices(),

        searchDatabase

    };


    console.log(
        "TechFix Software EXP loaded successfully."
    );

});
