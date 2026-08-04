"use strict";


/*
    TECHFIX SOFTWARE EXP v11
    NAVIGATION SYSTEM

    Handles:
    - Mobile menu
    - Header effects
    - Smooth navigation
*/



const TechFixNavigation = {



    init(){


        this.menu();


        this.header();


        this.smoothScroll();


        this.activeLink();


    },







    menu(){


        const button =
        document.querySelector(
            ".menu-toggle"
        );


        const nav =
        document.querySelector(
            ".nav-links"
        );



        if(!button || !nav){

            return;

        }




        button.addEventListener(
            "click",
            () => {


                nav.classList.toggle(
                    "active"
                );


                button.classList.toggle(
                    "open"
                );


            }
        );





        document.addEventListener(
            "click",
            event => {


                if(
                    !nav.contains(event.target)
                    &&
                    !button.contains(event.target)
                ){


                    nav.classList.remove(
                        "active"
                    );


                    button.classList.remove(
                        "open"
                    );


                }


            }
        );


    },









    header(){


        const header =
        document.querySelector(
            "header"
        );



        if(!header){

            return;

        }



        window.addEventListener(
            "scroll",
            () => {


                if(
                    window.scrollY > 50
                ){


                    header.classList.add(
                        "scrolled"
                    );


                }
                else{


                    header.classList.remove(
                        "scrolled"
                    );


                }


            }
        );


    },









    smoothScroll(){


        document.querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {


                link.addEventListener(
                    "click",
                    event => {


                        const target =
                        document.querySelector(
                            link.getAttribute(
                                "href"
                            )
                        );



                        if(target){


                            event.preventDefault();



                            target.scrollIntoView(
                                {
                                    behavior:"smooth"
                                }
                            );


                        }


                    }
                );


            }
        );


    },









    activeLink(){


        const links =
        document.querySelectorAll(
            ".nav-links a"
        );



        links.forEach(
            link => {


                link.addEventListener(
                    "click",
                    () => {


                        links.forEach(
                            item =>
                            item.classList.remove(
                                "active"
                            )
                        );


                        link.classList.add(
                            "active"
                        );


                    }
                );


            }
        );


    }



};







document.addEventListener(
    "DOMContentLoaded",
    () => {


        TechFixNavigation.init();


    }
);





window.TechFixNavigation =
TechFixNavigation;