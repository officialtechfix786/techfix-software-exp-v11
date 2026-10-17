(function () {
  'use strict';

  var nested = /\/pages\//.test(location.pathname);
  var base = nested ? '../' : './';
  var page = document.body.dataset.page || 'home';
  var url = function (path) { return base + path; };
  var assetsBase = new URL(base, location.href);
  var mediaUrl = function (path) { var value = String(path || ''); return /^https?:/.test(value) ? value : new URL(value.replace(/^\/+/, ''), assetsBase).href; };
  var domainLabel = function (value) { try { return new URL(value, location.href).hostname.replace(/^www\./, ''); } catch (_error) { return 'publisher website'; } };
  function initAurora() {
    document.documentElement.style.setProperty('--glow-one', '#ff9168');
    document.documentElement.style.setProperty('--glow-two', '#9a78ff');
    document.documentElement.style.setProperty('--glow-three', '#35cdbd');
  }
  function publisherLogo(href, label) {
    var host = domainLabel(href);
    var initials = String(label || host).replace(/[^a-z0-9 ]/gi, ' ').trim().split(/\s+/).slice(0, 2).map(function (part) { return part.charAt(0); }).join('').toUpperCase();
    var logo = 'https://www.google.com/s2/favicons?domain_url=' + encodeURIComponent('https://' + host) + '&sz=128';
    return '<span class="publisher-logo"><img src="' + esc(logo) + '" alt="" width="48" height="48" loading="lazy" decoding="async" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden aria-hidden="true">' + esc(initials || 'TL') + '</span></span>';
  }
  var esc = function (value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var icon = '<img class="brand-logo brand-avatar" src="https://images.pexels.com/photos/33531815/pexels-photo-33531815.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=240" alt="Technician repairing a phone at a workbench" width="58" height="58">';
  var nav = [['Home', 'index.html'], ['Mobiles', 'pages/mobiles.html'], ['Services', 'pages/services.html'], ['Android', 'pages/android.html'], ['Apple', 'pages/apple.html'], ['Downloads', 'pages/downloads.html'], ['Cyber Security', 'pages/cyber-security.html'], ['Contact', 'pages/contact.html']];

  function addCardVisuals() {
    var themed = {
      home: ['workbench.svg', 'phone.svg', 'laptop.svg', 'shield.svg'],
      android: ['android.svg', 'phone.svg', 'network.svg', 'cloud.svg'],
      apple: ['apple.svg', 'cloud.svg', 'shield.svg', 'phone.svg'],
      services: ['workbench.svg', 'phone.svg', 'laptop.svg', 'support.svg'],
      downloads: ['software.svg', 'android.svg', 'apple.svg', 'shield.svg'],
      'cyber-security': ['cyber-terminal.svg', 'network.svg', 'shield.svg', 'cyber-terminal.svg'],
      contact: ['support.svg', 'social.svg', 'phone.svg', 'network.svg'],
      mobiles: ['phone.svg', 'android.svg', 'apple.svg', 'laptop.svg']
    };
    var choices = themed[page] || themed.home;
    document.querySelectorAll('.card:not(.model-card),.rate-card,.service-tile').forEach(function (node, index) {
      if (node.querySelector('img')) return;
      var src = url('assets/images/visuals/' + choices[index % choices.length]);
      var image = document.createElement('img');
      image.className = 'card-visual';
      image.src = src;
      image.alt = '';
      image.setAttribute('aria-hidden', 'true');
      image.loading = 'lazy';
      image.decoding = 'async';
      node.insertBefore(image, node.firstChild);
    });
  }

  function initChrome() {
    var header = document.querySelector('#site-header');
    if (header) {
      header.innerHTML = '<div class="wrap nav"><a class="brand" href="' + url('index.html') + '">' + icon + '<span><strong class="brand-name">MIAN AHMAD</strong><small>TECHNEX LABS</small></span></a><span class="manager-tag">Manager: Miss Areeha Rao</span><button class="menu" aria-expanded="false" aria-controls="navlinks" type="button">☰ <span class="sr-only">Menu</span></button><nav id="navlinks" class="navlinks" aria-label="Main navigation">' + nav.map(function (item, index) {
        var navIcons = ['⌂', '▣', '⌁', '◉', '◌', '↓', '⌘', '✉'];
        return '<a data-nav="' + index + '" href="' + url(item[1]) + '" ' + (page === item[1].replace('pages/', '').replace('.html', '') ? 'aria-current="page"' : '') + '><span class="nav-icon" aria-hidden="true">' + navIcons[index] + '</span><span>' + item[0] + '</span></a>';
      }).join('') + '</nav></div>';
      var navContainer = header.querySelector('.nav');
      var globalSearch = document.querySelector('.searchbox');
      if (!globalSearch) {
        navContainer.insertAdjacentHTML('beforeend', '<div class="searchbox header-searchbox"><form id="search-form" role="search"><label class="sr-only" for="global-search">Search devices, software, services, and guides</label><span class="mag" aria-hidden="true">⌕</span><input id="global-search" type="search" placeholder="Search anything…" autocomplete="off"><button id="clear-search" class="clear-search" type="button" aria-label="Clear search">Clear</button><button type="submit">Search</button></form><div id="search-results" class="search-results hidden" role="list" aria-label="Search results" aria-live="polite"></div></div>');
        globalSearch = navContainer.querySelector('.searchbox');
      }
      globalSearch.classList.add('header-searchbox');
      navContainer.insertBefore(globalSearch, navContainer.querySelector('.navlinks'));
    }
    var footer = document.querySelector('#site-footer');
    if (footer) footer.innerHTML = '<div class="wrap footgrid"><div><a class="brand" href="' + url('index.html') + '">' + icon + '<span>TECHNEX LABS<small>FOUNDED BY MIAN AHMAD</small></span></a><p>Mobile knowledge, device support resources, responsible security learning.</p></div><div class="footlinks"><a href="' + url('pages/contact.html') + '">Contact</a><a href=\"https://wa.me/97477955297\" target=\"_blank\" rel=\"noopener\">WhatsApp ↗</a><a href="https://www.tiktok.com/@technexlab?is_from_webapp=1&amp;sender_device=pc" target="_blank" rel="noopener">TikTok ↗</a><a href="https://www.facebook.com/share/19GR9nnWdt/" target="_blank" rel="noopener">Facebook ↗</a><a href="mailto:officialtechfix786@gmail.com">Email ↗</a></div><div>© ' + new Date().getFullYear() + ' TechNex Labs · MIAN AHMAD</div></div>';

    var menu = document.querySelector('.menu');
    var links = document.querySelector('#navlinks');
    if (menu && links) {
      menu.addEventListener('click', function () {
        var opened = links.classList.toggle('open');
        menu.setAttribute('aria-expanded', String(opened));
      });
      links.addEventListener('click', function (event) {
        if (event.target.closest('a')) {
          links.classList.remove('open');
          menu.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          links.classList.remove('open');
          menu.setAttribute('aria-expanded', 'false');
          menu.focus();
        }
      });
    }
  }

  async function load(name) {
    var response = await fetch(url('database/' + name + '.json?v=technex-solutions-2'));
    if (!response.ok) throw new Error(name + ' data unavailable (' + response.status + ')');
    return response.json();
  }

  function card(title, description, href, category) {
    return '<a class="card" href="' + esc(href) + '"><span class="iconbox" aria-hidden="true">↗</span><h3>' + esc(title) + '</h3><p>' + esc(description) + '</p><span class="tag">' + esc(category || 'Resource') + '</span></a>';
  }

  function createSearchIndex(mobiles, software, resources, solutions) {
    var modelResults = mobiles.map(function (m) {
      var specs = Object.values(m.specifications || {}).join(' ');
      return { title: m.name + ' · ' + m.brand, desc: m.description, kind: 'Mobile device', url: url('pages/mobiles.html?model=' + encodeURIComponent(m.id)), search: [m.id, m.modelNumber, m.brand, m.name, m.year, m.os, specs].join(' ') };
    });
    var tools = software.map(function (s) {
      return { title: s.name, desc: s.description, kind: s.category, url: url((/security|web|password|wireless|asset discovery/i.test(s.category) ? 'pages/cyber-security.html#security-' : 'pages/downloads.html#') + encodeURIComponent(s.id)), search: [s.name, s.publisher, s.category, s.caution, (s.systems || []).join(' ')].join(' ') };
    });
    var refs = resources.map(function (r) {
      return { title: r.title, desc: r.description, kind: r.category, url: r.url, search: [r.title, r.category, r.description, (r.tags || []).join(' ')].join(' ') };
    });
    var guides = solutions.map(function (g) {
      var target = g.category === 'Apple' ? 'apple' : g.category === 'Cybersecurity' ? 'cyber-security' : 'android';
      return { title: g.title, desc: g.summary, kind: g.category + ' guide', url: url('pages/' + target + '.html#guide-' + encodeURIComponent(g.id)), search: [g.title, g.summary, g.category, g.scope, g.prerequisites, (g.steps || []).join(' '), g.risks].join(' ') };
    });
    var serviceResults = [
      { title: 'Phone support and repair', desc: 'Supported phone diagnostics, software recovery, updates, and setup.', kind: 'Service', url: url('pages/services.html'), search: 'phone mobile repair diagnostics software recovery update setup service' },
      { title: 'Laptop setup and repair', desc: 'Windows setup, drivers, licensed apps, and computer care.', kind: 'Service', url: url('pages/services.html'), search: 'laptop computer windows drivers install apps setup repair service' },
      { title: 'Apple device support', desc: 'Apple ownership, backup, restore, and care resources.', kind: 'Service', url: url('pages/apple.html'), search: 'apple iphone ipad mac ios backup restore support service' },
      { title: 'Android device support', desc: 'Android updates, backup, recovery, and device guides.', kind: 'Service', url: url('pages/android.html'), search: 'android samsung pixel xiaomi backup recovery updates support service' },
      { title: 'Cybersecurity learning', desc: 'Authorized defensive learning resources and safe practice labs.', kind: 'Learning', url: url('pages/cyber-security.html'), search: 'cyber security ethical learning lab defense security tools' },
      { title: 'Contact and WhatsApp', desc: 'Contact TechNex Labs for a service inquiry.', kind: 'Contact', url: url('pages/contact.html'), search: 'contact whatsapp phone appointment help' }
    ];
    var all = modelResults.concat(tools, refs, guides, serviceResults);
    var input = document.querySelector('#global-search');
    var results = document.querySelector('#search-results');
    var form = document.querySelector('#search-form');
    var clear = document.querySelector('#clear-search');
    if (!input || !results) return;

    var active = -1;
    function draw() {
      active = -1;
      var query = input.value.trim().toLocaleLowerCase();
      results.innerHTML = '';
      if (!query) {
        results.classList.add('hidden');
        input.removeAttribute('aria-expanded');
        return;
      }
      var found = all.filter(function (item) { return item.search.toLocaleLowerCase().includes(query); }).slice(0, 10);
      results.classList.remove('hidden');
      input.setAttribute('aria-expanded', 'true');
      results.innerHTML = found.length ? found.map(function (item) {
        return '<a role="listitem" class="search-result" href="' + esc(item.url) + '"><strong>' + esc(item.title) + '</strong><small>' + esc(item.kind) + ' · ' + esc(item.desc) + '</small></a>';
      }).join('') : '<div class="empty">No matches. Try a brand, model code, tool, or guide.</div>';
    }
    input.setAttribute('aria-controls', 'search-results');
    input.setAttribute('aria-expanded', 'false');
    input.addEventListener('input', draw);
    document.querySelectorAll('.search-suggestion').forEach(function (button) { button.addEventListener('click', function () { input.value = button.dataset.query || ''; draw(); input.focus(); }); });
    form && form.addEventListener('submit', function (event) { event.preventDefault(); draw(); if (!input.value.trim()) input.focus(); });
    clear && clear.addEventListener('click', function () { input.value = ''; draw(); input.focus(); });
    input.addEventListener('keydown', function (event) {
      var items = Array.from(results.querySelectorAll('a[role="listitem"]'));
      if (event.key === 'ArrowDown' && items.length) { event.preventDefault(); active = Math.min(active + 1, items.length - 1); items[active].focus(); }
      else if (event.key === 'Escape') { results.classList.add('hidden'); input.setAttribute('aria-expanded', 'false'); }
    });
    results.addEventListener('keydown', function (event) {
      var items = Array.from(results.querySelectorAll('a[role="listitem"]'));
      var current = items.indexOf(document.activeElement);
      if (event.key === 'ArrowDown' && current < items.length - 1) { event.preventDefault(); items[current + 1].focus(); }
      else if (event.key === 'ArrowUp') { event.preventDefault(); if (current <= 0) input.focus(); else items[current - 1].focus(); }
      else if (event.key === 'Escape') { results.classList.add('hidden'); input.setAttribute('aria-expanded', 'false'); input.focus(); }
    });
    document.addEventListener('click', function (event) {
      if (!event.target.closest('.searchbox')) { results.classList.add('hidden'); input.setAttribute('aria-expanded', 'false'); }
    });
  }

  function renderModels(mobiles) {
    var root = document.querySelector('#mobile-list');
    if (!root) return;
    var query = document.querySelector('#model-query');
    var brand = document.querySelector('#brand-filter');
    var os = document.querySelector('#os-filter');
    var sort = document.querySelector('#sort-filter');
    var reset = document.querySelector('#reset-filters');
    var detail = document.querySelector('#mobile-detail');
    brand.innerHTML = '<option value="">All brands</option>' + Array.from(new Set(mobiles.map(function (m) { return m.brand; }))).sort().map(function (b) { return '<option value="' + esc(b) + '">' + esc(b) + '</option>'; }).join('');
    var count = document.querySelector('#mobile-result-count');

    function imageMarkup(m) {
      if (!m.image) return '<div class="model-icon" aria-hidden="true">' + esc(m.brand.slice(0, 2).toUpperCase()) + '</div><div class="image-status">Image unavailable · branded fallback</div>';
      var src = mediaUrl(m.image);
      var isIllustration = m.imageKind === 'illustration';
      var alt = isIllustration ? m.brand + ' ' + m.name + ' device illustration' : m.brand + ' ' + m.name + ' device photograph';
      var credit = isIllustration ? '<span class="image-credit">Original TechNex Labs device illustration</span>' : '<span class="image-credit"><a href="' + esc(m.creditUrl) + '" target="_blank" rel="noopener">Photo: ' + esc(m.author) + '</a> · resized for web · <a href="' + esc(m.licenseUrl) + '" target="_blank" rel="noopener">' + esc(m.license) + '</a></span>' ;
      return '<img class="model-photo" src="' + esc(src) + '" alt="' + esc(alt) + '" width="500" height="330" loading="lazy" decoding="async" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><div class="model-icon" hidden aria-hidden="true">' + esc(m.brand.slice(0, 2).toUpperCase()) + '</div>' + credit;
    }

    var requestedBrand = new URLSearchParams(location.search).get('brand');
    if (requestedBrand) { var exactBrand = mobiles.find(function (m) { return m.brand.toLowerCase() === requestedBrand.toLowerCase(); }); if (exactBrand) brand.value = exactBrand.brand; }
    function draw() {
      var q = query.value.trim().toLowerCase();
      var items = mobiles.filter(function (m) {
        var terms = [m.brand, m.name, m.os, m.modelNumber, m.year, m.description, Object.values(m.specifications || {}).join(' ')].join(' ').toLowerCase();
        return (!q || terms.includes(q)) && (!brand.value || m.brand === brand.value) && (!os.value || m.os === os.value);
      });
      items.sort(function (a, b) { return sort.value === 'year' ? Number(b.year || 0) - Number(a.year || 0) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name); });
      if (count) count.textContent = 'Showing ' + items.length.toLocaleString() + ' of ' + mobiles.length.toLocaleString() + ' verified catalogue entries';
      root.innerHTML = items.length ? items.map(function (m) {
        var brandClass = 'brand-' + String(m.brand).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return '<article class="card model-card ' + esc(brandClass) + '" id="device-' + esc(m.id) + '"><div class="model-visual">' + imageMarkup(m) + '</div><div class="meta">' + esc(m.brand) + ' · ' + esc(m.year) + '</div><h3>' + esc(m.name) + '</h3><p>' + esc(m.description) + '</p><span class="tag">' + esc(m.os) + '</span><div class="model-actions"><a class="button secondary" href="' + esc(url('pages/mobiles.html?model=' + encodeURIComponent(m.id))) + '">View device details</a><a class="source" href="' + esc(m.source) + '" target="_blank" rel="noopener">Manufacturer source ↗</a></div></article>';
      }).join('') : '<div class="empty">No models match. Change or reset filters.</div>';
    }

    [query, brand, os, sort].forEach(function (control) { control.addEventListener('input', draw); });
    reset.addEventListener('click', function () { query.value = ''; brand.value = ''; os.value = ''; sort.value = 'name'; draw(); query.focus(); });
    draw();

    var wanted = new URLSearchParams(location.search).get('model');
    if (!wanted) return;
    var model = mobiles.find(function (m) { return m.id === wanted; });
    if (!model) {
      detail.classList.remove('hidden');
      detail.innerHTML = '<h2>Model not found</h2><p>Choose a model from the catalogue to view its record.</p><a class="button secondary" href="' + esc(url('pages/mobiles.html')) + '">Return to catalogue</a>';
      return;
    }
    query.value = model.name;
    draw();
    var specs = model.specifications ? '<h3>Verified specifications</h3><dl class="spec-list">' + Object.entries(model.specifications).map(function (pair) { return '<div><dt>' + esc(pair[0]) + '</dt><dd>' + esc(pair[1]) + '</dd></div>'; }).join('') + '</dl><a class="source" href="' + esc(model.specSource || model.source) + '" target="_blank" rel="noopener">Specification source ↗</a>' : '<p class="note">Detailed specifications are not verified for this model.</p>';
    var nearby = mobiles.filter(function (m) { return m.brand === model.brand && m.id !== model.id; }).slice(0, 4);
    var otherLinks = model.os === 'iOS' ? [['Apple guides', 'pages/apple.html'], ['Software directory', 'pages/downloads.html']] : [['Android guides', 'pages/android.html'], ['Software directory', 'pages/downloads.html']];
    var detailImageSrc = mediaUrl(model.image || '');
    detail.classList.remove('hidden');
    detail.innerHTML = '<div class="eyebrow">Device reference · ' + esc(model.brand) + '</div><h2>' + esc(model.name) + '</h2><p>' + esc(model.description) + '</p><div class="columns"><div><span class="tag">Year ' + esc(model.year) + '</span><span class="tag">' + esc(model.os) + '</span><p><strong>Model identifier:</strong> ' + (model.modelNumber ? esc(model.modelNumber) : 'Not verified; check Settings, the device label, or manufacturer support.') + '</p><p><strong>Compatibility:</strong> Confirm full regional model, carrier, build, and firmware before servicing. This entry does not claim cross-variant support.</p>' + specs + '<h3>Care and data</h3><p>Back up first. Reset, restore, bootloader, and firmware procedures may erase data or prevent boot. Only work with owner authorization and manufacturer-supported instructions.</p><h3>Related resources</h3><ul class="list">' + otherLinks.map(function (item) { return '<li><a href="' + esc(url(item[1])) + '">' + esc(item[0]) + '</a></li>'; }).join('') + nearby.map(function (m) { return '<li><a href="' + esc(url('pages/mobiles.html?model=' + encodeURIComponent(m.id))) + '">' + esc(m.name) + ' · ' + esc(m.brand) + '</a></li>'; }).join('') + '</ul></div><div>' + (model.image ? '<img class="detail-photo" src="' + esc(detailImageSrc) + '" alt="' + esc(model.brand + ' ' + model.name + (model.imageKind === 'illustration' ? ' device illustration' : ' device photograph')) + '" width="500" height="500" decoding="async" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><div class="model-icon detail-fallback" hidden>' + esc(model.brand.slice(0, 2).toUpperCase()) + '<span class="image-status">Image unavailable · branded fallback</span></div>' : '<div class="model-icon detail-fallback">' + esc(model.brand.slice(0, 2).toUpperCase()) + '</div>') + '<a class="button secondary" href="' + esc(model.source) + '" target="_blank" rel="noopener">Manufacturer reference ↗</a><p class="source">Use the official source to verify current support and the exact variant.</p></div></div><button id="close-device-detail" class="secondary" type="button">Close details</button>';
    detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelector('#close-device-detail').addEventListener('click', function () { detail.classList.add('hidden'); history.replaceState(null, '', location.pathname); query.value = ''; draw(); document.querySelector('#model-query').focus(); });
  }

  function renderSoftware(software) {
    var list = document.querySelector('#software-list');
    if (list) {
      var input = document.querySelector('#software-query');
      var group = document.querySelector('#software-group');
      var labels = document.querySelector('#software-labels');
      var activeCategory = '';
      var generalSoftware = software.filter(function (item) { return !/security|web|password|wireless|asset discovery/i.test(item.category); });
      function drawLabels() {
        if (!labels) return;
        var counts = {};
        generalSoftware.forEach(function (item) { counts[item.category] = (counts[item.category] || 0) + 1; });
        var categories = Object.keys(counts).sort(function (a, b) { return a.localeCompare(b); });
        labels.innerHTML = '<button class="software-label' + (!activeCategory ? ' active' : '') + '" type="button" data-category="" aria-pressed="' + (!activeCategory) + '"><span>All software</span><span class="label-count">' + generalSoftware.length + '</span></button>' + categories.map(function (category) {
          return '<button class="software-label' + (activeCategory === category ? ' active' : '') + '" type="button" data-category="' + esc(category) + '" aria-pressed="' + (activeCategory === category) + '"><span>' + esc(category) + '</span><span class="label-count">' + counts[category] + '</span></button>';
        }).join('');
      }
      function matchesGroup(item) {
        if (!group || group.value === 'all') return true;
        var category = item.category.toLowerCase();
        if (group.value === 'apple') return /apple/.test(category);
        if (group.value === 'android') return /android/.test(category);
        return !/apple|android/.test(category);
      }
      function draw() {
        var q = input.value.trim().toLowerCase();
        var found = generalSoftware.filter(function (item) { return (!activeCategory || item.category === activeCategory) && matchesGroup(item) && [item.name, item.category, item.description, item.publisher, (item.systems || []).join(' '), item.caution].join(' ').toLowerCase().includes(q); });
        list.innerHTML = found.length ? found.map(function (item) {
          return '<article class="card software-card" id="' + esc(item.id) + '"><div class="software-card-head">' + publisherLogo(item.url, item.publisher) + '<span class="tag">' + esc(item.category) + '</span></div><h3>' + esc(item.name) + '</h3><p>' + esc(item.description) + '</p><div class="meta">Publisher/project: ' + esc(item.publisher) + ' · Platforms: ' + esc((item.systems || []).join(', ')) + '</div>' + (item.version ? '<p class="meta">Version: ' + esc(item.version) + (item.versionChecked ? ' · checked ' + esc(item.versionChecked) : '') + '</p>' : '') + '<p class="note">' + esc(item.caution) + '</p><a class="button secondary" href="' + esc(item.url) + '" target="_blank" rel="noopener">Open download link <span class="button-host">' + esc(domainLabel(item.url)) + ' ↗</span></a><div class="source">Source: <a href="' + esc(item.source || item.url) + '" target="_blank" rel="noopener">' + esc(item.sourceLabel || 'verify at publisher') + '</a></div></article>';
        }).join('') : '<div class="empty">No software matches. Try a publisher, platform, or category.</div>';
      }
      if (labels) labels.addEventListener('click', function (event) {
        var button = event.target.closest('[data-category]');
        if (!button) return;
        activeCategory = button.getAttribute('data-category') || '';
        drawLabels();
        draw();
        list.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      input.addEventListener('input', draw);
      if (group) group.addEventListener('change', draw);
      drawLabels();
      draw();
      if (location.hash) setTimeout(function () { var target = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (target) target.scrollIntoView({ block: 'center' }); }, 100);
    }

    var security = document.querySelector('#security-tools');
    if (security) {
      var input = document.querySelector('#security-tool-query');
      var subset = software.filter(function (item) { return /security|web|password|wireless|asset discovery/i.test(item.category); });
      function drawSecurity() {
        var q = input.value.trim().toLowerCase();
        var found = subset.filter(function (item) { return [item.name, item.category, item.description, item.publisher].join(' ').toLowerCase().includes(q); });
        security.innerHTML = found.length ? found.map(function (item) {
          return '<article class="card software-card" id="security-' + esc(item.id) + '"><div class="software-card-head">' + publisherLogo(item.url, item.publisher) + '<span class="tag">' + esc(item.category) + '</span></div><h3>' + esc(item.name) + '</h3><p>' + esc(item.description) + '</p><div class="meta">Project: ' + esc(item.publisher) + ' · ' + esc((item.systems || []).join(', ')) + '</div><p class="note">' + esc(item.caution) + '</p><a class="button secondary" href="' + esc(item.url) + '" target="_blank" rel="noopener">Visit official project <span class="button-host">' + esc(domainLabel(item.url)) + ' ↗</span></a></article>';
        }).join('') : '<div class="empty">No security tools match.</div>';
      }
      input.addEventListener('input', drawSecurity);
      drawSecurity();
    }
  }

  function renderResources(resources) {
    var root = document.querySelector('#resource-list');
    if (root) root.innerHTML = resources.map(function (r) { return card(r.title, r.description, r.url, r.category); }).join('');
  }

  function renderSolutions(solutions) {
    var targets = { Android: 'android-guides', Apple: 'apple-guides', Cybersecurity: 'security-guides' };
    Object.keys(targets).forEach(function (category) {
      var root = document.getElementById(targets[category]);
      if (!root) return;
      var items = solutions.filter(function (guide) { return guide.category === category; });
      root.innerHTML = items.map(function (guide) {
        var art = category === 'Apple' ? '<img class="guide-visual" src="' + esc(url('assets/images/apple/safety-guide.svg')) + '" alt="" loading="lazy" decoding="async">' : '';
        return '<details class="card guide-card" id="guide-' + esc(guide.id) + '">' + art + '<summary><span class="tag">' + esc(guide.category) + '</span><strong>' + esc(guide.title) + '</strong><p>' + esc(guide.summary) + '</p></summary><div class="guide-body"><h3>Scope</h3><p>' + esc(guide.scope) + '</p><h3>Before you start</h3><p>' + esc(guide.prerequisites) + '</p><h3>Checklist</h3><ol class="list">' + guide.steps.map(function (step) { return '<li>' + esc(step) + '</li>'; }).join('') + '</ol><p class="note"><strong>Risks:</strong> ' + esc(guide.risks) + '</p><a class="button secondary" href="' + esc(guide.sourceUrl) + '" target="_blank" rel="noopener">' + esc(guide.sourceName) + ' ↗</a></div></details>';
      }).join('');
    });
  }

  initAurora();
  initChrome();
  Promise.all([load('mobiles'), load('software'), load('resources'), load('solutions')]).then(function (data) {
    var mobiles = data[0], software = data[1], resources = data[2], solutions = data[3];
    createSearchIndex(mobiles, software, resources, solutions);
    renderModels(mobiles);
    renderSoftware(software);
    renderResources(resources);
    renderSolutions(solutions);
    var featuredModels = document.querySelector('#featured-models');
    if (featuredModels) featuredModels.innerHTML = mobiles.filter(function (m) { return ['apple-iphone-16-pro','samsung-galaxy-s25-ultra','google-pixel-9','oneplus-oneplus-13'].includes(m.id); }).map(function (m) { var image = mediaUrl(m.image); var alt = m.brand + ' ' + m.name + ' device photograph'; var details = url('pages/mobiles.html?model=' + encodeURIComponent(m.id)); var credit = m.creditUrl ? '<span class="image-credit"><a href="' + esc(m.creditUrl) + '" target="_blank" rel="noopener">Photo: ' + esc(m.author) + '</a> · ' + esc(m.license) + '</span>' : ''; return '<article class="card featured-device-card"><a class="featured-device-main" href="' + esc(details) + '"><img class="featured-device-photo" src="' + esc(image) + '" alt="' + esc(alt) + '" width="500" height="330" loading="eager" decoding="async" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="image-status" hidden>Photo unavailable</span><span class="meta">' + esc(m.brand + ' · ' + m.year) + '</span><h3>' + esc(m.name) + '</h3><p>' + esc(m.description) + '</p></a>' + credit + '<a class="source featured-detail-link" href="' + esc(details) + '">' + esc(m.os) + ' · view details →</a></article>'; }).join('');    var featuredBrands = document.querySelector('#featured-brands');
    if (featuredBrands) featuredBrands.innerHTML = ['Apple','Samsung','Google','Xiaomi','Redmi','POCO','OnePlus','OPPO','vivo','realme','TECNO','Infinix','Huawei','HONOR','Motorola','Nokia / HMD','Nothing','LG'].map(function (name) { return '<a class="brand-chip" href="' + esc(url('pages/mobiles.html?brand=' + encodeURIComponent(name))) + '">' + esc(name) + '</a>'; }).join('');
    var featuredTools = document.querySelector('#featured-tools');
    if (featuredTools) featuredTools.innerHTML = software.filter(function (item) { return ['technex-solutions','android-sdk-platform-tools','android-studio','owasp-zap'].includes(item.id); }).map(function (item) { var href=url((/security|web|password|wireless|asset discovery/i.test(item.category) ? 'pages/cyber-security.html#security-' : 'pages/downloads.html#') + item.id); return '<a class="card featured-tool-card" href="' + esc(href) + '">' + publisherLogo(item.url,item.publisher) + '<span class="tag">' + esc(item.category) + '</span><h3>' + esc(item.name) + '</h3><p>' + esc(item.description) + '</p><span class="source">Open resource ↗</span></a>'; }).join('');
    if (location.hash && !/downloads/.test(location.pathname)) setTimeout(function () { var target = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (target) target.scrollIntoView({block:'start'}); }, 80);
    addCardVisuals();
  }).catch(function (error) {
    console.error(error);
    document.querySelectorAll('[data-error]').forEach(function (node) { node.textContent = 'Resource data could not be loaded. Refresh the page or check its JSON files.'; node.classList.remove('hidden'); });
    var index = document.querySelector('#global-search');
    if (index) index.disabled = true;
    var root = document.querySelector('#mobile-list') || document.querySelector('#software-list');
    if (root) root.innerHTML = '<div class="empty">The catalogue could not load. Check the network connection and refresh.</div>';
  });
}());
