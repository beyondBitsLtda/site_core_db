(() => {
  const { cleanPath } = document.body.dataset || {};

  if (!cleanPath) return;

  const { pathname, search, hash } = window.location;

  if (!pathname.endsWith('.html')) return;

  const newUrl = `${cleanPath}${search}${hash}`;

  if (newUrl !== `${pathname}${search}${hash}`) {
    window.history.replaceState({}, '', newUrl);
  }
})();
