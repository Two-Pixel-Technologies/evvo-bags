// ===== PREFERENCES =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== NAV =====
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const mobNav = document.getElementById('mobNav');
const mobClose = document.getElementById('mobClose');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 48);
});

burger.addEventListener('click', () => {
  mobNav.classList.add('open');
  mobNav.setAttribute('aria-hidden', 'false');
  burger.setAttribute('aria-expanded', 'true');
});

// prevent background scroll when mobile nav is open
function openMobileNav() {
  mobNav.classList.add('open');
  mobNav.setAttribute('aria-hidden', 'false');
  burger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
}

function closeMobileNavHandler() {
  mobNav.classList.remove('open');
  mobNav.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}

const closeMobileNav = () => {
  closeMobileNavHandler();
};

mobClose.addEventListener('click', closeMobileNav);
document.querySelectorAll('.mob-link').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

// Replace previous burger behavior to use openMobileNav helper (avoid duplicate logic)
if (burger) {
  burger.removeEventListener && burger.removeEventListener('click', () => {});
  burger.addEventListener('click', () => openMobileNav());
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobNav.classList.contains('open')) {
    closeMobileNavHandler();
  }
});

// Close when tapping outside the menu content (click on overlay)
if (mobNav) {
  mobNav.addEventListener('click', (e) => {
    if (e.target === mobNav) closeMobileNavHandler();
  });
}

// ===== HERO HEADLINE =====
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-line').forEach((line, i) => {
    const html = line.innerHTML.trim();
    line.innerHTML = `<span>${html}</span>`;
    const span = line.querySelector('span');

    if (prefersReducedMotion) {
      span.style.transform = 'translateY(0)';
      span.style.opacity = '1';
      return;
    }

    setTimeout(() => {
      span.style.transition = 'transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.7s ease';
      span.style.transform = 'translateY(0)';
      span.style.opacity = '1';
    }, 80 + i * 100);
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

if (!prefersReducedMotion) {
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
}

// ===== PRODUCTS SHOWROOM =====
const PRODUCT_IMAGE = 'images/products/pack-tall.png';

const FEATURE_ICONS = {
  default: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.4 5.2 5.7.5-4.3 3.7 1.3 5.6L12 15.8 6.9 18l1.3-5.6L4 8.7l5.7-.5L12 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  drop: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3c3 4 6 7 6 10a6 6 0 11-12 0c0-3 3-6 6-10z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  seal: '<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="8" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M9 12h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
};

const CALLOUT_ICONS = [
  '<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="8" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none"><path d="M4 12h16M4 16h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  FEATURE_ICONS.seal,
  FEATURE_ICONS.shield,
  FEATURE_ICONS.drop,
  '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
];

const PRODUCTS = {
  small: {
    spec: '14 in × 16 in · 40 bags per pack',
    dimensions: '14 in × 16 in',
    capacity: '10L',
    desc: 'Compact format for desk bins, bathroom waste, and tight spaces where a lighter liner is all you need.',
    use: 'Bathroom, desk & utility bins',
    alt: 'EVVO Small garbage bags',
    features: ['Lightweight', 'Compact Fit', 'Everyday Use', 'Machine Sealed'],
    featureIcons: ['default', 'default', 'default', 'seal'],
    callouts: ['40 Bags Per Pack', '10L Capacity', 'Machine Sealed', 'Lightweight', 'Compact Fit', 'Everyday Use'],
  },
  medium: {
    spec: '19 in × 20 in · 30 bags per pack',
    dimensions: '19 in × 20 in',
    capacity: '20L',
    desc: 'Perfect for everyday kitchen & bathroom use. Balanced strength and capacity.',
    use: 'Kitchen & bathroom bins',
    alt: 'EVVO Medium garbage bags',
    features: ['Best Seller', 'Tear Resistant', 'Leak Proof', 'Machine Sealed'],
    featureIcons: ['star', 'shield', 'drop', 'seal'],
    callouts: ['30 Bags Per Pack', '20L Capacity', 'Machine Sealed', 'Tear Resistant', 'Leak Proof', 'Heavy Duty'],
  },
  large: {
    spec: '24 in × 32 in · 15 bags per pack',
    dimensions: '24 in × 32 in',
    capacity: '35L',
    desc: 'Super-strength format for heavy loads, outdoor bins, and high-capacity household waste.',
    use: 'Large bins & heavy waste',
    alt: 'EVVO Large garbage bags',
    features: ['Super Strength', 'Heavy Duty', 'Stretchable', 'Machine Sealed'],
    featureIcons: ['shield', 'shield', 'default', 'seal'],
    callouts: ['15 Bags Per Pack', '35L Capacity', 'Machine Sealed', 'Heavy Duty', 'Super Strength', 'Outdoor Bins'],
  },
  'extra-large': {
    spec: '28 in × 36 in · 10 bags per pack',
    dimensions: '28 in × 36 in',
    capacity: '50L',
    desc: 'High-capacity liner for wheelie bins, outdoor waste, and bulkier daily household load.',
    use: 'Outdoor & wheelie bins',
    alt: 'EVVO Extra Large garbage bags',
    features: ['Extra Capacity', 'Heavy Duty', 'Tear Resistant', 'Leak Proof'],
    featureIcons: ['default', 'shield', 'shield', 'drop'],
    callouts: ['10 Bags Per Pack', '50L Capacity', 'Heavy Duty', 'Extra Capacity', 'Leak Proof', 'Tear Resistant'],
  },
  jumbo: {
    spec: '32 in × 40 in · 8 bags per pack',
    dimensions: '32 in × 40 in',
    capacity: '75L',
    desc: 'Maximum-size format for commercial-grade bins, renovation waste, and demanding heavy loads.',
    use: 'Commercial & jumbo bins',
    alt: 'EVVO Jumbo garbage bags',
    features: ['Maximum Size', 'Super Strength', 'Heavy Duty', 'Machine Sealed'],
    featureIcons: ['default', 'shield', 'shield', 'seal'],
    callouts: ['8 Bags Per Pack', '75L Capacity', 'Maximum Size', 'Super Strength', 'Heavy Duty', 'Machine Sealed'],
  },
};

