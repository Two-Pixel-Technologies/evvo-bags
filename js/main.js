// ===== NAV =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE MENU =====
const burger = document.getElementById('burger');
const mobNav = document.getElementById('mobNav');
const mobClose = document.getElementById('mobClose');

burger.addEventListener('click', () => mobNav.classList.add('open'));
mobClose.addEventListener('click', () => mobNav.classList.remove('open'));
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobNav.classList.remove('open'));
});

// ===== HERO HEADLINE ANIMATION =====
window.addEventListener('load', () => {
  const lines = document.querySelectorAll('.hero-h1 .line');
  lines.forEach((line, i) => {
    // Wrap text in span for animation
    const text = line.textContent;
    line.innerHTML = `<span>${text}</span>`;
    const span = line.querySelector('span');
    setTimeout(() => {
      span.style.transition = 'transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.7s ease';
      span.style.transform = 'translateY(0)';
      span.style.opacity = '1';
    }, 100 + i * 120);
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== AUTO-ADD REVEAL CLASS TO SECTION CHILDREN =====
document.querySelectorAll('.why-card, .size-card, .contact-item').forEach((el, i) => {
  el.classList.add('reveal');
  const delay = (i % 4);
  if (delay > 0) el.classList.add(`reveal-delay-${delay}`);
  revealObserver.observe(el);
});
