"use strict";


/*
    TECHFIX SOFTWARE EXP v11
    UTILITY SYSTEM

    Common helper functions
*/



const TechFixUtils = {




    select(selector){

        return document.querySelector(
            selector
        );

    },





    selectAll(selector){

        return [
            ...document.querySelectorAll(
                selector
            )
        ];

    },







    create(tag, className=""){


        const element =
        document.createElement(
            tag
        );


        if(className){

            element.className =
            className;

        }


        return element;


    },







    formatPrice(price){


        return "Rs. " +
        Number(price)
        .toLocaleString();


    },







    save(key,value){


        localStorage.setItem(
            key,
            JSON.stringify(value)
        );


    },







    get(key){


        const data =
        localStorage.getItem(
            key
        );



        if(!data){

            return null;

        }



        try{


            return JSON.parse(
                data
            );


        }
        catch(error){


            return data;


        }


    },







    remove(key){


        localStorage.removeItem(
            key
        );


    },







    notify(message,type="info"){



        const box =
        document.createElement(
            "div"
        );



        box.className =
        "techfix-notification " +
        type;



        box.textContent =
        message;



        document.body.appendChild(
            box
        );



        setTimeout(
            () => {


                box.remove();


            },
            3000
        );


    },







    debounce(func,delay=300){



        let timer;



        return function(...args){


            clearTimeout(
                timer
            );


            timer =
            setTimeout(
                () => {


                    func.apply(
                        this,
                        args
                    );


                },
                delay
            );


        };


    }



};







window.TechFixUtils =
TechFixUtils;