const productsSection = document.getElementById('products');
const productImage = document.getElementById('productImage');
const productCallouts = document.getElementById('productCallouts');
const showroomItems = document.querySelectorAll('.showroom-item');

function renderCallouts(callouts) {
  if (!productCallouts) return;

  productCallouts.classList.add('is-fading');
  window.setTimeout(() => {
    productCallouts.innerHTML = callouts
      .map(
        (label, i) => `
        <li class="showroom-callout showroom-callout--${i + 1}">
          <span class="showroom-callout-bubble" aria-hidden="true">${CALLOUT_ICONS[i] || FEATURE_ICONS.default}</span>
          <span>${label}</span>
        </li>`
      )
      .join('');
    productCallouts.classList.remove('is-fading');
  }, 180);
}

function renderFeatures(list, features, icons) {
  if (!list) return;
  list.innerHTML = features
    .map(
      (label, i) => `
      <li>
        <span class="showroom-feature-icon" aria-hidden="true">${FEATURE_ICONS[icons[i] || 'default']}</span>
        <span>${label}</span>
      </li>`
    )
    .join('');
}

function populateShowroomItem(item, data) {
  const spec = item.querySelector('[data-field="spec"]');
  const desc = item.querySelector('[data-field="desc"]');
  const dimensions = item.querySelector('[data-field="dimensions"]');
  const capacity = item.querySelector('[data-field="capacity"]');
  const use = item.querySelector('[data-field="use"]');
  const features = item.querySelector('[data-field="features"]');

  if (spec) spec.textContent = data.spec;
  if (desc) desc.textContent = data.desc;
  if (dimensions) dimensions.textContent = data.dimensions;
  if (capacity) capacity.textContent = data.capacity;
  if (use) use.textContent = data.use;
  renderFeatures(features, data.features, data.featureIcons);
}

function expandShowroomItem(key) {
  showroomItems.forEach((item) => {
    const active = item.dataset.product === key;
    const trigger = item.querySelector('.showroom-trigger');
    const toggle = item.querySelector('.showroom-trigger-toggle');
    const icon = item.querySelector('.showroom-trigger-icon');

    item.classList.toggle('is-active', active);
    if (trigger) {
      trigger.setAttribute('aria-selected', active ? 'true' : 'false');
      trigger.setAttribute('aria-expanded', active ? 'true' : 'false');
    }
    if (toggle) toggle.textContent = active ? '−' : '+';
    icon?.classList.toggle('showroom-trigger-icon--accent', active);
  });
}

function setProduct(key) {
  const data = PRODUCTS[key];
  if (!data) return;

  productsSection.classList.remove(
    'product-theme--small',
    'product-theme--medium',
    'product-theme--large',
    'product-theme--extra-large',
    'product-theme--jumbo'
  );
  productsSection.classList.add(`product-theme--${key}`);

  expandShowroomItem(key);
  renderCallouts(data.callouts);

  if (productImage) {
    productImage.alt = data.alt;
    productImage.src = PRODUCT_IMAGE;
  }
}

