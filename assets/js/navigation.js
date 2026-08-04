FILE: assets/js/navigation.js
PART: 5
STATUS: In Progress

```javascript
/* ==========================================
   TECHFIX SOFTWARE EXP v11
   NAVIGATION SYSTEM

   Founder: MIAN AHMAD
========================================== */


"use strict";



document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        initializeNavigation();


    }
);





function initializeNavigation(){


    setupMobileMenu();


}





/* =========================
   MOBILE MENU SYSTEM
========================= */


function setupMobileMenu(){


    const menuButton =
    document.querySelector(
        ".menu-toggle"
    );


    const navigation =
    document.querySelector(
        ".nav-links"
    );


    if(
        !menuButton ||
        !navigation
    ){

        return;

    }



    menuButton.addEventListener(
        "click",
        ()=>{


            navigation.classList.toggle(
                "active"
            );


            menuButton.classList.toggle(
                "open"
            );


        }
    );



}



/* =========================
   CLOSE MENU ON LINK CLICK
========================= */


document.addEventListener(
    "click",
    (event)=>{


        if(
            event.target.matches(
                ".nav-links a"
            )
        ){


            const navigation =
            document.querySelector(
                ".nav-links"
            );


            if(navigation){

                navigation.classList.remove(
                    "active"
                );

            }


        }


    }
);
```
