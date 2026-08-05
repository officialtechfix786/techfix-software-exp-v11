"use strict";


/*
    TECHFIX SOFTWARE EXP v11
    DATABASE CORE SYSTEM

    Handles:
    - Mobile data
    - Software data
    - Price data
    - Brand data
    - Local storage
*/



const TechFixDatabase = {



    data:{


        mobiles:[],


        software:[],


        brands:[],


        solutions:[],


        prices:[]


    },







    add(
        category,
        item
    ){



        if(
            !this.data[category]
        ){


            console.warn(
                "Invalid database category:",
                category
            );


            return false;


        }



        this.data[category]
        .push(
            item
        );



        return true;


    },







    get(
        category
    ){



        if(
            !this.data[category]
        ){


            return [];


        }



        return this.data[category];


    },







    search(
        category,
        keyword
    ){



        const items =
        this.get(
            category
        );



        keyword =
        keyword
        .toLowerCase()
        .trim();





        return items.filter(
            item => {


                return JSON.stringify(
                    item
                )
                .toLowerCase()
                .includes(
                    keyword
                );


            }
        );


    },







    save(){



        localStorage.setItem(
            "TechFixDatabase",
            JSON.stringify(
                this.data
            )
        );


    },







    load(){



        const saved =
        localStorage.getItem(
            "TechFixDatabase"
        );



        if(saved){


            this.data =
            JSON.parse(
                saved
            );


        }



        return this.data;


    }







};








document.addEventListener(
    "DOMContentLoaded",
    () => {


        TechFixDatabase.load();



        console.log(
            "TechFix Database Ready"
        );


    }
);






window.TechFixDatabase =
TechFixDatabase;