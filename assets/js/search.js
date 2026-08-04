FILE: assets/js/search.js
PART: 6
STATUS: In Progress

```javascript
/* ==========================================
   TECHFIX SOFTWARE EXP v11
   GLOBAL SEARCH SYSTEM

   Founder: MIAN AHMAD
========================================== */


"use strict";



document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        initializeSearch();


    }
);




function initializeSearch(){


    const searchInput =
    document.querySelector(
        "#global-search"
    );


    if(!searchInput){

        return;

    }



    searchInput.addEventListener(
        "input",
        (event)=>{


            const value =
            event.target.value
            .toLowerCase()
            .trim();



            performSearch(value);


        }
    );

}




function performSearch(query){


    if(query.length === 0){

        clearSearchResults();

        return;

    }



    /*
       Database connection will be added
       in database.js and search data files.
    */


    console.log(
        "Searching:",
        query
    );


}





function clearSearchResults(){


    const results =
    document.querySelector(
        "#search-results"
    );


    if(results){

        results.innerHTML = "";

    }


}
```
