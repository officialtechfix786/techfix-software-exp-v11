FILE: assets/js/mobiles.js
PART: 9
STATUS: In Progress

```javascript id="q3zq8c"
/* ==========================================
   TECHFIX SOFTWARE EXP v11
   MOBILE DATABASE MODULE

   Founder: MIAN AHMAD
========================================== */


"use strict";



const MobileSystem = {


    devices: [],



    add(device){


        this.devices.push(
            device
        );


    },



    getAll(){


        return this.devices;


    },



    search(keyword){


        return this.devices.filter(
            device => {


                return JSON.stringify(device)
                .toLowerCase()
                .includes(
                    keyword.toLowerCase()
                );


            }
        );


    },



    filterByBrand(brand){


        return this.devices.filter(
            device => {


                return device.brand
                ?.toLowerCase()
                ===
                brand.toLowerCase();


            }
        );


    }



};





/* =========================
   SAMPLE STRUCTURE ONLY

   Real devices will be added
   from database files.
========================= */


function createMobile(
    data
){


    return {


        brand:data.brand || "",

        model:data.model || "",

        image:data.image || "assets/images/logo/techfix-logo.png",

        android:data.android || "",

        chipset:data.chipset || "",

        boot:data.boot || "",

        firmware:data.firmware || "",

        repair:data.repair || "",

        notes:data.notes || ""


    };


}




window.MobileSystem =
MobileSystem;


window.createMobile =
createMobile;
```
