(function () {
  'use strict';

  const SELECTORS = {
    preloader: '[data-preloader]',
    preloaderLogo: '[data-preloader-logo]',
    modal: '[data-modal]',
    form: '[data-home-form]'
  };

  function completePreloader(preloader) {
    if (!preloader || preloader.dataset.completed === 'true') return;
    preloader.dataset.completed = 'true';
    preloader.classList.add('is-exiting');
    document.body.classList.remove('is-loading');

    window.setTimeout(() => {
      preloader.classList.add('is-hidden');
    }, 650);
  }

  function initPreloader() {
    const preloader = document.querySelector(SELECTORS.preloader);
    const logo = document.querySelector(SELECTORS.preloaderLogo);
    if (!preloader || !logo) return;

    const showFallback = () => {
      logo.innerHTML = '<img src="assets/veles-logo.png" alt="">';
      window.setTimeout(() => completePreloader(preloader), 950);
    };

    fetch('assets/veles-preloader-logo.svg', { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Preloader logo could not be loaded');
        return response.text();
      })
      .then((svg) => {
        logo.innerHTML = svg;
        const pieces = Array.from(logo.querySelectorAll('.veles-loader-piece'));
        const lastPiece = pieces.at(-1);

        if (!lastPiece) {
          showFallback();
          return;
        }

        lastPiece.addEventListener(
          'animationend',
          (event) => {
            if (event.animationName !== 'veles-loader-fill') return;
            window.setTimeout(() => completePreloader(preloader), 220);
          },
          { once: true }
        );

        // Safety net for browsers that do not emit SVG animation events.
        window.setTimeout(() => completePreloader(preloader), 7000);
      })
      .catch(showFallback);
  }

  function normalizePhone(value) {
    const digits = value.replace(/\D/g, '').replace(/^8/, '7').slice(0, 11);
    const local = digits.startsWith('7') ? digits.slice(1) : digits;
    if (!local) return '';

    let result = '+7';
    if (local.length > 0) result += ' (' + local.slice(0, 3);
    if (local.length >= 3) result += ')';
    if (local.length > 3) result += ' ' + local.slice(3, 6);
    if (local.length > 6) result += '-' + local.slice(6, 8);
    if (local.length > 8) result += '-' + local.slice(8, 10);
    return result;
  }

  function initForms() {
    document.querySelectorAll(SELECTORS.form).forEach((form) => {
      const phone = form.querySelector('input[name="phone"]');
      const status = form.querySelector('[data-form-status]');

      if (phone) {
        phone.addEventListener('input', () => {
          phone.value = normalizePhone(phone.value);
        });
      }

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = form.querySelector('input[name="name"]');
        const hasName = Boolean(name && name.value.trim());
        const phoneDigits = phone ? phone.value.replace(/\D/g, '') : '';
        const hasPhone = phoneDigits.length >= 11;

        if (!hasName || !hasPhone) {
          if (status) {
            status.classList.add('is-error');
            status.textContent = 'Укажите имя и телефон в формате +7 (___) ___-__-__.';
          }
          return;
        }

        if (status) {
          status.classList.remove('is-error');
          status.textContent = 'Спасибо! Форма готова к подключению к вашей почте или CRM.';
        }
        form.reset();
      });
    });
  }

  function initModals() {
    let currentModal = null;
    let opener = null;

    const close = (modal) => {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (currentModal === modal) currentModal = null;
      if (opener) opener.focus();
    };

    document.querySelectorAll('[data-modal-open]').forEach((button) => {
      button.addEventListener('click', () => {
        const modal = document.getElementById(button.dataset.modalOpen);
        if (!modal) return;
        opener = button;
        currentModal = modal;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        modal.querySelector('.modal__close')?.focus();
      });
    });

    document.querySelectorAll(SELECTORS.modal + ' [data-modal-close]').forEach((button) => {
      button.addEventListener('click', () => close(button.closest(SELECTORS.modal)));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close(currentModal);
    });
  }

  function initBackToTop() {
    const button = document.querySelector('[data-back-to-top]');
    if (!button) return;

    const update = () => button.classList.toggle('is-visible', window.scrollY > 680);
    update();
    window.addEventListener('scroll', update, { passive: true });
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initMediaParallax() {
    const sections = document.querySelectorAll('[data-brand-parallax], [data-svo-parallax]');
    if (!sections.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frameId = 0;
    const update = () => {
      frameId = 0;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const totalDistance = window.innerHeight + rect.height;
        const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / totalDistance));
        const offset = Math.round((progress - 0.5) * 150);
        section.style.setProperty('--media-parallax-y', String(offset) + 'px');
      });
    };

    const schedule = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initForms();
    initModals();
    initBackToTop();
    initMediaParallax();
  });
})();
