
let MODELS_DB=[];
let MODELS_READY=null;
async function loadModelsDB(){
 if(MODELS_READY) return MODELS_READY;
 MODELS_READY=fetch("data/models.json").then(r=>{if(!r.ok) throw new Error("models.json failed");return r.json()})
 .then(data=>{MODELS_DB=Array.isArray(data)?data:[];return MODELS_DB;})
 .catch(err=>{console.error(err);MODELS_DB=[];return MODELS_DB;});
 return MODELS_READY;
}
function modelCard(m){
 const q=encodeURIComponent(m.model);
 return `<article class="model-card glass-card">
   <div class="model-top"><div><div class="model-brand">${escapeHtml(m.brand)}</div><h4>${escapeHtml(m.model)}</h4></div><span class="badge">${escapeHtml(m.releaseYear||"Device")}</span></div>
   <p>${escapeHtml(m.description||"Technical device reference and service information.")}</p>
   <div class="model-meta"><span>${escapeHtml(m.operatingSystem||"OS")}</span><span>${escapeHtml(m.chipset||"Chipset")}</span></div>
   <div class="model-actions"><a href="model.html?id=${encodeURIComponent(m.id)}">Details</a><a href="contact.html">Service</a></div>
 </article>`;
}
function wireSearch({inputId,btnId,gridId,countId,filterBase=()=>true}){
 const input=document.getElementById(inputId),btn=document.getElementById(btnId),grid=document.getElementById(gridId),count=document.getElementById(countId);
 if(!input||!grid) return;
 const run=()=>{
   const q=input.value.trim().toLowerCase();
   let list=MODELS_DB.filter(filterBase);
   if(q) list=list.filter(m=>[m.brand,m.model,m.modelNumber,m.chipset,m.operatingSystem,...(m.aliases||[]),...(m.searchKeywords||"").split(/\s+/)].join(" ").toLowerCase().includes(q));
   const shown=list.slice(0,60);
   grid.innerHTML=shown.length?shown.map(modelCard).join(""):`<div class="no-results">No matching device found. Try another brand or model.</div>`;
   if(count) count.textContent=`${list.length.toLocaleString()} result${list.length===1?"":"s"}${list.length>60?" · showing first 60":""}`;
 };
 input.addEventListener("input",run);
 btn?.addEventListener("click",run);
 input.addEventListener("keydown",e=>{if(e.key==="Enter")run()});
 run();
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
