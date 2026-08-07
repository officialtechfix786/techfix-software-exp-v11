"use strict";

/*
==========================================
TECHFIX SOFTWARE EXP v13
MOBILE DATABASE
==========================================
*/

const MobileSystem={

models:[

{
id:1,
brand:"Samsung",
series:"Galaxy S",
model:"Galaxy S25 Ultra",
image:"assets/images/mobiles/samsung-s25-ultra.png",
prices:{frp:3000,imei:15000,cpid:22000,bypassSignal:6000,bypassNoSignal:7500},
solutions:{FRP:true,IMEI:true,CPID:true,Firmware:true,Network:true}
},

{
id:2,
brand:"Samsung",
series:"Galaxy S",
model:"Galaxy S25 Plus",
image:"assets/images/mobiles/samsung-s25-plus.png",
prices:{frp:3000,imei:15000,cpid:22000,bypassSignal:6000,bypassNoSignal:7500},
solutions:{FRP:true,IMEI:true,CPID:true,Firmware:true}
},

{
id:3,
brand:"Samsung",
series:"Galaxy S",
model:"Galaxy S25",
image:"assets/images/mobiles/samsung-s25.png",
prices:{frp:2800,imei:14000,cpid:21000,bypassSignal:5800,bypassNoSignal:7000},
solutions:{FRP:true,IMEI:true,CPID:true,Firmware:true}
},

{
id:4,
brand:"Samsung",
series:"Galaxy S",
model:"Galaxy S24 Ultra",
image:"assets/images/mobiles/samsung-s24-ultra.png",
prices:{frp:2500,imei:12000,cpid:18000,bypassSignal:5000,bypassNoSignal:6500},
solutions:{FRP:true,IMEI:true,CPID:true,Firmware:true}
},

{
id:5,
brand:"Samsung",
series:"Galaxy S",
model:"Galaxy S24 Plus",
image:"assets/images/mobiles/samsung-s24-plus.png",
prices:{frp:2500,imei:12000,cpid:18000,bypassSignal:5000,bypassNoSignal:6500},
solutions:{FRP:true,IMEI:true,CPID:true,Firmware:true}
},

{
id:6,
brand:"Samsung",
series:"Galaxy S",
model:"Galaxy S24",
image:"assets/images/mobiles/samsung-s24.png",
prices:{frp:2200,imei:11000,cpid:17000,bypassSignal:4500,bypassNoSignal:6000},
solutions:{FRP:true,IMEI:true,CPID:true,Firmware:true}
}

],

search(keyword){

keyword = keyword.toLowerCase().trim();

return this.models.filter(item=>{

const brand = (item.brand || "").toLowerCase();
const series = (item.series || "").toLowerCase();
const model = (item.model || "").toLowerCase();

return (
brand.includes(keyword) ||
series.includes(keyword) ||
model.includes(keyword)
);

});

},

getModel(name){

return this.models.find(item=>item.model===name);

},

getAll(){

return this.models;

}

};
if(window.SamsungDatabase){

MobileSystem.models.push(...SamsungDatabase);

}

if(window.AppleDatabase){

MobileSystem.models.push(...AppleDatabase);

}

if(window.XiaomiDatabase){

MobileSystem.models.push(...XiaomiDatabase);

}

window.MobileSystem=MobileSystem;