"use strict";

/*
===========================================
TECHFIX SOFTWARE EXP v13
MAIN ENGINE
Founder: MIAN AHMAD
===========================================
*/

const TechFix = {

    mobiles: [],
    software: [],
    prices: [],

    init(){

        console.log("TechFix Main Engine Loaded");

    }

};

window.TechFix = TechFix;

document.addEventListener("DOMContentLoaded",()=>{

    TechFix.init();

});
/*
===========================================
TECHFIX MOBILE DATABASE
===========================================
*/

TechFix.mobiles.push(

{
id:1,
brand:"Samsung",
series:"Galaxy S",
model:"Galaxy S25 Ultra",
image:"assets/images/mobiles/samsung-s25-ultra.png",
prices:{
frp:3000,
imei:15000,
cpid:22000,
bypassSignal:6000,
bypassNoSignal:7500
},
solutions:{
FRP:true,
IMEI:true,
CPID:true,
Firmware:true,
Network:true
}
},

{
id:2,
brand:"Samsung",
series:"Galaxy S",
model:"Galaxy S25 Plus",
image:"assets/images/mobiles/samsung-s25-plus.png",
prices:{
frp:3000,
imei:15000,
cpid:22000,
bypassSignal:6000,
bypassNoSignal:7500
},
solutions:{
FRP:true,
IMEI:true,
CPID:true,
Firmware:true
}
},

{
id:3,
brand:"Samsung",
series:"Galaxy S",
model:"Galaxy S25",
image:"assets/images/mobiles/samsung-s25.png",
prices:{
frp:2800,
imei:14000,
cpid:21000,
bypassSignal:5800,
bypassNoSignal:7000
},
solutions:{
FRP:true,
IMEI:true,
CPID:true,
Firmware:true
}
}

);

console.log("Mobile Database Loaded");
/*
===========================================
SEARCH ENGINE
===========================================
*/

TechFix.search=function(keyword){

keyword=(keyword||"").toLowerCase().trim();

if(keyword==="") return [];

return TechFix.mobiles.filter(item=>{

const brand=(item.brand||"").toLowerCase();

const series=(item.series||"").toLowerCase();

const model=(item.model||"").toLowerCase();

return(

brand.includes(keyword)||
series.includes(keyword)||
model.includes(keyword)

);

});

};

document.addEventListener("DOMContentLoaded",()=>{

const input=document.getElementById("global-search");

const results=document.getElementById("search-results");

if(!input||!results) return;

input.addEventListener("input",()=>{

const data=TechFix.search(input.value);

results.innerHTML="";

if(data.length===0){

results.innerHTML="<div class='search-result-item'>No Results Found</div>";

return;

}

data.forEach(item=>{

const div=document.createElement("div");

div.className="search-result-item";

div.innerHTML=`
<strong>${item.model}</strong><br>
<small>${item.brand} • ${item.series}</small>
`;

results.appendChild(div);

});

});

});

console.log("Search Engine Loaded");
/*
===========================================
MODEL SELECTOR
===========================================
*/

TechFix.openModel=function(id){

const phone=TechFix.mobiles.find(item=>item.id===id);

if(!phone) return;

localStorage.setItem(
"TechFixSelectedModel",
JSON.stringify(phone)
);

window.location.href="model.html";

};


/*
===========================================
SEARCH RESULT EVENTS
===========================================
*/

document.addEventListener("DOMContentLoaded",()=>{

const input=document.getElementById("global-search");

const results=document.getElementById("search-results");

if(!input||!results) return;

input.addEventListener("input",()=>{

const data=TechFix.search(input.value);

results.innerHTML="";

if(data.length===0){

results.innerHTML="<div class='search-result-item'>No Results Found</div>";

return;

}

data.forEach(item=>{

const card=document.createElement("div");

card.className="search-result-item";

card.innerHTML=`

<strong>${item.model}</strong>

<br>

<small>

${item.brand} • ${item.series}

</small>

`;

card.addEventListener("click",()=>{

TechFix.openModel(item.id);

});

results.appendChild(card);

});

});

});


/*
===========================================
MODEL PAGE LOADER
===========================================
*/

document.addEventListener("DOMContentLoaded",()=>{

const page=document.getElementById("model-page");

if(!page) return;

const saved=localStorage.getItem("TechFixSelectedModel");

if(!saved){

page.innerHTML="<h2>No Model Selected</h2>";

return;

}

const phone=JSON.parse(saved);

page.innerHTML=`

<h1>${phone.model}</h1>

<p><b>Brand:</b> ${phone.brand}</p>

<p><b>Series:</b> ${phone.series}</p>

<img
src="${phone.image}"
alt="${phone.model}"
style="max-width:300px;width:100%;">

<h3>Prices</h3>

<ul>

<li>FRP : ${phone.prices.frp}</li>

<li>IMEI : ${phone.prices.imei}</li>

<li>CPID : ${phone.prices.cpid}</li>

<li>Signal Bypass : ${phone.prices.bypassSignal}</li>

<li>No Signal Bypass : ${phone.prices.bypassNoSignal}</li>

</ul>

`;

});

