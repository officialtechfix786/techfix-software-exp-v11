FILE: assets/js/app.js
PART: 4
STATUS: In Progress

```javascript id="4ks8pw"
/* ==========================================
   TECHFIX SOFTWARE EXP v11
   MAIN APPLICATION JAVASCRIPT

   Founder: MIAN AHMAD
========================================== */


"use strict";


/* =========================
   WEBSITE READY
========================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        initializeWebsite();


    }
);



/* =========================
   INITIALIZATION
========================= */


function initializeWebsite(){


    removePreloader();


    headerScrollEffect();


    console.log(
        "TechFix Software EXP v11 Loaded Successfully"
    );


}



/* =========================
   PRELOADER
========================= */


function removePreloader(){


    const loader =
    document.getElementById("preloader");


    if(loader){


        setTimeout(()=>{


            loader.style.opacity="0";


            setTimeout(()=>{


                loader.remove();


            },500);



        },800);


    }


}



/* =========================
   HEADER EFFECT
========================= */


function headerScrollEffect(){


    const header =
    document.getElementById("header");


    if(!header) return;



    window.addEventListener(
        "scroll",
        ()=>{


            if(window.scrollY > 50){


                header.classList.add(
                    "scrolled"
                );


            }

            else {


                header.classList.remove(
                    "scrolled"
                );


            }


        }
    );


}



/* =========================
   SAFE ERROR HANDLER
========================= */


window.addEventListener(
    "error",
    (event)=>{


        console.warn(
            "TechFix Script Warning:",
            event.message
        );


    }
);
```
