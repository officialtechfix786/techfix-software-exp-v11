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
/* ===========================
   INITIAL BRAND DATABASE
=========================== */

const BRANDS = [

{
name:"Samsung",
series:[
"Galaxy S",
"Galaxy A",
"Galaxy M",
"Galaxy F",
"Galaxy Note",
"Galaxy Z Fold",
"Galaxy Z Flip"
]
},

{
name:"Apple",
series:[
"iPhone"
]
},

{
name:"Google",
series:[
"Pixel"
]
},

{
name:"Xiaomi",
series:[
"Xiaomi",
"Redmi",
"Poco"
]
},

{
name:"OnePlus",
series:["OnePlus"]
},

{
name:"Oppo",
series:["Oppo"]
},

{
name:"Vivo",
series:["Vivo"]
},

{
name:"Realme",
series:["Realme"]
},

{
name:"Motorola",
series:["Moto G","Moto Edge"]
},

{
name:"Huawei",
series:["Huawei","Nova","Mate","P"]
},

{
name:"Honor",
series:["Honor"]
},

{
name:"Infinix",
series:["Hot","Note","Zero","GT"]
},

{
name:"Tecno",
series:["Spark","Camon","Phantom","Pova"]
},

{
name:"Nothing",
series:["Phone"]
}

];

BRANDS.forEach(brand=>{
    TechFixDatabase.add("brands",brand);
});

TechFixDatabase.save();
console.log("Brands Loaded");
/* ===========================
   SAMSUNG GALAXY S SERIES
=========================== */

const samsungSeries = [

"S1",
"S2",
"S3",
"S4",
"S5",
"S6",
"S6 Edge",
"S7",
"S7 Edge",
"S8",
"S8+",
"S9",
"S9+",
"S10e",
"S10",
"S10+",
"S10 5G",
"S20",
"S20+",
"S20 Ultra",
"S21",
"S21+",
"S21 Ultra",
"S22",
"S22+",
"S22 Ultra",
"S23",
"S23+",
"S23 Ultra",
"S24",
"S24+",
"S24 Ultra",
"S25",
"S25+",
"S25 Ultra"

];

samsungSeries.forEach(model=>{

TechFixDatabase.add("mobiles",{

brand:"Samsung",

series:"Galaxy S",

model:model,

solutions:{
firmware:true,
frp:true,
imei:true,
bypass:true,
cpid:false
},

prices:{
frp:1000,
imei:0,
bypassSignal:6000,
bypassNoSignal:4500,
cpid:0
}

});

});

TechFixDatabase.save();

console.log("Samsung S Series Loaded");
/* ===========================
   S24 ULTRA CUSTOM DATA
=========================== */

const customModels = [

{
brand:"Samsung",
series:"Galaxy S",
model:"S24 Ultra",

prices:{
frp:15000,
imei:8000,
cpid:0,
bypassSignal:6000,
bypassNoSignal:4500
},

solutions:{
firmware:true,
frp:true,
imeiRepair:true,
cpid:false,
icloud:false,
bypass:true,
root:true
}

},

{
brand:"Google",
series:"Pixel",
model:"Pixel",

prices:{
frp:5000,
imei:2000,
cpid:5000,
bypassSignal:0,
bypassNoSignal:0
},

solutions:{
firmware:true,
frp:true,
imeiRepair:true,
cpid:true
}

},

{
brand:"Apple",
series:"iPhone",

model:"iCloud",

prices:{
signalBypass:6000,
noSignalBypass:4500
},

solutions:{
icloud:true
}

}

];

customModels.forEach(item=>{

TechFixDatabase.add("prices",item.prices);

TechFixDatabase.add("solutions",item.solutions);

});

TechFixDatabase.save();

console.log("Custom Prices Loaded");
