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
    const text = line.textContent;
    line.innerHTML = `<span>${text}</span>`;
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

// ===== PRODUCTS EXPERIENCE =====
const PRODUCTS = {
  small: {
    title: 'Small Garbage Bags',
    desc: 'Compact format for desk bins, bathroom waste, and tight spaces where a lighter liner is all you need.',
    size: 'Custom dimensions available',
    use: 'Bathroom, desk & utility bins',
    image: 'images/products/box-tilt.png',
    alt: 'EVVO Small garbage bags',
    tags: ['Custom Sizes', 'Lightweight', 'Everyday Use'],
  },
  medium: {
    title: 'Medium Garbage Bags',
    desc: 'Our best-selling format for kitchen and bathroom bins — balanced capacity with everyday strength.',
    size: '19 in × 20 in · 30 bags per pack',
    use: 'Kitchen & bathroom bins',
    image: 'images/products/pack-tall.png',
    alt: 'EVVO Medium garbage bags',
    tags: ['Best Seller', 'Tear Resistant', 'Leak Proof', 'Machine Sealed'],
  },
  large: {
    title: 'Large Garbage Bags',
    desc: 'Super-strength horizontal format for heavy loads, outdoor bins, and high-capacity household waste.',
    size: '24 in × 32 in · 15 bags per pack',
    use: 'Large bins & heavy waste',
    image: 'images/products/pack-flat.png',
    alt: 'EVVO Large garbage bags',
    tags: ['Super Strength', 'Heavy Duty', 'Stretchable', 'Machine Sealed'],
  },
  bulk: {
    title: 'Bulk & Custom Orders',
    desc: 'Volume supply and tailored sizing for retailers, institutions, and businesses — backed by consistent quality and reliable delivery.',
    size: 'Flexible pack counts & dimensions',
    use: 'Retail, hospitality & bulk buyers',
    image: 'images/products/boxes-duo.png',
    alt: 'EVVO BAGS bulk packaging',
    tags: ['Bulk Supply', 'Custom Sizes', 'Fast Turnaround'],
  },
};

const productsSection = document.getElementById('products');
const productImage = document.getElementById('productImage');
const productTitle = document.getElementById('productTitle');
const productDesc = document.getElementById('productDesc');
const productSize = document.getElementById('productSize');
const productUse = document.getElementById('productUse');
const productTags = document.getElementById('productTags');
const chips = document.querySelectorAll('.chip');

function setProduct(key) {
  const data = PRODUCTS[key];
  if (!data) return;

  productsSection.classList.remove(
    'product-theme--small',
    'product-theme--medium',
    'product-theme--large',
    'product-theme--bulk'
  );
  productsSection.classList.add(`product-theme--${key}`);

  chips.forEach((chip) => {
    const active = chip.dataset.product === key;
    chip.classList.toggle('is-active', active);
    chip.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  productTitle.textContent = data.title;
  productDesc.textContent = data.desc;
  productSize.textContent = data.size;
  productUse.textContent = data.use;

  productTags.innerHTML = data.tags.map((tag) => `<li>${tag}</li>`).join('');

  if (productImage.getAttribute('src') === data.image) {
    return;
  }

  if (prefersReducedMotion) {
    productImage.src = data.image;
    productImage.alt = data.alt;
    return;
  }

  productImage.classList.add('is-fading');
  setTimeout(() => {
    productImage.src = data.image;
    productImage.alt = data.alt;
    productImage.classList.remove('is-fading');
  }, 200);
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => setProduct(chip.dataset.product));
});

setProduct('medium');

// ===== TIPS STICKY SCROLL STACK =====
const tipsSection = document.getElementById('tips');
const tipsScroll = document.getElementById('tipsScroll');
const tipCards = document.querySelectorAll('#tipsStack .tip-card');

function setTipsStackState(activeIndex) {
  tipCards.forEach((card, i) => {
    card.classList.remove('is-active', 'is-past', 'is-next');
    if (i === activeIndex) {
      card.classList.add('is-active');
    } else if (i < activeIndex) {
      card.classList.add('is-past');
      card.style.setProperty('--depth', String(activeIndex - i));
    } else {
      card.classList.add('is-next');
    }
  });
}

function updateTipsScrollHeight() {
  if (!tipsScroll || !tipCards.length || tipsSection?.classList.contains('tips--static')) {
    if (tipsScroll) tipsScroll.style.removeProperty('height');
    return;
  }

  const pin = tipsScroll.querySelector('.tips-pin');
  if (!pin) return;

  const pinHeight = pin.offsetHeight;
  const step = Math.max(260, Math.min(window.innerHeight * 0.34, 400));
  const runway = pinHeight + step * (tipCards.length - 1);
  tipsScroll.style.height = `${runway + window.innerHeight - pinHeight}px`;
  tipsScroll.style.setProperty('--tip-step', `${step}px`);
}

function updateTipsStack() {
  if (!tipsScroll || !tipCards.length) return;

  const rect = tipsScroll.getBoundingClientRect();
  const viewport = window.innerHeight;
  const scrollRun = tipsScroll.offsetHeight - viewport;

  if (scrollRun <= 0) {
    setTipsStackState(0);
    return;
  }

  const scrolled = Math.min(Math.max(-rect.top, 0), scrollRun);
  const segments = Math.max(tipCards.length - 1, 1);
  const segmentSize = scrollRun / segments;
  const index = Math.min(
    Math.floor(scrolled / segmentSize),
    tipCards.length - 1
  );

  setTipsStackState(index);
}

if (tipCards.length && tipsSection) {
  const tipsMobileMq = window.matchMedia('(max-width: 768px)');

  const initTipsMode = () => {
    const useStatic = prefersReducedMotion || tipsMobileMq.matches;
    tipsSection.classList.toggle('tips--static', useStatic);

    if (useStatic) {
      tipCards.forEach((card) => {
        card.classList.remove('is-past', 'is-next', 'is-active');
        card.style.removeProperty('--depth');
      });
      updateTipsScrollHeight();
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
    requestAnimationFrame(() => {
      updateTipsScrollHeight();
      updateTipsStack();
    });
  }
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
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
