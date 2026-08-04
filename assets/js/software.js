"use strict";


/*
    TECHFIX SOFTWARE EXP v11
    SOFTWARE DATABASE SYSTEM

    Handles:
    - Software tools
    - Categories
    - Search
    - Cards
*/



const SoftwareSystem = {



    tools:[



        {
            name:"ADB Fastboot Tools",
            logo:"assets/images/software/adb.png",
            category:"Android",
            version:"Latest",
            description:"Android debugging and flashing tools",
            download:"#"
        },


        {
            name:"Platform Tools",
            logo:"assets/images/software/platform.png",
            category:"Android",
            version:"Latest",
            description:"Official Android platform utilities",
            download:"#"
        },


        {
            name:"iOS Repair Tools",
            logo:"assets/images/software/apple.png",
            category:"Apple",
            version:"Latest",
            description:"Apple device service solutions",
            download:"#"
        },


        {
            name:"Firmware Tools",
            logo:"assets/images/software/firmware.png",
            category:"Firmware",
            version:"v11",
            description:"Mobile firmware management",
            download:"#"
        }


    ],







    add(tool){


        this.tools.push(
            tool
        );


    },







    getAll(){


        return this.tools;


    },







    search(keyword){


        keyword =
        keyword
        .toLowerCase()
        .trim();



        return this.tools.filter(
            tool => {


                return JSON.stringify(
                    tool
                )
                .toLowerCase()
                .includes(
                    keyword
                );


            }
        );


    },







    filterByCategory(category){


        return this.tools.filter(
            tool => {


                return tool.category
                .toLowerCase()
                ===
                category
                .toLowerCase();


            }
        );


    }



};








function createSoftwareCard(
    tool
){


    return `


    <div class="software-card">


        <img src="${tool.logo}"
        alt="${tool.name}">


        <h3>
            ${tool.name}
        </h3>


        <p>
            ${tool.description}
        </p>


        <span>
            ${tool.category}
        </span>


        <a href="${tool.download}">
            Download
        </a>


    </div>


    `;


}








function loadSoftware(
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



    SoftwareSystem
    .getAll()
    .forEach(
        tool => {


            box.innerHTML +=
            createSoftwareCard(
                tool
            );


        }
    );


}







window.SoftwareSystem =
SoftwareSystem;


window.createSoftwareCard =
createSoftwareCard;


window.loadSoftware =
loadSoftware;