showroomItems.forEach((item) => {
  const key = item.dataset.product;
  const data = PRODUCTS[key];

  if (data) populateShowroomItem(item, data);

  item.querySelector('.showroom-trigger')?.addEventListener('click', () => {

    // agar already open hai toh close kar do
    if (item.classList.contains('is-active')) {

      item.classList.remove('is-active');

      const trigger = item.querySelector('.showroom-trigger');
      const toggle = item.querySelector('.showroom-trigger-toggle');
      const icon = item.querySelector('.showroom-trigger-icon');

      trigger?.setAttribute('aria-selected', 'false');
      trigger?.setAttribute('aria-expanded', 'false');

      if (toggle) toggle.textContent = '+';

      icon?.classList.remove('showroom-trigger-icon--accent');

      return;
    }

    // warna normal open
    setProduct(key);

  });
});

setProduct('medium');

// ===== WHY EVVO WHEEL =====
const whyWheelDisc = document.getElementById('whyWheelDisc');
const whyWheel = document.getElementById('whyWheel');
const whySlices = document.querySelectorAll('.why-slice');
const whyPillars = document.querySelectorAll('.why-pillar[data-pillar]');
const whyDetail = document.getElementById('whyDetail');
const whyPrev = document.getElementById('whyPrev');
const whyNext = document.getElementById('whyNext');

const WHY_PILLARS = [
  {
    accent: 'var(--pale-blue)',
    num: '01',
    title: '35+ Years of Expertise',
    desc: 'Backed by decades of packaging knowledge and reliable manufacturing standards.',
    turn: '0deg',
  },
  {
    accent: 'var(--golden-glow)',
    num: '02',
    title: 'Unmatched Strength',
    desc: 'Built to resist tearing, stretching, and everyday pressure.',
    turn: '-90deg',
  },
  {
    accent: 'var(--mimi-pink)',
    num: '03',
    title: 'Leak-Proof Protection',
    desc: 'Machine-sealed edges help reduce leaks, spills, and daily mess.',
    turn: '-180deg',
  },
  {
    accent: 'var(--greenish-beige)',
    num: '04',
    title: 'Consistent Quality',
    desc: 'Reliable production ensures every pack performs the way it should.',
    turn: '-270deg',
  },
];

let activePillar = 0;
let cumulativePillarIndex = 0;
let whyRotationTimer = null;
let hasInteractedManually = false;
const prefersReducedMotionWhy = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function startWhyAutoRotate() {
  if (prefersReducedMotionWhy || whyRotationTimer || hasInteractedManually) return;
  whyRotationTimer = window.setInterval(() => {
    setWhyPillar(cumulativePillarIndex + 1, true);
  }, 5000);
}

function stopWhyAutoRotate(isManual = false) {
  if (isManual) {
    hasInteractedManually = true;
  }
  if (whyRotationTimer) {
    window.clearInterval(whyRotationTimer);
    whyRotationTimer = null;
  }
}

function updateWhyDetail(data) {
  if (!whyDetail) return;

  const applyContent = () => {
    whyDetail.dataset.pillar = String(activePillar);
    whyDetail.style.setProperty('--accent', data.accent);
    whyDetail.querySelector('.why-detail-num').textContent = data.num;
    whyDetail.querySelector('.why-detail-title').textContent = data.title;
    whyDetail.querySelector('.why-detail-desc').textContent = data.desc;
    whyDetail.classList.remove('is-changing');
  };

  if (prefersReducedMotionWhy || !whyDetail.offsetParent) {
    applyContent();
    return;
  }

  whyDetail.classList.add('is-changing');
  setTimeout(applyContent, 180);
}

let wheelRotationAngle = 0;
let isFirstWhyRender = true;

