FILE: assets/js/software.js
PART: 10
STATUS: In Progress

```javascript id="f6m8cz"
/* ==========================================
   TECHFIX SOFTWARE EXP v11
   SOFTWARE DATABASE MODULE

   Founder: MIAN AHMAD
========================================== */


"use strict";



const SoftwareSystem = {


    tools: [],



    add(tool){


        this.tools.push(
            tool
        );


    },



    getAll(){


        return this.tools;


    },



    search(keyword){


        return this.tools.filter(
            tool => {


                return JSON.stringify(tool)
                .toLowerCase()
                .includes(
                    keyword.toLowerCase()
                );


            }
        );


    },



    filterByCategory(category){


        return this.tools.filter(
            tool => {


                return tool.category
                ?.toLowerCase()
                ===
                category.toLowerCase();


            }
        );


    }



};





/* =========================
   SOFTWARE CARD CREATOR

   Official links will be
   added through database.
========================= */


function createSoftware(
    data
){


    return {


        name:data.name || "",

        logo:data.logo ||
        "assets/images/logo/techfix-logo.png",


        description:data.description || "",


        category:data.category || "",


        version:data.version || "",


        website:data.website || "",


        rating:data.rating || "★★★★★ 5/5",


        download:data.download || ""


    };


}




window.SoftwareSystem =
SoftwareSystem;


window.createSoftware =
createSoftware;
```
