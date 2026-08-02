(function () {
  'use strict';

  const PRELOADER_SELECTOR = '#rec737865419';
  const DRAW_FAILSAFE = 3700;
  const HOLD_AFTER_DRAW = 350;
  const FALLBACK_HOLD = 900;
  const ASSET_FAILSAFE = 8500;
  const EXIT_DURATION = 620;

  function finishPreloader(preloader) {
    if (!preloader || preloader.dataset.velesPreloaderGate === 'done') return;

    preloader.dataset.velesPreloaderGate = 'done';
    const root = document.documentElement;
    root.classList.add('veles-preloader-exiting');

    window.setTimeout(() => {
      preloader.style.display = 'none';
      preloader.setAttribute('aria-hidden', 'true');
      preloader.removeAttribute('aria-busy');
      root.classList.remove('veles-preloader-active', 'veles-preloader-exiting');
      root.classList.add('veles-preloader-complete');
      window.dispatchEvent(new Event('resize'));
    }, EXIT_DURATION);
  }

  function schedulePreloaderFinish(preloader, wrapper, isAnimated) {
    if (!preloader || preloader.dataset.velesPreloaderGateTimeline === 'true') return;

    preloader.dataset.velesPreloaderGateTimeline = 'true';
    let finishScheduled = false;
    const finishAfterHold = () => {
      if (finishScheduled) return;
      finishScheduled = true;
      window.setTimeout(
        () => finishPreloader(preloader),
        isAnimated ? HOLD_AFTER_DRAW : FALLBACK_HOLD
      );
    };

    if (!isAnimated) {
      finishAfterHold();
      return;
    }

    const pieces = Array.from(wrapper.querySelectorAll('.veles-loader-piece'));
    const lastPiece = pieces[pieces.length - 1];
    const failsafe = window.setTimeout(finishAfterHold, DRAW_FAILSAFE);

    if (!lastPiece) return;

    lastPiece.addEventListener('animationend', function onAnimationEnd(event) {
      if (event.animationName !== 'veles-loader-fill') return;
      lastPiece.removeEventListener('animationend', onAnimationEnd);
      window.clearTimeout(failsafe);
      finishAfterHold();
    });
  }

  function watchLogo(preloader) {
    const artboard = preloader.querySelector('.t396__artboard');
    if (!artboard) return;

    const startTimeline = () => {
      const wrapper = preloader.querySelector('.veles-preloader-logo');
      if (!wrapper) return false;

      const svg = wrapper.querySelector('svg');
      const image = wrapper.querySelector('img');
      if (!svg && !image) return false;

      schedulePreloaderFinish(preloader, wrapper, Boolean(svg));
      return true;
    };

    if (startTimeline()) return;

    const observer = new MutationObserver(() => {
      if (startTimeline()) observer.disconnect();
    });
    observer.observe(artboard, { childList: true, subtree: true });

    window.setTimeout(() => {
      observer.disconnect();
      if (preloader.dataset.velesPreloaderGateTimeline !== 'true') {
        finishPreloader(preloader);
      }
    }, ASSET_FAILSAFE);
  }

  function initPreloaderGate() {
    const preloader = document.querySelector(PRELOADER_SELECTOR);
    if (!preloader || preloader.dataset.velesPreloaderGate) return;

    preloader.dataset.velesPreloaderGate = 'active';
    document.documentElement.classList.add('veles-preloader-active');
    preloader.setAttribute('aria-busy', 'true');
    preloader.removeAttribute('aria-hidden');
    watchLogo(preloader);
  }

  initPreloaderGate();
})();
