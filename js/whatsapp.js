document.addEventListener('DOMContentLoaded', () => {
  const whatsappLinks = document.querySelectorAll('.whatsapp-link');

  whatsappLinks.forEach((link) => {
    const phone = link.dataset.phone;
    const message = link.dataset.message || '';

    if (!phone) return;

    const url = new URL(`https://wa.me/${phone}`);
    if (message) {
      url.searchParams.set('text', message);
    }

    link.href = url.toString();
    link.rel = link.rel || 'noopener noreferrer';
    link.target = link.target || '_blank';
  });
});
