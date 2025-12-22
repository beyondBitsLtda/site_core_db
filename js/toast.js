document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'coredb-holiday-toast';

  if (sessionStorage.getItem(STORAGE_KEY)) {
    return;
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <div class="toast__content">
      <span class="toast__icon" aria-hidden="true">🎄</span>
      <div>
        <p class="toast__title">Feliz Natal!</p>
        <p class="toast__message">Que sua operação siga estável e segura em 2024. Conte com a CoreDB para cuidar do seu TOTVS e banco de dados.</p>
      </div>
    </div>
    <button class="toast__close" type="button" aria-label="Fechar mensagem de Natal">✕</button>
  `;

  const closeToast = () => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 300);
  };

  toast.addEventListener('click', (event) => {
    if (event.target.closest('.toast__close')) {
      closeToast();
    }
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  sessionStorage.setItem(STORAGE_KEY, '1');
  setTimeout(closeToast, 12000);
});
