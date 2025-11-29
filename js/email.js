document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');

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

      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
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
