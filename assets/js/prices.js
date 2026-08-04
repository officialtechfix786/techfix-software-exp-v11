FILE: assets/js/prices.js
PART: 11
STATUS: In Progress

```javascript id="1q4s8n"
/* ==========================================
   TECHFIX SOFTWARE EXP v11
   SOLUTION PRICING MODULE

   Founder: MIAN AHMAD
========================================== */


"use strict";



const SolutionPrices = [


    {
        category: "Android",
        service: "FRP Remove",
        price: "1000 - 1500"
    },


    {
        category: "Android",
        service: "Flash",
        price: "1000 - 2000"
    },


    {
        category: "Android",
        service: "IMEI Repair",
        price: "2500 - 4000"
    },


    {
        category: "Android",
        service: "Network Repair",
        price: "2500 - 3500"
    },


    {
        category: "Android",
        service: "Boot Repair",
        price: "2000 - 3000"
    },


    {
        category: "Apple",
        service: "Restore",
        price: "1500"
    },


    {
        category: "Apple",
        service: "Flash",
        price: "2000"
    },


    {
        category: "Apple",
        service: "Passcode Solution",
        price: "3000"
    },


    {
        category: "Apple",
        service: "Activation Solution",
        price: "3500"
    },


    {
        category: "Apple",
        service: "iCloud Related Solution",
        price: "6000+"
    }


];





function getPrices(){


    return SolutionPrices;


}




function searchPrice(
    keyword
){


    return SolutionPrices.filter(
        item => {


            return JSON.stringify(item)
            .toLowerCase()
            .includes(
                keyword.toLowerCase()
            );


        }
    );


}




window.SolutionPrices =
SolutionPrices;


window.getPrices =
getPrices;


window.searchPrice =
searchPrice;
```
