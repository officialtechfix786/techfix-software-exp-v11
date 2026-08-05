"use strict";


/*
    TECHFIX SOFTWARE EXP v11
    MOBILE DATABASE SYSTEM

    Handles:
    - Mobile models
    - Search
    - Brand filter
    - Cards
*/



const MobileSystem = {



    devices:[





        {
            brand:"Apple",
            model:"iPhone 17 Pro",
            image:"assets/images/mobiles/iphone17pro.png",
            android:"",
            chipset:"A19 Pro",
            repair:"Software & Hardware Solutions"
        },



        {
            brand:"Google",
            model:"Pixel Series",
            image:"assets/images/mobiles/pixel.png",
            android:"Android",
            chipset:"Google Tensor",
            repair:"Firmware & Repair"
        },



        {
            brand:"Samsung",
            model:"Galaxy Series",
            image:"assets/images/mobiles/samsung.png",
            android:"Android",
            chipset:"Exynos / Snapdragon",
            repair:"Software Solutions"
        }





    ],







    add(device){


        this.devices.push(
            device
        );


    },







    getAll(){


        return this.devices;


    },







    search(keyword){



        keyword =
        keyword
        .toLowerCase()
        .trim();



        return this.devices.filter(
            device => {


                return JSON.stringify(
                    device
                )
                .toLowerCase()
                .includes(
                    keyword
                );


            }
        );


    },







    filterByBrand(brand){



        return this.devices.filter(
            device => {


                return device.brand
                .toLowerCase()
                ===
                brand
                .toLowerCase();


            }
        );


    }






};









function createMobileCard(
    device
){


    return `


    <div class="mobile-card">


        <img src="${device.image}"
        alt="${device.model}">


        <h3>
            ${device.model}
        </h3>


        <p>
            Brand:
            ${device.brand}
        </p>


        <p>
            Chipset:
            ${device.chipset}
        </p>


        <p>
            ${device.repair}
        </p>


    </div>


    `;


}








function loadMobiles(
    container
){



    const box =
    document.querySelector(
        container
    );



    if(!box){

        return;

    }



    box.innerHTML="";



    MobileSystem
    .getAll()
    .forEach(
        device => {


            box.innerHTML +=
            createMobileCard(
                device
            );


        }
    );


}








window.MobileSystem =
MobileSystem;


window.createMobileCard =
createMobileCard;


window.loadMobiles =
loadMobiles;