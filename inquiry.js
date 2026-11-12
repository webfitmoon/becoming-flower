'use strict';
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#navigation');
function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '메뉴 닫기' : '메뉴 열기';
  menu.classList.toggle('open', open);
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false); menuToggle.focus();
  }
});
window.matchMedia('(min-width: 701px)').addEventListener('change', () => setMenu(false));
const form = document.querySelector('#inquiry-form');
const sections = [...form.querySelectorAll('[data-step]')];
function selectType(type) {
  form.querySelectorAll('[data-fields]').forEach(fields => {
    const active = fields.dataset.fields === type;
    fields.hidden = !active;
    fields.disabled = !active;
  });
}
form.querySelectorAll('[name="inquiry_type"]').forEach(radio => {
  radio.addEventListener('change', () => selectType(radio.value));
});
const initialType = new URLSearchParams(location.search).get('type');
if (['threads', 'lecture'].includes(initialType)) {
  form.querySelector(`[name="inquiry_type"][value="${initialType}"]`).checked = true;
  selectType(initialType);
}
function validSection(section) {
  for (const input of section.querySelectorAll('input, select, textarea')) {
    if (input.willValidate && !input.checkValidity()) {
      input.reportValidity(); input.focus(); return false;
    }
  }
  return true;
}
function showStep(step) {
  sections.forEach(section => { section.hidden = section.dataset.step !== String(step); });
  document.querySelectorAll('[data-progress]').forEach(item => {
    const active = item.dataset.progress === String(step);
    item.classList.toggle('is-active', active);
    if (active) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });
  document.querySelector(step === 1 ? '#step-one-title' : '#step-two-title').focus();
}
document.querySelector('#next-step').addEventListener('click', () => {
  if (validSection(sections[0])) showStep(2);
});
document.querySelector('#previous-step').addEventListener('click', () => showStep(1));
document.querySelector('#format').addEventListener('change', event => {
  const visible = event.target.value === '오프라인';
  document.querySelector('#location-field').hidden = !visible;
  document.querySelector('#location').disabled = !visible;
});
// UI preview only: never submit or persist visitors' contact information.
form.noValidate = true;
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validSection(sections[0])) { showStep(1); return; }
  if (sections[1].hidden) { showStep(2); return; }
  if (!validSection(sections[1])) return;
  const status = document.querySelector('#form-status');
  status.textContent = '입력 항목을 모두 확인했습니다. 현재 문의 접수 기능은 준비 중이며, 작성한 내용은 저장되거나 전송되지 않았습니다.';
  status.focus();
});
