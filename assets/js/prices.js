"use strict";


/*
    TECHFIX SOFTWARE EXP v11
    SOLUTION PRICING SYSTEM

    Handles:
    - Android pricing
    - Apple pricing
    - Search
    - Filtering
    - Rating
    - Price cards
*/



const TechFixPrices = {


    services: [


        {
            id:1,
            category:"Android",
            service:"FRP Solution",
            price:"1000 - 1500",
            rating:"★★★★★ 4.9/5"
        },


        {
            id:2,
            category:"Android",
            service:"Flash Service",
            price:"1000 - 2000",
            rating:"★★★★★ 4.8/5"
        },


        {
            id:3,
            category:"Android",
            service:"IMEI Repair",
            price:"2500 - 4000",
            rating:"★★★★★ 4.9/5"
        },


        {
            id:4,
            category:"Android",
            service:"Network Repair",
            price:"2500 - 3500",
            rating:"★★★★★ 4.8/5"
        },


        {
            id:5,
            category:"Android",
            service:"Boot Repair",
            price:"2000 - 3000",
            rating:"★★★★★ 4.7/5"
        },


        {
            id:6,
            category:"Apple",
            service:"Restore",
            price:"1500",
            rating:"★★★★★ 4.9/5"
        },


        {
            id:7,
            category:"Apple",
            service:"Flash",
            price:"2000",
            rating:"★★★★★ 4.9/5"
        },


        {
            id:8,
            category:"Apple",
            service:"Passcode Solution",
            price:"3000",
            rating:"★★★★★ 4.8/5"
        },


        {
            id:9,
            category:"Apple",
            service:"Activation Solution",
            price:"3500",
            rating:"★★★★★ 4.9/5"
        },


        {
            id:10,
            category:"Apple",
            service:"iCloud Related",
            price:"6000+",
            rating:"★★★★★ 5/5"
        }


    ],





    getAll(){


        return this.services;


    },





    search(keyword){


        return this.services.filter(
            item => {


                return JSON.stringify(item)
                .toLowerCase()
                .includes(
                    keyword
                    .toLowerCase()
                );


            }
        );


    },





    filter(category){


        return this.services.filter(
            item => {


                return item.category
                .toLowerCase()
                ===
                category
                .toLowerCase();


            }
        );


    }





};







function createPriceCard(
    item
){


    return `

    <div class="price-card">

        <h3>
            ${item.service}
        </h3>

        <p>
            Category:
            ${item.category}
        </p>

        <strong>
            Rs. ${item.price}
        </strong>

        <p>
            ${item.rating}
        </p>

    </div>

    `;


}







function loadPrices(
    container
){


    const element =
    document.querySelector(
        container
    );



    if(!element){

        return;

    }



    element.innerHTML = "";



    TechFixPrices
    .getAll()
    .forEach(
        item => {


            element.innerHTML +=
            createPriceCard(
                item
            );


        }
    );


}







window.TechFixPrices =
TechFixPrices;


window.loadPrices =
loadPrices;


window.createPriceCard =
createPriceCard;