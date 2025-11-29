document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const successModal = document.getElementById('success-modal');
  const closeModalButton = document.getElementById('success-modal-close');

  const showSuccessModal = () => {
    if (!successModal) return;
    successModal.classList.add('is-visible');
    document.body.classList.add('modal-open');
    closeModalButton?.focus();
  };

  const hideSuccessModal = () => {
    if (!successModal) return;
    successModal.classList.remove('is-visible');
    document.body.classList.remove('modal-open');
  };

  closeModalButton?.addEventListener('click', hideSuccessModal);

  successModal?.addEventListener('click', (event) => {
    if (event.target === successModal) {
      hideSuccessModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideSuccessModal();
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (submitButton) {
      submitButton.disabled = true;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar.');
      }

      showSuccessModal();
      form.reset();
    } catch (error) {
      form.submit();
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
});
