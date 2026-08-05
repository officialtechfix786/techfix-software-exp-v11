"use strict";

/*
    TECHFIX SOFTWARE EXP
    MODEL PAGE ENGINE
*/

const TechFixModel={

data:null,

init(){

const saved=localStorage.getItem("TechFixSelected");

if(!saved){

this.notFound();

return;

}

this.data=JSON.parse(saved);

this.render();

},

render(){

document.getElementById("modelName").textContent=
this.data.model || "Unknown Model";

document.getElementById("modelBrand").textContent=
this.data.brand || "Unknown Brand";

document.getElementById("modelSeries").textContent=
this.data.series || "Unknown Series";

const p=this.data.prices || {};

document.getElementById("priceFRP").textContent=
p.frp ? `Rs ${p.frp}` : "Contact";

document.getElementById("priceIMEI").textContent=
p.imei ? `Rs ${p.imei}` : "Not Available";

document.getElementById("priceCPID").textContent=
p.cpid ? `Rs ${p.cpid}` : "Not Available";

document.getElementById("priceSignal").textContent=
p.bypassSignal ? `Rs ${p.bypassSignal}` : "Not Available";

document.getElementById("priceNoSignal").textContent=
p.bypassNoSignal ? `Rs ${p.bypassNoSignal}` : "Not Available";
const list=document.getElementById("solutionList");

list.innerHTML="";

const s=this.data.solutions || {};

Object.keys(s).forEach(key=>{

if(s[key]){

const li=document.createElement("li");

li.textContent=key;

list.appendChild(li);

}

});

if(list.innerHTML===""){

list.innerHTML="<li>No Solutions Available</li>";

}

const firmware=document.getElementById("firmwareBtn");

firmware.onclick=(e)=>{

e.preventDefault();

alert("Firmware download will be available soon.");

};

},

notFound(){

document.getElementById("modelName").textContent="Model Not Found";

document.getElementById("modelBrand").textContent="";

document.getElementById("modelSeries").textContent="";

}

};

document.addEventListener("DOMContentLoaded",()=>{

TechFixModel.init();

});

window.TechFixModel=TechFixModel;
const list=document.getElementById("solutionList");

list.innerHTML="";

const s=this.data.solutions || {};

Object.keys(s).forEach(key=>{

if(s[key]){

const li=document.createElement("li");

li.textContent=key;

list.appendChild(li);

}

});

if(list.innerHTML===""){

list.innerHTML="<li>No Solutions Available</li>";

}

const firmware=document.getElementById("firmwareBtn");

firmware.onclick=(e)=>{

e.preventDefault();

alert("Firmware download will be available soon.");

};

},

notFound(){

document.getElementById("modelName").textContent="Model Not Found";

document.getElementById("modelBrand").textContent="";

document.getElementById("modelSeries").textContent="";

}

};

document.addEventListener("DOMContentLoaded",()=>{

TechFixModel.init();

});

window.TechFixModel=TechFixModel;