function setWhyPillar(targetIndex, isRelative = false) {
  let diff = 0;
  if (isRelative) {
    diff = targetIndex - cumulativePillarIndex;
    cumulativePillarIndex = targetIndex;
  } else {
    const currentPillar = ((cumulativePillarIndex % 4) + 4) % 4;
    diff = targetIndex - currentPillar;
    if (diff > 2) diff -= 4;
    if (diff < -2) diff += 4;
    cumulativePillarIndex += diff;
  }

  activePillar = ((cumulativePillarIndex % 4) + 4) % 4;
  const data = WHY_PILLARS[activePillar];

  if (!isFirstWhyRender && diff !== 0) {
    wheelRotationAngle += -360 * diff;
  }
  isFirstWhyRender = false;

  if (whyWheelDisc) {
    whyWheelDisc.style.setProperty('--wheel-turn', `${wheelRotationAngle}deg`);
  }

  whySlices.forEach((slice) => {
    const active = Number(slice.dataset.pillar) === activePillar;
    slice.classList.toggle('is-active', active);
    slice.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  whyPillars.forEach((pillar) => {
    pillar.classList.toggle('is-active', Number(pillar.dataset.pillar) === activePillar);
  });

  updateWhyDetail(data);
}

whySlices.forEach((slice) => {
  slice.addEventListener('click', () => {
    stopWhyAutoRotate(true);
    setWhyPillar(Number(slice.dataset.pillar));
  });
  slice.addEventListener('focus', () => stopWhyAutoRotate(false));
  slice.addEventListener('blur', () => startWhyAutoRotate());
  slice.addEventListener('mouseenter', () => {
    const idx = Number(slice.dataset.pillar);
    whyPillars.forEach((pillar) => {
      pillar.classList.toggle('is-hovered', Number(pillar.dataset.pillar) === idx);
    });
  });
});

whyWheel?.addEventListener('mouseenter', () => {
  stopWhyAutoRotate(false);
});
whyWheel?.addEventListener('mouseleave', () => {
  whyPillars.forEach((pillar) => pillar.classList.remove('is-hovered'));
  startWhyAutoRotate();
});

whyPrev?.addEventListener('click', () => {
  stopWhyAutoRotate(true);
  setWhyPillar(cumulativePillarIndex - 1, true);
});
whyNext?.addEventListener('click', () => {
  stopWhyAutoRotate(true);
  setWhyPillar(cumulativePillarIndex + 1, true);
});

whyPillars.forEach((pillar) => {
  pillar.addEventListener('click', () => {
    stopWhyAutoRotate(true);
    setWhyPillar(Number(pillar.dataset.pillar));
  });
});

setWhyPillar(0);
startWhyAutoRotate();

// ===== TIPS STICKY SCROLL STACK =====
const tipsSection = document.getElementById('tips');
const tipsScroll = document.getElementById('tipsScroll');
const tipsPin = document.querySelector('.tips-pin');
const tipsHeader = document.querySelector('.tips-header');
const tipsStack = document.getElementById('tipsStack');
const tipCards = document.querySelectorAll('#tipsStack .tip-card');

const TIPS_BOTTOM_PAD = 20;
const TIPS_PEEK_RATIO = 0.32;
const TIPS_STEP_RATIO = 0.75;

let tipsMetrics = null;

function measureTips() {
  if (!tipsScroll || !tipsStack || !tipsPin || !tipCards.length) return null;

  const viewport = window.innerHeight;
  const stickyTop = parseFloat(getComputedStyle(tipsPin).top) || 92;
  const cardHeight = tipsStack.offsetHeight;
  const headerMargin = tipsHeader
    ? parseFloat(getComputedStyle(tipsHeader).marginBottom) || 0
    : 0;
  const pinStickAt = Math.max(0, tipsPin.offsetTop - stickyTop);
  const maxPeekTotal = Math.max(
    0,
    viewport - stickyTop - cardHeight - TIPS_BOTTOM_PAD
  );
  const idealPeek = Math.round(cardHeight * TIPS_PEEK_RATIO);
  const peekPx = Math.max(
    40,
    Math.min(idealPeek, Math.floor(maxPeekTotal / (tipCards.length - 1)))
  );
  const stepPerCard = Math.max(280, Math.round(cardHeight * TIPS_STEP_RATIO));

  return {
    viewport,
    stickyTop,
    cardHeight,
    pinStickAt,
    peekPx,
    stepPerCard,
    cardCount: tipCards.length,
  };
}

function setTipsStackState(activeIndex, peekPx) {
  tipCards.forEach((card, i) => {
    card.classList.remove('is-active', 'is-past', 'is-next');

    if (i === activeIndex) {
      card.classList.add('is-active');
      card.style.removeProperty('--depth');
      card.style.removeProperty('--peek-offset');
    } else if (i < activeIndex) {
      const depth = activeIndex - i;
      card.classList.add('is-past');
      card.style.setProperty('--depth', String(depth));
      card.style.setProperty('--peek-offset', `${-depth * peekPx}px`);
    } else {
      card.classList.add('is-next');
      card.style.removeProperty('--depth');
      card.style.removeProperty('--peek-offset');
    }
  });
}

function setTipsStackOffset(activeIndex, metrics) {
  if (!tipsStack || !metrics) return;

  if (activeIndex === 0) {
    const fitOffset = Math.max(
      0,
      metrics.stickyTop + metrics.cardHeight + TIPS_BOTTOM_PAD - metrics.viewport
    );
    tipsStack.style.marginTop = fitOffset > 0 ? `${fitOffset}px` : '0';
    return;
  }

  tipsStack.style.marginTop = `${activeIndex * metrics.peekPx}px`;
}

function clearTipsStackLayout() {
  if (tipsStack) tipsStack.style.removeProperty('margin-top');
}

function updateTipsScrollHeight() {
  if (!tipsScroll || !tipCards.length || tipsSection?.classList.contains('tips--static')) {
    if (tipsScroll) tipsScroll.style.removeProperty('height');
    tipsMetrics = null;
    return;
  }

  tipsMetrics = measureTips();
  if (!tipsMetrics) return;

  const { viewport, pinStickAt, stepPerCard, cardCount } = tipsMetrics;
  const stackRun = stepPerCard * (cardCount - 1);
  tipsScroll.style.height = `${viewport + pinStickAt + stackRun}px`;
}

function updateTipsStack() {
  if (
    !tipsScroll ||
    !tipCards.length ||
    !tipsPin ||
    tipsSection?.classList.contains('tips--static')
  ) {
    return;
  }

  if (!tipsMetrics) tipsMetrics = measureTips();
  if (!tipsMetrics || tipsMetrics.stepPerCard <= 0) return;

  const { pinStickAt, stepPerCard, peekPx, cardCount } = tipsMetrics;
  const scrolled = Math.max(0, -tipsScroll.getBoundingClientRect().top);

  if (scrolled < pinStickAt) {
    clearTipsStackLayout();
    setTipsStackState(0, peekPx);
    return;
  }

  const stackScrolled = scrolled - pinStickAt;
  const activeIndex = Math.min(
    Math.floor(stackScrolled / stepPerCard),
    cardCount - 1
  );

  setTipsStackOffset(activeIndex, tipsMetrics);
  setTipsStackState(activeIndex, peekPx);
}

if (tipCards.length && tipsSection) {
  const tipsMobileMq = window.matchMedia('(max-width: 768px)');

  const initTipsMode = () => {
    const useStatic = prefersReducedMotion || tipsMobileMq.matches;
    tipsSection.classList.toggle('tips--static', useStatic);

    if (useStatic) {
      // On mobile / reduced-motion: plain stacked list, clear all dynamic state
      tipCards.forEach((card) => {
        card.classList.remove('is-past', 'is-next', 'is-active');
        card.style.removeProperty('--depth');
        card.style.removeProperty('--peek-offset');
      });
      clearTipsStackLayout();
      if (tipsScroll) tipsScroll.style.removeProperty('height');
      return;
    }

    updateTipsScrollHeight();
    updateTipsStack();
  };

  if (!prefersReducedMotion && !tipsMobileMq.matches) {
    window.addEventListener('scroll', updateTipsStack, { passive: true });
    window.addEventListener('resize', () => {
      updateTipsScrollHeight();
      updateTipsStack();
    });
  }

  tipsMobileMq.addEventListener('change', initTipsMode);
  initTipsMode();

  if (!prefersReducedMotion && !tipsMobileMq.matches) {
    const refreshTipsLayout = () => {
      updateTipsScrollHeight();
      updateTipsStack();
    };
    requestAnimationFrame(() => {
      refreshTipsLayout();
      requestAnimationFrame(refreshTipsLayout);
    });
    window.addEventListener('load', refreshTipsLayout);
  }
}

// ===== FAQ ACCORDION =====
const faqAccordion = document.querySelector('[data-accordion]');
if (faqAccordion) {
  const faqItems = Array.from(faqAccordion.querySelectorAll('.faq-item'));

  const toggleFaqItem = (item) => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    const isOpen = item.classList.contains('is-open');

    if (isOpen) {
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = '0';
      window.setTimeout(() => {
        panel.hidden = true;
      }, 380);
      return;
    }

    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
    window.requestAnimationFrame(() => {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
  };

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    const isOpen = item.classList.contains('is-open');

    if (!trigger || !panel) return;

    panel.hidden = !isOpen;
    panel.style.maxHeight = isOpen ? `${panel.scrollHeight}px` : '0';
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      toggleFaqItem(item);
    });
  });
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone') || '—';
  const message = formData.get('message');

  const subject = encodeURIComponent(`EVVO Bags enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:packingsolutionsjpr@gmail.com?subject=${subject}&body=${body}`;
});
