"use strict";

/*
==========================================
TECHFIX SOFTWARE EXP v11
Animation Engine (Fixed)
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       SCROLL REVEAL
    ====================================== */

    const revealItems = document.querySelectorAll(".reveal");

    if (revealItems.length) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });

    }


    /* ======================================
       COUNTER
    ====================================== */

    const counters = document.querySelectorAll("[data-count]");

    if (counters.length) {

        const counterObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target = Number(counter.dataset.count);

                let current = 0;

                const increment = Math.max(target / 80, 1);

                function updateCounter() {

                    current += increment;

                    if (current >= target) {

                        counter.textContent = target;

                    } else {

                        counter.textContent = Math.floor(current);

                        requestAnimationFrame(updateCounter);

                    }

                }

                updateCounter();

                observer.unobserve(counter);

            });

        }, {
            threshold: 0.5
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    }


    /* ======================================
       FLOATING EFFECT
    ====================================== */

    document.querySelectorAll(".floating").forEach(el => {

        el.style.animation =
            "floatAnimation 4s ease-in-out infinite";

    });


    /* ======================================
       SMOOTH SCROLL
    ====================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", e => {

            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});


/* ======================================
   FLOAT KEYFRAMES
====================================== */

const style = document.createElement("style");

style.innerHTML = `
@keyframes floatAnimation{

0%{
transform:translateY(0px);
}

50%{
transform:translateY(-15px);
}

100%{
transform:translateY(0px);
}

}
`;

document.head.appendChild(style);