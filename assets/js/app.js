/* =========================================================
   TechFix Software EXP v11
   Global Application JavaScript
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".mobile-menu-button");
    const mainNav = document.querySelector(".main-nav");
    if (menuButton && mainNav) {
        menuButton.addEventListener("click", () => {
            const opened = mainNav.classList.toggle("mobile-open");
            menuButton.setAttribute("aria-expanded", String(opened));
        });
        mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
            mainNav.classList.remove("mobile-open");
            menuButton.setAttribute("aria-expanded", "false");
        }));
    }

    const header = document.querySelector(".site-header");
    const updateHeader = () => {
        if (!header) return;
        header.classList.toggle("header-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    const searchInput = document.querySelector("#global-search, #search-input, .global-search-input");
    const searchResults = document.querySelector("#search-results, .search-results");
    const mobiles = Array.isArray(window.mobilesDatabase) ? window.mobilesDatabase : Array.isArray(window.mobileDatabase) ? window.mobileDatabase : [];
    const prices = Array.isArray(window.pricesDatabase) ? window.pricesDatabase : Array.isArray(window.priceDatabase) ? window.priceDatabase : [];

    const normalize = (value) => String(value ?? "").trim().toLowerCase();
    const escapeHTML = (value) => String(value ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;");

    function searchDatabase(query) {
        const term = normalize(query);
        if (!term) return [];
        const mobileResults = mobiles.filter((mobile) => {
            const text = [mobile.brand,mobile.model,mobile.androidVersion,mobile.chipset,mobile.bootType,mobile.frp,mobile.firmware,mobile.flash,mobile.imeiRepair,mobile.networkRepair,mobile.unlock,mobile.drivers,mobile.description].filter(Boolean).join(" ").toLowerCase();
            return text.includes(term);
        }).map((mobile) => ({type:"Mobile",title:mobile.model || "Unknown Model",subtitle:mobile.brand || "Mobile",url:`pages/model.html?model=${encodeURIComponent(mobile.model || "")}`}));
        const priceResults = prices.filter((item) => {
            const text = [item.service,item.model,item.category,item.platform,item.description].filter(Boolean).join(" ").toLowerCase();
            return text.includes(term);
        }).map((item) => ({type:"Service",title:item.service || "TechFix Service",subtitle:item.price ? `Price: ${item.price}` : "Contact TechFix",url:"pages/contact.html"}));
        return [...mobileResults,...priceResults].slice(0,20);
    }

    function showResults(results) {
        if (!searchResults) return;
        if (!results.length) {
            searchResults.innerHTML = `<div class="search-empty">No results found in TechFix database.</div>`;
            return;
        }
        searchResults.innerHTML = results.map((result) => `<a class="search-result-item" href="${result.url}"><span>${escapeHTML(result.type)}</span><strong>${escapeHTML(result.title)}</strong><small>${escapeHTML(result.subtitle)}</small></a>`).join("");
    }

    if (searchInput) searchInput.addEventListener("input", () => showResults(searchDatabase(searchInput.value)));

    document.querySelectorAll("img").forEach((image) => image.addEventListener("error", () => {
        const fallback = "/techfix-software-exp-v11/assets/images/logo/techfix-logo.png";
        if (!image.src.includes("techfix-logo.png")) image.src = fallback;
    }, { once:true }));

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".main-nav a").forEach((link) => {
        const href = link.getAttribute("href") || "";
        if (href.split("/").pop() === currentPage) link.classList.add("active");
    });
    document.querySelectorAll("[data-current-year]").forEach((element) => element.textContent = new Date().getFullYear());
    window.TechFixApp = { version:"v11", mobiles, prices, searchDatabase };

    console.log("TechFix Software EXP v11 loaded successfully.");
});

/* =========================================================
   RESTORE / REBUILD ENHANCEMENTS
   - Uses local assets only for logos.
   - Keeps the existing 13 rich records as fallback.
   - Loads the large mobile catalog lazily only on mobiles.html.
   - Never renders tens of thousands of DOM cards at once.
   ========================================================= */
