"use strict";

/*
    TECHFIX SOFTWARE EXP v13
    GLOBAL SEARCH ENGINE
*/

const TechFixSearch = {

    input:null,
    results:null,

    init(){

        this.input=document.querySelector(".search-input");
        this.results=document.querySelector(".search-results");

        if(!this.input || !this.results) return;

        this.input.addEventListener("input",()=>{

            this.search(this.input.value);

        });

    },

    search(keyword){

        keyword=keyword.toLowerCase().trim();

        this.results.innerHTML="";

        if(keyword==="") return;

        let data=[];

        // MOBILES
        if(window.MobileSystem && typeof window.MobileSystem.getAll==="function"){

            data=data.concat(
                window.MobileSystem.getAll().filter(item=>
                    item.brand.toLowerCase().includes(keyword) ||
                    item.series.toLowerCase().includes(keyword) ||
                    item.model.toLowerCase().includes(keyword)
                )
            );

        }

        // SOFTWARE
        if(window.SoftwareSystem){

            data=data.concat(
                window.SoftwareSystem.search(keyword)
            );

        }

        // SERVICES
        if(window.TechFixPrices){

            data=data.concat(
                window.TechFixPrices.search(keyword)
            );

        }

        if(data.length===0){

            this.results.innerHTML="<div class='search-result-item'>No Results Found</div>";

            return;

        }

        data.slice(0,10).forEach(item=>{

            const div=document.createElement("div");

            div.className="search-result-item";

            const title=item.model || item.name || item.service || "Unknown";
            const subtitle=item.brand || item.category || "";

            div.innerHTML=`
                <strong>${title}</strong>
                <br>
                <small>${subtitle}</small>
            `;

            div.style.cursor="pointer";

            div.onclick=()=>{

                // Mobile result
                if(item.model){

                    localStorage.setItem(
                        "TechFixSelected",
                        JSON.stringify(item)
                    );

                    window.location.href="model.html";
                    return;

                }

                // Software result
                if(item.name){

                    alert("Software page coming soon: " + item.name);
                    return;

                }

                // Service result
                if(item.service){

                    alert("Service selected: " + item.service);
                    return;

                }

            };

            this.results.appendChild(div);

        });

    }

};

document.addEventListener("DOMContentLoaded",()=>{

    TechFixSearch.init();

});

window.TechFixSearch=TechFixSearch;