const params = new URLSearchParams(location.search);
const q = (params.get('q') || '').trim().toLowerCase();
const brand = (params.get('brand') || '').trim().toLowerCase();
const grid = document.querySelector('#catalogGrid');
const escapeHTML = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

async function loadPage() {
  try {
    const response = await fetch('../database/catalog/pages/page-1.json', { cache:'force-cache' });
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
    const data = await response.json();
    const rows = data.filter(x => {
      const text = `${x.b} ${x.m} ${x.c} ${x.o}`.toLowerCase();
      return (!q || text.includes(q)) && (!brand || String(x.b).toLowerCase() === brand);
    }).slice(0, 24);
    if (!rows.length) { grid.innerHTML='<div class="cta-panel"><div><h2>NO MODELS FOUND.</h2><p>Try another model or brand.</p></div></div>'; return; }
    grid.innerHTML = rows.map(x => `<a class="model-card" href="?q=${encodeURIComponent(x.m)}"><div class="model-image"><img loading="lazy" decoding="async" src="${escapeHTML(x.i)}" alt="${escapeHTML(x.b)} ${escapeHTML(x.m)}" onerror="this.onerror=null;this.removeAttribute('src');this.closest('.model-image').classList.add('image-fallback')"></div><div class="model-meta"><small>${escapeHTML(x.b)}</small><h3>${escapeHTML(x.m)}</h3><p>${escapeHTML(x.c || x.o || 'Mobile model')}</p></div></a>`).join('');
  } catch (error) {
    console.error('TechFix catalog:', error);
    grid.innerHTML='<div class="cta-panel"><div><h2>CATALOG UNAVAILABLE.</h2><p>Please check the catalog path or hosting configuration.</p></div></div>';
  }
}
loadPage();
