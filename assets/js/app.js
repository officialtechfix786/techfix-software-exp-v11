"use strict";


/*
    TECHFIX SOFTWARE EXP v11
    MAIN APPLICATION CORE

    Handles:
    - Website initialization
    - Preloader
    - Page ready state
    - Global events
    - System status
*/



const TechFixApp = {



    version:"v11",



    founder:"MIAN AHMAD",



    status:"ONLINE",




    init(){


        this.preloader();


        this.systemReady();


        this.globalEvents();


        console.log(
            "TechFix Software EXP " +
            this.version +
            " Loaded"
        );


    },





    preloader(){


        const loader =
        document.getElementById(
            "preloader"
        );



        if(loader){


            window.addEventListener(
                "load",
                () => {


                    setTimeout(
                        () => {


                            loader.classList.add(
                                "hide"
                            );


                        },
                        700
                    );


                }
            );


        }


    },







    systemReady(){


        document.body.classList.add(
            "techfix-ready"
        );



        const status =
        document.querySelector(
            ".system-status"
        );



        if(status){


            status.innerHTML =
            `
            <span></span>
            SYSTEM ONLINE
            `;


        }


    },







    globalEvents(){



        window.addEventListener(
            "error",
            error => {


                console.warn(
                    "TechFix Error:",
                    error.message
                );


            }
        );



        document.addEventListener(
            "visibilitychange",
            () => {


                if(
                    document.visibilityState
                    ===
                    "visible"
                ){


                    console.log(
                        "System Active"
                    );


                }


            }
        );


    }



};







document.addEventListener(
    "DOMContentLoaded",
    () => {


        TechFixApp.init();


    }
);






window.TechFixApp =
TechFixApp;