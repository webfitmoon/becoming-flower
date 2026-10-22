(() => {
  const popup = document.getElementById('graduation-popup');
  const storageKey = 'becoming-graduation-popup-hidden-date';
  const koreaDate = () => new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date());
  let hiddenToday = false;
  try { hiddenToday = localStorage.getItem(storageKey) === koreaDate(); } catch {}
  document.getElementById('graduation-popup-close').addEventListener('click', () => popup.close());
  document.getElementById('graduation-popup-hide-today').addEventListener('click', () => {
    try { localStorage.setItem(storageKey, koreaDate()); } catch {}
    popup.close();
  });
  popup.addEventListener('close', () => document.documentElement.classList.remove('graduation-popup-open'));
  if (!hiddenToday && typeof popup.showModal === 'function') {
    popup.showModal();
    document.documentElement.classList.add('graduation-popup-open');
  }
})();
