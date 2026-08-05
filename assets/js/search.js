"use strict";


/*
    TECHFIX SOFTWARE EXP v11
    GLOBAL SEARCH ENGINE

    Handles:
    - Mobile search
    - Software search
    - Price search
    - Results
*/



const TechFixSearch = {



    sources: [],





    init(){


        this.connect();


        this.events();


    },







    connect(){



        if(
            window.MobileSystem
        ){


            this.sources.push(
                "mobiles"
            );


        }



        if(
            window.SoftwareSystem
        ){


            this.sources.push(
                "software"
            );


        }



        if(
            window.TechFixPrices
        ){


            this.sources.push(
                "prices"
            );


        }


    },







    events(){



        const input =
        document.querySelector(
            ".search-input"
        );



        if(!input){

            return;

        }




        input.addEventListener(
            "input",
            () => {


                this.search(
                    input.value
                );


            }
        );


    },







    search(keyword){



        keyword =
        keyword
        .toLowerCase()
        .trim();



        const results = [];



        if(
            keyword === ""
        ){


            this.show(
                []
            );


            return;


        }







        if(
            window.MobileSystem
        ){


            results.push(
                ...window.MobileSystem.search(
                    keyword
                )
            );


        }







        if(
            window.SoftwareSystem
        ){


            results.push(
                ...window.SoftwareSystem.search(
                    keyword
                )
            );


        }







        if(
            window.TechFixPrices
        ){


            results.push(
                ...window.TechFixPrices.search(
                    keyword
                )
            );


        }






        this.show(
            results
        );



    },







    show(results){



        const box =
        document.querySelector(
            ".search-results"
        );



        if(!box){

            return;

        }





        box.innerHTML = "";



        results.forEach(
            item => {


                const div =
                document.createElement(
                    "div"
                );


                div.className =
                "search-result-item";



                div.textContent =
                item.name ||
                item.service ||
                item.model ||
                "Result";



                box.appendChild(
                    div
                );


            }
        );


    }



};







document.addEventListener(
    "DOMContentLoaded",
    () => {


        TechFixSearch.init();


    }
);





window.TechFixSearch =
TechFixSearch;