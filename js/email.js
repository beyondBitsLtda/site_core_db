document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const successModal = document.getElementById('success-modal');
  const closeModalButton = document.getElementById('success-modal-close');
  const feedback = document.getElementById('form-feedback');
  const honeypotField = document.getElementById('website');
  const ajaxAction = form.dataset.ajaxAction || '';

  // TODO: mover o envio para um backend próprio para proteger os e-mails corporativos.

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

  const resetFeedback = () => {
    if (!feedback) return;
    feedback.textContent = '';
    feedback.hidden = true;
    feedback.classList.remove('is-error', 'is-success');
  };

  const showFeedback = (message, { isError = true } = {}) => {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.hidden = false;
    feedback.classList.toggle('is-error', isError);
    feedback.classList.toggle('is-success', !isError);
  };

  const primaryEmail = decodeBase64(contactConfig?.emails?.primary || '');
  const ccEmail = decodeBase64(contactConfig?.emails?.cc || '');

  if (!primaryEmail) {
    showFeedback('Canal temporariamente indisponível. Tente novamente em instantes.', { isError: true });
    return;
  }

  // Configura o destino apenas em memória para reduzir exposição de e-mail na página.
  form.action = `https://formsubmit.co/${primaryEmail}`;
  form.dataset.ajaxAction = `https://formsubmit.co/ajax/${primaryEmail}`;

  if (ccEmail) {
    let ccField = form.querySelector('input[name="_cc"]');
    if (!ccField) {
      ccField = document.createElement('input');
      ccField.type = 'hidden';
      ccField.name = '_cc';
      form.appendChild(ccField);
    }
    ccField.value = ccEmail;
  }

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => {
    const allowedChars = /^[0-9+()\-\s]+$/;
    const digits = phone.replace(/\D/g, '');
    return allowedChars.test(phone) && digits.length >= 10;
  };

  const validateForm = () => {
    const nameValue = form.querySelector('#name')?.value.trim() || '';
    const emailValue = form.querySelector('#email')?.value.trim() || '';
    const phoneValue = form.querySelector('#phone')?.value.trim() || '';
    const messageValue = form.querySelector('#message')?.value.trim() || '';

    if (honeypotField && honeypotField.value.trim().length > 0) {
      showFeedback('Envio cancelado.', { isError: true });
      return false;
    }

    if (nameValue.length < 3) {
      showFeedback('Informe seu nome completo (mínimo de 3 caracteres).');
      return false;
    }

    if (!isValidEmail(emailValue)) {
      showFeedback('Digite um e-mail corporativo válido.');
      return false;
    }

    if (!isValidPhone(phoneValue)) {
      showFeedback('Use um telefone válido com DDD (apenas números, +, (), - e espaço).');
      return false;
    }

    if (messageValue.length < 10) {
      showFeedback('Conte-nos um pouco mais (mínimo de 10 caracteres).');
      return false;
    }

    return true;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    resetFeedback();

    if (!validateForm()) {
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
    }

    const formData = new FormData(form);
    const endpoint = ajaxAction || form.action.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');

    try {
      const response = await fetch(endpoint, {
        method: form.method || 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar');
      }

      const result = await response.json().catch(() => null);
      const successFlag = result?.success === 'true' || result?.success === true;

      if (!successFlag) {
        throw new Error('Retorno inesperado');
      }

      showSuccessModal();
      showFeedback('Mensagem enviada com sucesso. Verifique seu e-mail para o retorno da CoreDB.', {
        isError: false,
      });
      form.reset();
    } catch (error) {
      showFeedback('Não foi possível enviar agora. Tente novamente em instantes.', { isError: true });
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
      }
    }
  });
});
