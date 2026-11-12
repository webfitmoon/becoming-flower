'use strict';
(() => {
  const strip = document.querySelector('.trust-strip');
  if (!strip) return;
  const counters = [...strip.querySelectorAll('[data-count]')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const format = new Intl.NumberFormat('ko-KR');
  let frame;
  let observer;
  let started = false;
  function finish() {
    cancelAnimationFrame(frame);
    counters.forEach(counter => { counter.textContent = format.format(Number(counter.dataset.count)); });
  }
  if (motion.matches || !('IntersectionObserver' in window)) { finish(); return; }
  counters.forEach(counter => { counter.textContent = '0'; });
  function start() {
    if (started) return;
    started = true;
    observer.disconnect();
    if (motion.matches) { finish(); return; }
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / 1800, 1);
      const eased = 1 - (1 - progress) ** 3;
      counters.forEach(counter => {
        counter.textContent = format.format(Math.round(Number(counter.dataset.count) * eased));
      });
      if (progress < 1) frame = requestAnimationFrame(tick);
      else finish();
    }
    frame = requestAnimationFrame(tick);
  }
  observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) start();
  }, { threshold: 0.25 });
  observer.observe(strip);
  motion.addEventListener('change', event => {
    if (event.matches) { started = true; observer.disconnect(); finish(); }
  });
})();
