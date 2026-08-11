
const NAV=[
 {id:"home",label:"Home",href:"index.html"},
 {id:"mobiles",label:"Mobiles",href:"mobiles.html"},
 {id:"android",label:"Android",href:"android.html"},
 {id:"apple",label:"Apple",href:"apple.html"},
 {id:"downloads",label:"Downloads",href:"downloads.html"},
 {id:"cyber",label:"Cyber Security",href:"cyber-security.html"},
 {id:"contact",label:"Contact",href:"contact.html"}
];

function renderHeader(active="home"){
 const el=document.getElementById("site-header");
 if(!el) return;
 el.className="site-header";
 el.innerHTML=`<div class="container nav">
   <a class="logo" href="index.html" aria-label="TechFix Software EXP home">
     <div class="logo-mark"><span>TF</span></div>
     <div class="logo-text"><small>FOUNDER: MIAN AHMAD</small><strong>TECHFIX SOFTWARE EXP</strong></div>
   </a>
   <nav class="nav-links" aria-label="Primary navigation">
     ${NAV.map(n=>`<a class="${n.id===active?'active':''}" href="${n.href}">${n.label}</a>`).join("")}
     <a class="nav-cta" href="https://wa.me/966568152404" target="_blank" rel="noopener">WhatsApp</a>
   </nav>
   <button class="menu-btn" id="menu-btn" aria-label="Open navigation" aria-expanded="false">☰</button>
 </div>
 <div class="container mobile-nav" id="mobile-nav">
   ${NAV.map(n=>`<a class="${n.id===active?'active':''}" href="${n.href}">${n.label}</a>`).join("")}
   <a href="https://wa.me/966568152404" target="_blank" rel="noopener">WhatsApp</a>
 </div>`;
 const btn=document.getElementById("menu-btn"), menu=document.getElementById("mobile-nav");
 btn?.addEventListener("click",()=>{
   const open=menu.classList.toggle("open");
   btn.setAttribute("aria-expanded",String(open));
   btn.textContent=open?"✕":"☰";
 });
 menu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>menu.classList.remove("open")));
}
function renderFooter(){
 const el=document.getElementById("site-footer");
 if(!el) return;
 el.className="site-footer";
 el.innerHTML=`<div class="container footer-grid">
   <div><div class="footer-title">TECHFIX SOFTWARE EXP</div><p>Professional mobile software, device resources and technical education.</p><p style="font-size:11px">Founder: <strong style="color:var(--text)">MIAN AHMAD</strong></p></div>
   <div><div class="footer-title">QUICK LINKS</div><div class="footer-links">${NAV.slice(0,6).map(n=>`<a href="${n.href}">${n.label}</a>`).join("")}</div></div>
   <div><div class="footer-title">CONTACT</div><div class="footer-links"><a href="https://wa.me/966568152404">WhatsApp</a><a href="mailto:officialtechfix786@gmail.com">Email</a><a href="https://t.me/Technologi786">Telegram</a><a href="contact.html">All social channels</a></div></div>
 </div><div class="container copyright"><span>© ${new Date().getFullYear()} TechFix Software EXP</span><span>Built for professional mobile & security resources</span></div>`;
}
function renderBrandGrid(id){
 const el=document.getElementById(id); if(!el) return;
 const brands=["Samsung","Apple","Xiaomi","Redmi","POCO","OPPO","Vivo","Realme","OnePlus","Google","Motorola","Nokia","Huawei","Honor","Tecno","Infinix","Itel","Sony","ASUS","Lenovo","TCL","ZTE","Nothing"];
 el.innerHTML=brands.map(b=>`<a class="brand-card glass-card" href="mobiles.html?q=${encodeURIComponent(b)}"><img class="brand-logo" src="assets/brands/${slug(b)}.svg" alt="${b} logo" onerror="this.style.display='none'"><strong>${b}</strong></a>`).join("");
}
function renderTrustStrip(id){
 const el=document.getElementById(id); if(!el) return;
 el.innerHTML=`<div class="trust-grid"><div class="stat"><strong>2000+</strong><span>Target device coverage</span></div><div class="stat"><strong>24/7</strong><span>Resource access</span></div><div class="stat"><strong>OFFICIAL</strong><span>Source-first downloads</span></div><div class="stat"><strong>SAFE</strong><span>Authorized security learning</span></div></div>`;
}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")}
