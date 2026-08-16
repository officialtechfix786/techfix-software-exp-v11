const $ = (s, root = document) => root.querySelector(s);

const fallbackImage = (img) => {
  img.onerror = null;
  img.removeAttribute('src');
  img.alt = 'Mobile image unavailable';
  img.closest('.model-image')?.classList.add('image-fallback');
};

function setupMenu() {
  const toggle = $('#menuToggle');
  const nav = $('#mobileNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.hidden = open;
  });
}

function setupSearch() {
  const input = $('#searchInput');
  if (!input) return;
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const q = input.value.trim();
      if (q) location.href = `pages/mobiles.html?q=${encodeURIComponent(q)}`;
    }
  });
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      input.focus();
    }
  }, { passive: false });
}

const featured = [
  { b:'Oppo', m:'K13 Turbo Pro (512GB)', c:'Snapdragon 8s Gen 4', i:'https://www.mobiledokan.com/media/oppo-k13-turbo-pro-knight-silver-official-image_1.webp' },
  { b:'Vivo', m:'Y400', c:'Snapdragon 685', i:'https://www.mobiledokan.com/media/vivo-y400-green-official-color-image.webp' },
  { b:'Samsung', m:'Galaxy F36', c:'Exynos 1380', i:'https://www.mobiledokan.com/media/samsung-galaxy-f36-luxe-violet-official-image.webp' },
  { b:'Motorola', m:'Moto G96', c:'Snapdragon 7s Gen 2', i:'https://www.mobiledokan.com/media/motorola-moto-g96-pantone-dresden-blue-official-image.webp' }
];

function renderFeatured() {
  const grid = $('#modelGrid');
  if (!grid) return;
  const fragment = document.createDocumentFragment();
  featured.forEach((phone) => {
    const card = document.createElement('a');
    card.className = 'model-card';
    card.href = `pages/mobiles.html?q=${encodeURIComponent(phone.m)}`;
    card.innerHTML = `<div class="model-image"><img loading="lazy" decoding="async" src="${phone.i}" alt="${phone.b} ${phone.m}"></div><div class="model-meta"><small>${phone.b}</small><h3>${phone.m}</h3><p>${phone.c}</p></div>`;
    const img = card.querySelector('img');
    img.addEventListener('error', () => fallbackImage(img), { once: true });
    fragment.appendChild(card);
  });
  grid.replaceChildren(fragment);
}

setupMenu();
setupSearch();
if ('requestIdleCallback' in window) requestIdleCallback(renderFeatured, { timeout: 1200 });
else setTimeout(renderFeatured, 0);
