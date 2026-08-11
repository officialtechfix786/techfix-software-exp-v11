
async function loadTechFixCatalog(targetSelector=".catalog-grid"){
 const target=document.querySelector(targetSelector); if(!target)return;
 try{
  const res=await fetch("./data/catalog-v2.json"); const data=await res.json();
  target.innerHTML=(data.software||[]).map(x=>`<article class="catalog-card">
   <img class="catalog-logo" src="${x.logo}" alt="${x.name} logo" loading="lazy">
   <h3>${x.name}</h3><div class="catalog-actions">
   <a class="primary" href="${x.url}" target="_blank" rel="noopener">Official Download</a>
   </div></article>`).join("");
 }catch(e){console.warn("TechFix catalog unavailable",e)}
}