console.log("Model Engine Loaded");
/*
===========================================
APPLE DATABASE
===========================================
*/

TechFix.mobiles.push(

{
id:1001,
brand:"Apple",
series:"iPhone",
model:"iPhone 16 Pro Max",
image:"assets/images/mobiles/iphone-16-pro-max.png",
prices:{
frp:0,
imei:0,
cpid:0,
bypassSignal:7000,
bypassNoSignal:8500
},
solutions:{
Restore:true,
Flash:true,
Activation:true,
Bypass:true
}
},

{
id:1002,
brand:"Apple",
series:"iPhone",
model:"iPhone 16 Pro",
image:"assets/images/mobiles/iphone-16-pro.png",
prices:{
frp:0,
imei:0,
cpid:0,
bypassSignal:6500,
bypassNoSignal:8000
},
solutions:{
Restore:true,
Flash:true,
Activation:true,
Bypass:true
}
},

{
id:1003,
brand:"Apple",
series:"iPhone",
model:"iPhone 16 Plus",
image:"assets/images/mobiles/iphone-16-plus.png",
prices:{
frp:0,
imei:0,
cpid:0,
bypassSignal:6200,
bypassNoSignal:7800
},
solutions:{
Restore:true,
Flash:true,
Activation:true,
Bypass:true
}
},

{
id:1004,
brand:"Apple",
series:"iPhone",
model:"iPhone 16",
image:"assets/images/mobiles/iphone-16.png",
prices:{
frp:0,
imei:0,
cpid:0,
bypassSignal:6000,
bypassNoSignal:7500
},
solutions:{
Restore:true,
Flash:true,
Activation:true,
Bypass:true
}
}

);

console.log("Apple Database Loaded");
/*
===========================================
XIAOMI / REDMI / POCO DATABASE
===========================================
*/

TechFix.mobiles.push(

{
id:2001,
brand:"Xiaomi",
series:"Xiaomi",
model:"Xiaomi 15 Ultra",
image:"assets/images/mobiles/xiaomi-15-ultra.png",
prices:{
frp:2200,
imei:11000,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true,
Network:true
}
},

{
id:2002,
brand:"Xiaomi",
series:"Xiaomi",
model:"Xiaomi 15 Pro",
image:"assets/images/mobiles/xiaomi-15-pro.png",
prices:{
frp:2200,
imei:11000,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true
}
},

{
id:2003,
brand:"Redmi",
series:"Redmi Note",
model:"Redmi Note 14 Pro+",
image:"assets/images/mobiles/redmi-note-14-pro-plus.png",
prices:{
frp:1800,
imei:9000,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true
}
},

{
id:2004,
brand:"POCO",
series:"POCO F",
model:"POCO F7 Ultra",
image:"assets/images/mobiles/poco-f7-ultra.png",
prices:{
frp:1800,
imei:9000,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true
}
}

);

console.log("Xiaomi Database Loaded");
/*
===========================================
VIVO / OPPO / REALME / ONEPLUS DATABASE
===========================================
*/

TechFix.mobiles.push(

{
id:3001,
brand:"Vivo",
series:"X",
model:"Vivo X200 Pro",
image:"assets/images/mobiles/vivo-x200-pro.png",
prices:{
frp:1800,
imei:8500,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true,
Network:true
}
},

{
id:3002,
brand:"Vivo",
series:"V",
model:"Vivo V50",
image:"assets/images/mobiles/vivo-v50.png",
prices:{
frp:1500,
imei:8000,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true
}
},

{
id:3003,
brand:"Oppo",
series:"Find X",
model:"Oppo Find X8 Pro",
image:"assets/images/mobiles/oppo-find-x8-pro.png",
prices:{
frp:1800,
imei:9000,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true,
Network:true
}
},

{
id:3004,
brand:"Oppo",
series:"Reno",
model:"Oppo Reno 13 Pro",
image:"assets/images/mobiles/oppo-reno-13-pro.png",
prices:{
frp:1600,
imei:8500,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true
}
},

{
id:3005,
brand:"Realme",
series:"GT",
model:"Realme GT 7 Pro",
image:"assets/images/mobiles/realme-gt-7-pro.png",
prices:{
frp:1700,
imei:8500,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true
}
},

{
id:3006,
brand:"OnePlus",
series:"OnePlus",
model:"OnePlus 13",
image:"assets/images/mobiles/oneplus-13.png",
prices:{
frp:1800,
imei:9000,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true,
Network:true
}
}

);

