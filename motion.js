'use strict';
(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !motion.matches) {
    const targets = [...document.querySelectorAll('main .section-heading, .trust-strip dl>div, .activity-feature figure, .activity-copy, .activity-note, .about-copy, .about-image, .book>*, .timeline li, .challenge-layout>*, .change-grid li, .practice-grid article, .records-heading, .record-viewport, .contact-content')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); observer.unobserve(entry.target); }
      });
    }, {threshold:.08,rootMargin:'0px 0px -24px 0px'});
    targets.forEach((target,index) => {
      if (target.getBoundingClientRect().top < innerHeight * .9) return;
      target.classList.add('reveal-target','reveal-pending');
      target.style.setProperty('--reveal-delay',`${(index % 3) * 65}ms`);
      observer.observe(target);
    });
    document.addEventListener('focusin',event => event.target.closest('.reveal-pending')?.classList.remove('reveal-pending'));
    motion.addEventListener('change',event => {
      if (event.matches) { observer.disconnect(); targets.forEach(target => target.classList.remove('reveal-pending')); }
    });
  }
  const root = document.querySelector('.records-section');
  if (!root) return;
  const viewport = root.querySelector('.record-viewport');
  const cards = [...root.querySelectorAll('.record-card')];
  const pause = root.querySelector('[data-record-pause]');
  let enabled = !motion.matches;
  let visible = false;
  let hovering = false;
  let timer;
  let scrollFrame;
  function index() {
    const step = cards[0].offsetWidth + parseFloat(getComputedStyle(viewport).columnGap);
    return Math.min(cards.length - 1, Math.max(0, Math.round(viewport.scrollLeft / step)));
  }
  function update() {
    root.querySelector('[data-record-counter]').textContent = `${String(index()+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
    if (pause) {
      pause.textContent = enabled ? '일시정지' : '자동 재생';
      pause.setAttribute('aria-label',enabled ? '활동 자동 넘김 일시정지' : '활동 자동 넘김 시작');
    }
  }
  function schedule() {
    clearTimeout(timer); update();
    if (enabled && visible && !hovering && !document.hidden && !root.contains(document.activeElement)) {
      timer = setTimeout(() => { move(1); schedule(); },4500);
    }
  }
  function move(direction) {
    const step = cards[0].offsetWidth + parseFloat(getComputedStyle(viewport).columnGap);
    const max = viewport.scrollWidth - viewport.clientWidth;
    let next = viewport.scrollLeft + direction * step;
    if (direction > 0 && viewport.scrollLeft >= max - 3) next = 0;
    if (direction < 0 && viewport.scrollLeft <= 3) next = max;
    viewport.scrollTo({left:Math.max(0,Math.min(max,next)),behavior:motion.matches ? 'instant' : 'smooth'});
  }
  root.querySelector('[data-record-prev]')?.addEventListener('click',() => { move(-1); schedule(); });
  root.querySelector('[data-record-next]')?.addEventListener('click',() => { move(1); schedule(); });
  pause?.addEventListener('click',() => { enabled = !enabled; schedule(); });
  viewport.addEventListener('scroll',() => { cancelAnimationFrame(scrollFrame); scrollFrame = requestAnimationFrame(update); },{passive:true});
  viewport.addEventListener('pointerdown',event => { if(event.pointerType !== 'mouse') { enabled=false; schedule(); } });
  viewport.addEventListener('keydown',event => {
    if (event.code === 'Space' && event.target === viewport) { event.preventDefault(); enabled=!enabled; schedule(); }
    if(event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); schedule(); }
  });
  root.addEventListener('mouseenter',() => { hovering=true; schedule(); });
  root.addEventListener('mouseleave',() => { hovering=false; schedule(); });
  root.addEventListener('focusin',schedule);
  root.addEventListener('focusout',() => queueMicrotask(schedule));
  document.addEventListener('visibilitychange',schedule);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible=entries[0].isIntersecting; schedule(); },{threshold:.15}).observe(viewport);
  } else { visible=true; }
  motion.addEventListener('change',event => { enabled=!event.matches; schedule(); });
  window.addEventListener('resize',schedule);
  schedule();
})();
