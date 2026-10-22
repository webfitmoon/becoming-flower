const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? '메뉴 닫기' : '메뉴 열기';
  navigation.classList.toggle('open', open);
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) setMenu(false);
});
window.matchMedia('(min-width: 701px)').addEventListener('change', () => setMenu(false));

const hero = document.querySelector('.hero');
const slides = [...hero.querySelectorAll('.hero-slide')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeSlide = 0;
let paused = reduceMotion.matches;
let slideTimer;
function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, position) => {
    slide.classList.toggle('is-active', position === activeSlide);
    slide.setAttribute('aria-hidden', String(position !== activeSlide));
  });
}
function updatePlayback() {
  clearInterval(slideTimer);
  if (!paused && !document.hidden && !hero.matches(':hover') && !hero.contains(document.activeElement)) {
    slideTimer = setInterval(() => showSlide(activeSlide + 1), 5000);
  }
}
hero.addEventListener('mouseenter', updatePlayback);
hero.addEventListener('mouseleave', updatePlayback);
hero.addEventListener('focusin', updatePlayback);
hero.addEventListener('focusout', () => setTimeout(updatePlayback, 0));
document.addEventListener('visibilitychange', updatePlayback);
reduceMotion.addEventListener('change', () => { paused = reduceMotion.matches; updatePlayback(); });
updatePlayback();
