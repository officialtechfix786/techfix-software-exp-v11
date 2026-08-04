FILE: assets/js/utils.js
PART: 12
STATUS: In Progress

```javascript id="3m6x9v"
/* ==========================================
   TECHFIX SOFTWARE EXP v11
   UTILITY FUNCTIONS

   Founder: MIAN AHMAD
========================================== */


"use strict";



/* =========================
   SAFE SELECTOR
========================= */


function select(
    selector
){


    return document.querySelector(
        selector
    );


}





/* =========================
   SELECT ALL
========================= */


function selectAll(
    selector
){


    return document.querySelectorAll(
        selector
    );


}





/* =========================
   IMAGE FALLBACK SYSTEM
========================= */


function imageFallback(
    image
){


    if(!image.src ||
       image.src === ""
    ){


        image.src =
        "assets/images/logo/techfix-logo.png";


    }


}





/* =========================
   TEXT FORMATTER
========================= */


function capitalize(
    text
){


    if(!text){

        return "";

    }



    return text.charAt(0)
    .toUpperCase()
    +
    text.slice(1);


}





/* =========================
   SAFE LOG
========================= */


function techfixLog(
    message
){


    console.log(
        "[TECHFIX]",
        message
    );


}




window.select =
select;


window.selectAll =
selectAll;


window.imageFallback =
imageFallback;


window.capitalize =
capitalize;


window.techfixLog =
techfixLog;
```
