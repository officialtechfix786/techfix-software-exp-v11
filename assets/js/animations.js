/* ==========================================
   TECHFIX SOFTWARE EXP v11
   ANIMATION SYSTEM

   Founder: MIAN AHMAD
========================================== */


"use strict";



document.addEventListener(
    "DOMContentLoaded",
    () => {


        initializeAnimations();


    }
);





function initializeAnimations(){


    revealOnScroll();


}





/* =========================
   SCROLL REVEAL SYSTEM
========================= */


function revealOnScroll(){


    const elements =
    document.querySelectorAll(
        ".reveal"
    );



    if(elements.length === 0){

        return;

    }



    const observer =
    new IntersectionObserver(
        (entries)=>{


            entries.forEach(
                (entry)=>{


                    if(entry.isIntersecting){


                        entry.target.classList.add(
                            "show"
                        );


                        observer.unobserve(
                            entry.target
                        );


                    }


                }
            );


        },
        {
            threshold:0.15
        }
    );



    elements.forEach(
        (element)=>{


            observer.observe(
                element
            );


        }
    );


}





/* =========================
   GLOW EFFECT HELPER
========================= */


function addGlow(element){


    if(!element){

        return;

    }



    element.classList.add(
        "glow-active"
    );


}