console.log("Vivo Oppo Realme OnePlus Database Loaded");
/*
===========================================
PIXEL / MOTOROLA / HUAWEI / NOKIA
TECNO / INFINIX DATABASE
===========================================
*/

TechFix.mobiles.push(

{
id:4001,
brand:"Google",
series:"Pixel",
model:"Pixel 9 Pro XL",
image:"assets/images/mobiles/pixel-9-pro-xl.png",
prices:{
frp:2500,
imei:12000,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true,
Network:true
}
},

{
id:4002,
brand:"Google",
series:"Pixel",
model:"Pixel 9 Pro",
image:"assets/images/mobiles/pixel-9-pro.png",
prices:{
frp:2500,
imei:12000,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true
}
},

{
id:4003,
brand:"Motorola",
series:"Edge",
model:"Motorola Edge 50 Ultra",
image:"assets/images/mobiles/motorola-edge-50-ultra.png",
prices:{
frp:1800,
imei:9000,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true
}
},

{
id:4004,
brand:"Huawei",
series:"Pura",
model:"Huawei Pura 70 Ultra",
image:"assets/images/mobiles/huawei-pura-70-ultra.png",
prices:{
frp:2000,
imei:9500,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true
}
},

{
id:4005,
brand:"Nokia",
series:"XR",
model:"Nokia XR21",
image:"assets/images/mobiles/nokia-xr21.png",
prices:{
frp:1500,
imei:7000,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true
}
},

{
id:4006,
brand:"Tecno",
series:"Camon",
model:"Tecno Camon 40 Pro",
image:"assets/images/mobiles/tecno-camon-40-pro.png",
prices:{
frp:1200,
imei:6500,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true
}
},

{
id:4007,
brand:"Infinix",
series:"Note",
model:"Infinix Note 50 Pro",
image:"assets/images/mobiles/infinix-note-50-pro.png",
prices:{
frp:1200,
imei:6500,
cpid:0,
bypassSignal:0,
bypassNoSignal:0
},
solutions:{
FRP:true,
IMEI:true,
Firmware:true
}
}

);

console.log("Other Brands Database Loaded");
/*
===========================================
SOFTWARE DATABASE
===========================================
*/

TechFix.software.push(

{
id:1,
name:"ADB Platform Tools",
category:"Android",
version:"Latest",
description:"Official Android Debug Bridge Tools",
download:"#"
},

{
id:2,
name:"Samsung Odin",
category:"Samsung",
version:"Latest",
description:"Samsung Flash Tool",
download:"#"
},

{
id:3,
name:"SP Flash Tool",
category:"MediaTek",
version:"Latest",
description:"MediaTek Flash Utility",
download:"#"
},

{
id:4,
name:"Mi Flash Tool",
category:"Xiaomi",
version:"Latest",
description:"Official Xiaomi Flash Tool",
download:"#"
},

{
id:5,
name:"QFIL",
category:"Qualcomm",
version:"Latest",
description:"Qualcomm Flash Tool",
download:"#"
},

{
id:6,
name:"3uTools",
category:"Apple",
version:"Latest",
description:"iPhone Flash & Management Tool",
download:"#"
},

{
id:7,
name:"iTunes",
category:"Apple",
version:"Latest",
description:"Apple Device Management",
download:"#"
},

{
id:8,
name:"Android Utility",
category:"Android",
version:"Latest",
description:"Professional Android Utility",
download:"#"
}

);

console.log("Software Database Loaded");


/*
===========================================
PROFESSIONAL SEARCH
===========================================
*/

TechFix.globalSearch=function(keyword){

keyword=(keyword||"").toLowerCase().trim();

let results=[];

TechFix.mobiles.forEach(item=>{

if(

(item.brand||"").toLowerCase().includes(keyword)||
(item.series||"").toLowerCase().includes(keyword)||
(item.model||"").toLowerCase().includes(keyword)

){

results.push({
type:"mobile",
data:item
});

}

});

TechFix.software.forEach(item=>{

if(

(item.name||"").toLowerCase().includes(keyword)||
(item.category||"").toLowerCase().includes(keyword)

){

results.push({
type:"software",
data:item
});

}

});

return results;

};

console.log("Professional Search Loaded");
/*
===========================================
PRICE DATABASE
===========================================
*/

