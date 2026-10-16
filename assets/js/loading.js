(() => {
  const LOADING_DURATION = 3000;
  const root = document.documentElement;

  function revealPage() {
    root.classList.remove('is-loading');
    root.classList.add('page-ready');
    document.querySelector('.site-loader')?.remove();
  }

  // Keep the timer independent of the rest of the site's interactions.
  setTimeout(() => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', revealPage, { once: true });
    } else {
      revealPage();
    }
  }, LOADING_DURATION);
  root.classList.add('is-loading');
})();