(function(){
    "use strict";

    const ROOT = "/techfix-software-exp-v11/";
    const brandLogo = {
        samsung:"assets/images/brands/samsung.svg", xiaomi:"assets/images/brands/xiaomi.svg", redmi:"assets/images/brands/xiaomi.svg",
        poco:"assets/images/brands/poco.svg", oppo:"assets/images/brands/oppo.svg", vivo:"assets/images/brands/vivo.svg", realme:"assets/images/brands/realme.svg",
        tecno:"assets/images/brands/tecno.svg", infinix:"assets/images/brands/infinix.svg", google:"assets/images/brands/google.svg", oneplus:"assets/images/brands/oneplus.svg", apple:"assets/images/brands/apple.svg",
        huawei:"assets/images/brands/huawei.svg", honor:"assets/images/brands/honor.svg", motorola:"assets/images/brands/motorola.svg", nokia:"assets/images/brands/nokia.svg", nothing:"assets/images/brands/nothing.svg"
    };

    const cyberLogo = {
        "burp suite":"burp-suite.svg", metasploit:"metasploit.svg", nmap:"nmap.svg", wireshark:"wireshark.svg", sqlmap:"sqlmap.svg", "kali linux":"kali-linux.svg"
    };

    const softwareLogo = {
        "3utools":"3utools.svg", imazing:"imazing.svg", itunes:"itunes.svg", "apple devices":"apple-devices.svg", "android platform tools":"android-platform-tools.svg", "adb":"android-platform-tools.svg", "fastboot":"android-platform-tools.svg"
    };

    function loadRestoreCSS(){
        if(document.querySelector('link[data-techfix-restore-css]')) return;
        const link=document.createElement("link");
        link.rel="stylesheet"; link.href=ROOT+"assets/css/restore-fixes.css"; link.dataset.techfixRestoreCss="1";
        document.head.appendChild(link);
    }

    function slug(v){ return String(v||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
    function localBrandLogo(brand){
        const key=String(brand||"").trim().toLowerCase();
        const file=brandLogo[key] || `assets/images/brands/${slug(brand)}.svg`;
        return ROOT+file;
    }
    function escape(v){ return String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;"); }
    function value(obj, keys){ for(const k of keys){ if(obj[k]!==undefined && obj[k]!==null && String(obj[k]).trim()!=="") return String(obj[k]).trim(); } return ""; }

    function parseCSV(text){
        const rows=[]; let row=[], cell="", quoted=false;
        for(let i=0;i<text.length;i++){
            const ch=text[i];
            if(ch==='"'){
                if(quoted && text[i+1]==='"'){ cell+='"'; i++; }
                else quoted=!quoted;
            }else if(ch===',' && !quoted){ row.push(cell); cell=""; }
            else if((ch==='\n' || ch==='\r') && !quoted){
                if(ch==='\r' && text[i+1]==='\n') i++;
                row.push(cell); cell="";
                if(row.some(x=>String(x).trim()!=="")) rows.push(row);
                row=[];
            }else cell+=ch;
        }
        if(cell!=="" || row.length){ row.push(cell); rows.push(row); }
        if(!rows.length) return [];
        const headers=rows.shift().map(h=>String(h).trim().replace(/^\uFEFF/,""));
        return rows.map(r=>{ const o={}; headers.forEach((h,i)=>o[h]=r[i]??""); return o; }).filter(o=>Object.values(o).some(v=>String(v).trim()!==""));
    }

    function mapCSVRow(row){
        const brand=value(row,["brand","Brand","manufacturer","Manufacturer","company"]);
        const model=value(row,["model","Model","name","Name","device","Device","title","Title"]);
        if(!brand && !model) return null;
        const image=value(row,["image","Image","image_url","imageUrl","img","photo","picture","thumbnail","imageURL"]);
        return {
            id:value(row,["id","ID","model_id","modelId"]) || slug(`${brand}-${model}`), brand, model,
            androidVersion:value(row,["androidVersion","android","Android","os","OS","version","Version"]),
            chipset:value(row,["chipset","Chipset","cpu","processor"]), bootType:value(row,["bootType","boot","Boot"]),
            frp:value(row,["frp","FRP"]), firmware:value(row,["firmware","Firmware"]), flash:value(row,["flash","Flash"]),
            imeiRepair:value(row,["imeiRepair","imei","IMEI"]), networkRepair:value(row,["networkRepair","network","Network"]),
            unlock:value(row,["unlock","Unlock"]), drivers:value(row,["drivers","driver","Drivers"]),
            description:value(row,["description","Description","details","Details"]), image
        };
    }

    function modelKey(m){ return `${normalize(m.brand)}|${normalize(m.model)}`; }
    function normalize(v){ return String(v??"").trim().toLowerCase(); }

    function addToolLogos(){
        const page=normalize(location.pathname);
        if(page.includes("cyber-security")){
            document.body.classList.add("cyber-hacking-mode");
            document.querySelectorAll(".tool-card").forEach(card=>{
                const title=normalize(card.querySelector("h3")?.textContent);
                const file=cyberLogo[title];
                if(file && !card.querySelector("img.tf-tool-logo")){
                    const img=document.createElement("img"); img.className="tf-tool-logo"; img.src=ROOT+"assets/images/cyber/"+file; img.alt=title+" logo"; img.loading="lazy"; card.prepend(img);
                }
            });
        }
        document.querySelectorAll(".android-brand-card").forEach(card=>{
            const name=normalize(card.textContent);
            const match=Object.keys(brandLogo).find(k=>name.includes(k));
            if(match && !card.querySelector("img.tf-brand-logo")){
                const img=document.createElement("img"); img.className="tf-brand-logo"; img.src=localBrandLogo(match); img.alt=match+" logo"; img.loading="lazy"; card.prepend(img);
            }
        });
        document.querySelectorAll(".tool-card,.software-card,.download-card,.software-node").forEach(card=>{
            const title=normalize(card.querySelector("h3,strong")?.textContent || card.textContent);
            const match=Object.keys(softwareLogo).find(k=>title.includes(k));
            if(match && !card.querySelector("img.tf-tool-logo")){
                const img=document.createElement("img"); img.className="tf-tool-logo"; img.src=ROOT+"assets/images/software/"+softwareLogo[match]; img.alt=match+" logo"; img.loading="lazy"; card.prepend(img);
            }
        });
    }

    function fixMobileLogoSources(){
        document.querySelectorAll(".mobile-brand-logo img").forEach(img=>{
            const alt=img.alt||"";
            const m=alt.replace(/ logo$/i,"").trim();
            if(m) img.src=localBrandLogo(m);
        });
    }

    function normalizeCatalogRecords(records){
        const map=new Map();
        (Array.isArray(window.mobilesDatabase)?window.mobilesDatabase:[]).forEach(m=>map.set(modelKey(m),m));
        records.forEach(m=>{ if(m && m.brand && m.model) map.set(modelKey(m),{...(map.get(modelKey(m))||{}),...m}); });
        return [...map.values()];
    }

    function enhanceMobileDatabase(){
        if(!/\/mobiles\.html$/.test(location.pathname)) return;
        const input=document.getElementById("mobile-search");
        const results=document.getElementById("mobile-results");
        if(!input || !results) return;
        let data=Array.isArray(window.mobilesDatabase)?window.mobilesDatabase:[];
        let activeBrand="all", page=1; const perPage=48;
        let usingFullCatalog=false;

        const status=document.createElement("div"); status.className="tf-db-status"; status.textContent="Loading mobile catalog…";
        results.parentNode.insertBefore(status,results);
        const pager=document.createElement("div"); pager.className="tf-db-pages"; results.parentNode.insertBefore(pager,results.nextSibling);

        function searchable(m){ return [m.id,m.brand,m.model,m.androidVersion,m.chipset,m.bootType,m.frp,m.firmware,m.flash,m.imeiRepair,m.networkRepair,m.unlock,m.drivers,m.description].filter(Boolean).join(" ").toLowerCase(); }
        function getImage(m){ return m.image || m.imageUrl || m.img || ""; }
        function render(){
            const q=normalize(input.value);
            const filtered=data.filter(m=>(activeBrand==="all" || normalize(m.brand)===normalize(activeBrand)) && (!q || q.split(/\s+/).every(t=>searchable(m).includes(t))));
            const total=Math.max(1,Math.ceil(filtered.length/perPage)); if(page>total) page=total;
            const start=(page-1)*perPage, visible=filtered.slice(start,start+perPage);
            results.innerHTML=visible.map(m=>{
                const brand=escape(m.brand||"Unknown"), model=escape(m.model||"Unknown Model"), image=getImage(m);
                const src=image ? escape(image) : escape(localBrandLogo(m.brand));
                const fallback=escape(localBrandLogo(m.brand));
                return `<article class="mobile-card" data-brand="${brand}"><div class="tf-model-visual"><img src="${src}" alt="${model}" loading="lazy" decoding="async" data-brand-fallback="${fallback}"><span class="tf-model-placeholder" hidden>${escape((m.brand||"TF").slice(0,2).toUpperCase())}</span></div><div class="mobile-card-header"><div class="mobile-brand-logo"><img src="${fallback}" alt="${brand} logo" loading="lazy"></div><div><span class="mobile-brand">${brand}</span><h3>${model}</h3></div></div><div class="mobile-card-body"><p>${escape(m.description||"Mobile software, firmware and technical information.")}</p><div class="mobile-details">${m.androidVersion?`<span>OS: ${escape(m.androidVersion)}</span>`:""}${m.chipset?`<span>Chipset: ${escape(m.chipset)}</span>`:""}${m.bootType?`<span>Boot: ${escape(m.bootType)}</span>`:""}</div><div class="mobile-solutions">${m.frp?"<span>FRP</span>":""}${m.flash?"<span>Flash</span>":""}${m.imeiRepair?"<span>IMEI</span>":""}${m.networkRepair?"<span>Network</span>":""}</div></div><div class="mobile-card-footer"><a href="model.html?model=${encodeURIComponent(m.model||"")}" class="btn btn-primary">View Model</a></div></article>`;
            }).join("") || "<div class=\"database-loading\">No matching mobile found.</div>";
            results.querySelectorAll("img[data-brand-fallback]").forEach(img=>img.addEventListener("error",()=>{const f=img.dataset.brandFallback;if(f && img.src!==f) img.src=f; else {img.hidden=true;img.nextElementSibling.hidden=false;}},{once:true}));
            const count=document.getElementById("mobile-count"); const visible=document.getElementById("visible-mobile-count");
            if(count) count.textContent=`${data.length.toLocaleString()} Models`;
            if(visible) visible.textContent=`${filtered.length.toLocaleString()} Result${filtered.length===1?"":"s"}`;
            status.textContent=`${usingFullCatalog?"Full mobile catalog":"Core mobile database"} • ${filtered.length.toLocaleString()} matching model${filtered.length===1?"":"s"}`;
            pager.innerHTML="";
            if(total>1){
                const add=(label,p,disabled=false,active=false)=>{const b=document.createElement("button");b.type="button";b.textContent=label;b.disabled=disabled;if(active)b.classList.add("active");b.onclick=()=>{page=p;render();window.scrollTo({top:results.offsetTop-120,behavior:"smooth"})};pager.appendChild(b)};
                add("‹",Math.max(1,page-1),page===1); const from=Math.max(1,page-2),to=Math.min(total,page+2); for(let p=from;p<=to;p++) add(String(p),p,false,p===page); add("›",Math.min(total,page+1),page===total);
            }
        }

        const stopAndRender=(handler)=>function(e){e.stopImmediatePropagation();handler(e)};
        input.addEventListener("input",stopAndRender(()=>{page=1;render()}),true);
        document.querySelectorAll(".brand-filter").forEach(btn=>btn.addEventListener("click",stopAndRender(()=>{activeBrand=btn.dataset.brand||"all";page=1;document.querySelectorAll(".brand-filter").forEach(x=>x.classList.toggle("active",x===btn));render()}),true));
        document.getElementById("clear-mobile-search")?.addEventListener("click",stopAndRender(()=>{input.value="";page=1;render();input.focus()}),true);
        render();

        fetch("../database/mobile-catalog.csv",{cache:"force-cache"}).then(r=>{if(!r.ok)throw new Error(`catalog HTTP ${r.status}`);return r.text()}).then(text=>{
            const parsed=parseCSV(text).map(mapCSVRow).filter(Boolean);
            if(parsed.length){ data=normalizeCatalogRecords(parsed); window.mobilesDatabase=data; window.mobileDatabase=data; window.mobiles=data; usingFullCatalog=true; render(); console.log(`TechFix full mobile catalog loaded: ${data.length} models`); }
            else throw new Error("empty catalog");
        }).catch(err=>{console.warn("Full mobile catalog could not be loaded; keeping core database.",err); status.textContent=`Core mobile database • ${data.length.toLocaleString()} models`;});
    }

    function enhanceGlobalSearch(){
        const input=document.querySelector("#global-search, #search-input, .global-search-input"); const box=document.querySelector("#search-results, .search-results");
        if(!input || !box) return;
        input.addEventListener("input",function(e){
            const term=normalize(input.value); if(!term)return;
            e.stopImmediatePropagation();
            const db=Array.isArray(window.mobilesDatabase)?window.mobilesDatabase:[];
            const hits=db.filter(m=>[m.brand,m.model,m.chipset,m.androidVersion,m.description].filter(Boolean).join(" ").toLowerCase().includes(term)).slice(0,20);
            box.innerHTML=hits.length?hits.map(m=>`<a class="search-result-item" href="pages/model.html?model=${encodeURIComponent(m.model||"")}"><span>Mobile</span><strong>${escape(m.model)}</strong><small>${escape(m.brand)}</small></a>`).join(""):"<div class=\"search-empty\">No results found in mobile catalog.</div>";
        },true);
    }

    function boot(){
        loadRestoreCSS();
        setTimeout(()=>{
            addToolLogos();
            fixMobileLogoSources();
            enhanceMobileDatabase();
            enhanceGlobalSearch();
        },0);
    }
    if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot,{once:true}); else boot();
})();