TechFix.prices.push(

{
category:"Samsung",
service:"FRP Unlock",
price:"PKR 1,000 - 15,000"
},

{
category:"Samsung",
service:"IMEI Repair",
price:"PKR 5,000 - 20,000"
},

{
category:"Samsung",
service:"CPID",
price:"PKR 10,000 - 25,000"
},

{
category:"Apple",
service:"iCloud Signal Bypass",
price:"PKR 6,000"
},

{
category:"Apple",
service:"iCloud No Signal",
price:"PKR 4,500"
},

{
category:"Google Pixel",
service:"IMEI Patch",
price:"PKR 2,000"
},

{
category:"Software",
service:"Firmware Flash",
price:"Contact Us"
}

);

console.log("Price Database Loaded");


/*
===========================================
SEARCH RESULT UI
===========================================
*/

TechFix.renderSearch=function(keyword){

const box=document.getElementById("search-results");

if(!box) return;

box.innerHTML="";

const results=TechFix.globalSearch(keyword);

if(results.length===0){

box.innerHTML="<div class='search-result-item'>No Results Found</div>";

return;

}

results.forEach(item=>{

const card=document.createElement("div");

card.className="search-result-item";

if(item.type==="mobile"){

card.innerHTML=`

<h3>${item.data.model}</h3>

<p>${item.data.brand}</p>

`;

card.onclick=function(){

TechFix.openModel(item.data.id);

};

}

if(item.type==="software"){

card.innerHTML=`

<h3>${item.data.name}</h3>

<p>${item.data.category}</p>

`;

}

box.appendChild(card);

});

};

document.addEventListener("DOMContentLoaded",()=>{

const input=document.getElementById("global-search");

if(!input) return;

input.addEventListener("input",function(){

TechFix.renderSearch(this.value);

});

});

console.log("Search UI Loaded");
/*
===========================================
BRAND SYSTEM
===========================================
*/

TechFix.brands = [

"Samsung",
"Apple",
"Xiaomi",
"Redmi",
"POCO",
"Google",
"OnePlus",
"Oppo",
"Vivo",
"Realme",
"Tecno",
"Infinix",
"Motorola",
"Huawei",
"Nokia"

];

TechFix.renderBrands=function(){

const grid=document.querySelector(".brand-grid");

if(!grid) return;

grid.innerHTML="";

TechFix.brands.forEach(brand=>{

const card=document.createElement("div");

card.className="brand-card";

card.textContent=brand;

card.onclick=function(){

document.getElementById("global-search").value=brand;

TechFix.renderSearch(brand);

window.scrollTo({

top:document.querySelector(".search-section").offsetTop-80,

behavior:"smooth"

});

};

grid.appendChild(card);

});

};

document.addEventListener("DOMContentLoaded",()=>{

TechFix.renderBrands();

});

console.log("Brand System Loaded");
/*
===========================================
FINAL ENGINE
===========================================
*/

TechFix.start=function(){

console.log("================================");
console.log("TECHFIX SOFTWARE EXP v13");
console.log("Founder : MIAN AHMAD");
console.log("System Ready");
console.log("Mobiles :",TechFix.mobiles.length);
console.log("Software :",TechFix.software.length);
console.log("Prices :",TechFix.prices.length);
console.log("================================");

};

document.addEventListener("DOMContentLoaded",()=>{

/* PRELOADER */

const preloader=document.getElementById("preloader");

if(preloader){

setTimeout(()=>{

preloader.style.opacity="0";
preloader.style.visibility="hidden";

},800);

}

/* REVEAL ANIMATION */

const reveals=document.querySelectorAll(".reveal");

const reveal=function(){

reveals.forEach(item=>{

const top=item.getBoundingClientRect().top;

if(top<window.innerHeight-100){

item.classList.add("active");

}

});

};

window.addEventListener("scroll",reveal);

reveal();

/* HEADER EFFECT */

const header=document.getElementById("header");

window.addEventListener("scroll",()=>{

if(!header) return;

if(window.scrollY>40){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});

TechFix.start();

});

console.log("Final Engine Loaded");
/*
===========================================
SYSTEM TEST
===========================================
*/

document.addEventListener("DOMContentLoaded",()=>{

console.log("===== TECHFIX TEST =====");

console.log("Mobiles:",TechFix.mobiles.length);

console.log("Software:",TechFix.software.length);

console.log("Prices:",TechFix.prices.length);

console.log("Brands:",TechFix.brands.length);

const search=document.getElementById("global-search");

if(search){

search.value="Samsung";

TechFix.renderSearch("Samsung");

console.log("Search Test : OK");

}else{

console.log("Search Box Missing");

}

console.log("===== TEST COMPLETE =====");

});
TechFix.openModel = function(id){

    localStorage.setItem("TechFixModelID", id);

    window.location.href = "pages/model.html";

};