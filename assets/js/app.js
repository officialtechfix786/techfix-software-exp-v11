/* =========================================================
   TechFix Software EXP v11
   Global Application JavaScript
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

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