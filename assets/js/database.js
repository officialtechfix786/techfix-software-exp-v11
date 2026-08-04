FILE: assets/js/database.js
PART: 8
STATUS: In Progress

```javascript
/* ==========================================
   TECHFIX SOFTWARE EXP v11
   DATABASE CORE SYSTEM

   Founder: MIAN AHMAD
========================================== */


"use strict";



const TechFixDatabase = {


    mobiles: [],


    software: [],


    brands: [],


    solutions: [],


    prices: []

};





/* =========================
   DATABASE LOADER
========================= */


function loadDatabase(){


    console.log(
        "TechFix Database System Ready"
    );


    return TechFixDatabase;


}





/* =========================
   ADD DATABASE DATA
========================= */


function addDatabaseItem(
    category,
    data
){


    if(
        !TechFixDatabase[category]
    ){

        console.warn(
            "Invalid database category:",
            category
        );

        return;

    }



    TechFixDatabase[category].push(
        data
    );


}





/* =========================
   SEARCH DATABASE
========================= */


function searchDatabase(
    category,
    keyword
){


    if(
        !TechFixDatabase[category]
    ){

        return [];

    }



    return TechFixDatabase[category]
    .filter(
        item => {


            return JSON.stringify(item)
            .toLowerCase()
            .includes(
                keyword.toLowerCase()
            );


        }
    );


}




/* =========================
   EXPORT SYSTEM
========================= */


window.TechFixDatabase =
TechFixDatabase;


window.loadDatabase =
loadDatabase;


window.addDatabaseItem =
addDatabaseItem;


window.searchDatabase =
searchDatabase;
```
