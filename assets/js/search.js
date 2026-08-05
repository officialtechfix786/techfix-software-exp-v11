"use strict";

/*
    TECHFIX SOFTWARE EXP v12
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

        if(window.MobileSystem){

            data=data.concat(
                window.MobileSystem.search(keyword)
            );

        }

        if(window.SoftwareSystem){

            data=data.concat(
                window.SoftwareSystem.search(keyword)
            );

        }

        if(window.TechFixPrices){

            data=data.concat(
                window.TechFixPrices.search(keyword)
            );

        }

        if(data.length===0){

            this.results.innerHTML="<div class='search-result-item'>No Results Found</div>";

            return;

        }

        data.forEach(item=>{

            const div=document.createElement("div");

            div.className="search-result-item";

            div.innerHTML=`
                <strong>${item.model || item.name || item.service || "Unknown"}</strong>
                <br>
                <small>${item.brand || ""}</small>
            `;

            div.onclick=()=>{

                localStorage.setItem(
                    "TechFixSelected",
                    JSON.stringify(item)
                );

                window.location.href="model.html";

            };

            this.results.appendChild(div);

        });

    }

};

document.addEventListener("DOMContentLoaded",()=>{

    TechFixSearch.init();

});

window.TechFixSearch=TechFixSearch;